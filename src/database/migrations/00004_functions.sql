-- ============================================================
-- Migration 00004: Functions & Triggers
-- ============================================================

-- AUTO-CREATE PROFILE ON USER SIGNUP
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- NOTIFICATION ON NEW CONTACT MESSAGE
CREATE OR REPLACE FUNCTION notify_contact_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, priority, title, message, link, metadata)
  SELECT
    id, 'dashboard', 'medium',
    'New inquiry from ' || NEW.name,
    LEFT(NEW.message, 200),
    '/cms/forms/' || NEW.id,
    jsonb_build_object('contact_id', NEW.id, 'email', NEW.email)
  FROM auth.users
  WHERE id IN (
    SELECT ur.user_id FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE r.slug IN ('administrator', 'marketing')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_contact_message_insert
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_contact_message();

-- NOTIFICATION ON NEW BOOKING
CREATE OR REPLACE FUNCTION notify_booking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, priority, title, message, link, metadata)
  SELECT
    id, 'dashboard', 'high',
    'New booking from ' || NEW.name,
    'Consultation on ' || NEW.preferred_date || ' at ' || NEW.preferred_time,
    '/cms/forms/bookings/' || NEW.id,
    jsonb_build_object('booking_id', NEW.id)
  FROM auth.users
  WHERE id IN (
    SELECT ur.user_id FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE r.slug = 'administrator'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_booking_insert
  AFTER INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_booking();

-- NOTIFICATION ON NEW CAREER APPLICATION
CREATE OR REPLACE FUNCTION notify_application()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, priority, title, message, link, metadata)
  SELECT
    id, 'dashboard', 'medium',
    'New application for ' || (SELECT title FROM job_positions WHERE id = NEW.job_id),
    'From: ' || NEW.name,
    '/cms/career/' || NEW.id,
    jsonb_build_object('application_id', NEW.id)
  FROM auth.users
  WHERE id IN (
    SELECT ur.user_id FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE r.slug IN ('administrator', 'marketing')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_career_application_insert
  AFTER INSERT ON career_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_application();

-- ACTIVITY LOGGER
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  action_text text;
  entity_name text;
BEGIN
  entity_name := TG_TABLE_NAME;

  IF TG_OP = 'INSERT' THEN
    action_text := 'created';
  ELSIF TG_OP = 'UPDATE' THEN
    action_text := 'updated';
  ELSIF TG_OP = 'DELETE' THEN
    action_text := 'deleted';
  END IF;

  INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, description, metadata)
  VALUES (
    auth.uid(),
    action_text,
    entity_name,
    CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END,
    entity_name || ' ' || action_text,
    jsonb_build_object('table', entity_name, 'operation', TG_OP)
  );

  IF TG_OP IN ('UPDATE', 'DELETE') THEN
    INSERT INTO public.audit_logs (user_id, action, entity_type, entity_id, old_values, new_values)
    VALUES (
      auth.uid(),
      action_text,
      entity_name,
      CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END,
      CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD)::jsonb ELSE '{}'::jsonb END,
      CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(NEW)::jsonb ELSE '{}'::jsonb END
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Apply activity logging to key tables
CREATE TRIGGER log_projects_activity AFTER INSERT OR UPDATE OR DELETE ON projects FOR EACH ROW EXECUTE FUNCTION log_activity();
CREATE TRIGGER log_blog_activity AFTER INSERT OR UPDATE OR DELETE ON blog_posts FOR EACH ROW EXECUTE FUNCTION log_activity();
CREATE TRIGGER log_services_activity AFTER INSERT OR UPDATE OR DELETE ON services FOR EACH ROW EXECUTE FUNCTION log_activity();
CREATE TRIGGER log_media_activity AFTER INSERT OR UPDATE OR DELETE ON media_library FOR EACH ROW EXECUTE FUNCTION log_activity();
CREATE TRIGGER log_contacts_activity AFTER UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION log_activity();
CREATE TRIGGER log_bookings_activity AFTER UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION log_activity();
