-- ============================================================
-- Migration 00002: Row-Level Security Policies
-- ============================================================

-- Enable RLS on all tables
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- HELPER: Check if user has permission
-- ============================================================
CREATE OR REPLACE FUNCTION has_permission(p_user_id uuid, p_module text, p_action text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN role_permissions rp ON rp.role_id = ur.role_id
    JOIN permissions p ON p.id = rp.permission_id
    WHERE ur.user_id = p_user_id
      AND p.module = p_module
      AND p.action = p_action
  );
END;
$$;

CREATE OR REPLACE FUNCTION is_admin(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = p_user_id AND r.slug = 'administrator'
  );
END;
$$;

-- ============================================================
-- PROFILES: Users can read own, admins can read all
-- ============================================================
CREATE POLICY profiles_select ON profiles FOR SELECT USING (
  auth.uid() = user_id OR is_admin(auth.uid())
);
CREATE POLICY profiles_update ON profiles FOR UPDATE USING (
  auth.uid() = user_id OR is_admin(auth.uid())
);

-- ============================================================
-- PROJECTS: Public read published, editors can manage drafts
-- ============================================================
CREATE POLICY projects_select ON projects FOR SELECT USING (
  status = 'published' AND visibility = 'public'
  OR status = 'published' AND visibility != 'public' AND has_permission(auth.uid(), 'projects', 'read')
  OR has_permission(auth.uid(), 'projects', 'read')
  OR is_admin(auth.uid())
);
CREATE POLICY projects_insert ON projects FOR INSERT WITH CHECK (
  has_permission(auth.uid(), 'projects', 'create') OR is_admin(auth.uid())
);
CREATE POLICY projects_update ON projects FOR UPDATE USING (
  has_permission(auth.uid(), 'projects', 'update') OR is_admin(auth.uid())
);
CREATE POLICY projects_delete ON projects FOR DELETE USING (
  has_permission(auth.uid(), 'projects', 'delete') OR is_admin(auth.uid())
);

-- ============================================================
-- BLOG: Public read published, editors manage
-- ============================================================
CREATE POLICY blog_select ON blog_posts FOR SELECT USING (
  status = 'published' AND visibility = 'public'
  OR has_permission(auth.uid(), 'blog', 'read')
  OR is_admin(auth.uid())
);
CREATE POLICY blog_insert ON blog_posts FOR INSERT WITH CHECK (
  has_permission(auth.uid(), 'blog', 'create') OR is_admin(auth.uid())
);
CREATE POLICY blog_update ON blog_posts FOR UPDATE USING (
  has_permission(auth.uid(), 'blog', 'update') OR is_admin(auth.uid())
);
CREATE POLICY blog_delete ON blog_posts FOR DELETE USING (
  has_permission(auth.uid(), 'blog', 'delete') OR is_admin(auth.uid())
);

-- ============================================================
-- SERVICES: Public read published, editors manage
-- ============================================================
CREATE POLICY services_select ON services FOR SELECT USING (
  status = 'published' OR has_permission(auth.uid(), 'services', 'read') OR is_admin(auth.uid())
);
CREATE POLICY services_insert ON services FOR INSERT WITH CHECK (
  has_permission(auth.uid(), 'services', 'create') OR is_admin(auth.uid())
);
CREATE POLICY services_update ON services FOR UPDATE USING (
  has_permission(auth.uid(), 'services', 'update') OR is_admin(auth.uid())
);
CREATE POLICY services_delete ON services FOR DELETE USING (
  has_permission(auth.uid(), 'services', 'delete') OR is_admin(auth.uid())
);

-- ============================================================
-- MEDIA LIBRARY: Authenticated users manage their own, admins all
-- ============================================================
CREATE POLICY media_select ON media_library FOR SELECT USING (
  created_by = auth.uid() OR is_admin(auth.uid())
);
CREATE POLICY media_insert ON media_library FOR INSERT WITH CHECK (
  auth.role() = 'authenticated'
);
CREATE POLICY media_update ON media_library FOR UPDATE USING (
  created_by = auth.uid() OR is_admin(auth.uid())
);
CREATE POLICY media_delete ON media_library FOR DELETE USING (
  created_by = auth.uid() OR is_admin(auth.uid())
);

-- ============================================================
-- CONTACT: Staff can read/manage, public can insert
-- ============================================================
CREATE POLICY contacts_insert ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY contacts_select ON contact_messages FOR SELECT USING (
  has_permission(auth.uid(), 'contacts', 'read') OR is_admin(auth.uid())
);
CREATE POLICY contacts_update ON contact_messages FOR UPDATE USING (
  has_permission(auth.uid(), 'contacts', 'update') OR is_admin(auth.uid())
);

-- ============================================================
-- NEWSLETTER: Public can subscribe, staff can manage
-- ============================================================
CREATE POLICY newsletter_insert ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY newsletter_select ON newsletter_subscribers FOR SELECT USING (
  has_permission(auth.uid(), 'newsletter', 'read') OR is_admin(auth.uid())
);
CREATE POLICY newsletter_update ON newsletter_subscribers FOR UPDATE USING (
  has_permission(auth.uid(), 'newsletter', 'update') OR is_admin(auth.uid())
);

-- ============================================================
-- BOOKINGS: Public can create, staff can manage
-- ============================================================
CREATE POLICY bookings_insert ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY bookings_select ON bookings FOR SELECT USING (
  has_permission(auth.uid(), 'bookings', 'read') OR is_admin(auth.uid())
);
CREATE POLICY bookings_update ON bookings FOR UPDATE USING (
  has_permission(auth.uid(), 'bookings', 'update') OR is_admin(auth.uid())
);

-- ============================================================
-- CAREER: Public can apply, staff can manage
-- ============================================================
CREATE POLICY career_applications_insert ON career_applications FOR INSERT WITH CHECK (true);
CREATE POLICY career_applications_select ON career_applications FOR SELECT USING (
  has_permission(auth.uid(), 'career', 'read') OR is_admin(auth.uid())
);
CREATE POLICY career_applications_update ON career_applications FOR UPDATE USING (
  has_permission(auth.uid(), 'career', 'update') OR is_admin(auth.uid())
);
CREATE POLICY job_positions_select ON job_positions FOR SELECT USING (
  status = 'published' OR has_permission(auth.uid(), 'career', 'read') OR is_admin(auth.uid())
);
CREATE POLICY job_positions_insert ON job_positions FOR INSERT WITH CHECK (
  has_permission(auth.uid(), 'career', 'create') OR is_admin(auth.uid())
);

-- ============================================================
-- TESTIMONIALS: Public read, staff manage
-- ============================================================
CREATE POLICY testimonials_select ON testimonials FOR SELECT USING (
  status = 'published' OR has_permission(auth.uid(), 'testimonials', 'read') OR is_admin(auth.uid())
);
CREATE POLICY testimonials_insert ON testimonials FOR INSERT WITH CHECK (
  has_permission(auth.uid(), 'testimonials', 'create') OR is_admin(auth.uid())
);
CREATE POLICY testimonials_update ON testimonials FOR UPDATE USING (
  has_permission(auth.uid(), 'testimonials', 'update') OR is_admin(auth.uid())
);

-- ============================================================
-- TEAM: Public read, staff manage
-- ============================================================
CREATE POLICY team_select ON team_members FOR SELECT USING (
  status = 'published' OR has_permission(auth.uid(), 'team', 'read') OR is_admin(auth.uid())
);
CREATE POLICY team_insert ON team_members FOR INSERT WITH CHECK (
  has_permission(auth.uid(), 'team', 'create') OR is_admin(auth.uid())
);
CREATE POLICY team_update ON team_members FOR UPDATE USING (
  has_permission(auth.uid(), 'team', 'update') OR is_admin(auth.uid())
);

-- ============================================================
-- GENERIC: Auth required for CMS tables
-- ============================================================
CREATE POLICY faq_select ON faq FOR SELECT USING (true);
CREATE POLICY faq_insert ON faq FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY faq_update ON faq FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY awards_select ON awards FOR SELECT USING (true);
CREATE POLICY awards_insert ON awards FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY awards_update ON awards FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY partners_select ON partners FOR SELECT USING (true);
CREATE POLICY partners_insert ON partners FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY partners_update ON partners FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY gallery_select ON gallery FOR SELECT USING (true);
CREATE POLICY gallery_insert ON gallery FOR INSERT WITH CHECK (has_permission(auth.uid(), 'gallery', 'create') OR is_admin(auth.uid()));
CREATE POLICY gallery_update ON gallery FOR UPDATE USING (has_permission(auth.uid(), 'gallery', 'update') OR is_admin(auth.uid()));

CREATE POLICY navigation_select ON navigation FOR SELECT USING (true);
CREATE POLICY navigation_insert ON navigation FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY navigation_update ON navigation FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY site_settings_select ON site_settings FOR SELECT USING (true);
CREATE POLICY site_settings_update ON site_settings FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY notifications_select ON notifications FOR SELECT USING (auth.uid() = user_id OR is_admin(auth.uid()));
CREATE POLICY notifications_update ON notifications FOR UPDATE USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE POLICY activity_logs_select ON activity_logs FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY audit_logs_select ON audit_logs FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY leads_select ON leads FOR SELECT USING (
  has_permission(auth.uid(), 'leads', 'read') OR is_admin(auth.uid()) OR assigned_to = auth.uid()
);
CREATE POLICY leads_update ON leads FOR UPDATE USING (
  has_permission(auth.uid(), 'leads', 'update') OR is_admin(auth.uid()) OR assigned_to = auth.uid()
);
