-- Migration: 00007_leads_bookings_notifications
-- Description: Adds lead management, booking, notification, awards, partners, tags, and career applications

BEGIN;

  -- Enums
  CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost');
  CREATE TYPE booking_type AS ENUM ('meeting', 'consultation', 'site_visit');
  CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
  CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'error');
  CREATE TYPE application_status AS ENUM ('new', 'reviewed', 'shortlisted', 'interviewed', 'offered', 'hired', 'rejected');

  -- Tags (polymorphic)
  CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE taggables (
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    taggable_id UUID NOT NULL,
    taggable_type TEXT NOT NULL,
    PRIMARY KEY (tag_id, taggable_id, taggable_type)
  );

  CREATE INDEX idx_tags_slug ON tags(slug);
  CREATE INDEX idx_tags_type ON tags(type);
  CREATE INDEX idx_taggables_type ON taggables(taggable_type, taggable_id);

  -- Leads
  CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL,
    status lead_status NOT NULL DEFAULT 'new',
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    message TEXT,
    metadata JSONB DEFAULT '{}',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    converted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_leads_status ON leads(status);
  CREATE INDEX idx_leads_source ON leads(source);
  CREATE INDEX idx_leads_assigned ON leads(assigned_to);
  CREATE INDEX idx_leads_created ON leads(created_at);

  -- Lead Activities
  CREATE TABLE lead_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_lead_activities_lead ON lead_activities(lead_id);
  CREATE INDEX idx_lead_activities_type ON lead_activities(type);

  -- Bookings
  CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    type booking_type NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    title TEXT NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER,
    location TEXT,
    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_bookings_status ON bookings(status);
  CREATE INDEX idx_bookings_type ON bookings(type);
  CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_at);
  CREATE INDEX idx_bookings_assigned ON bookings(assigned_to);

  -- Notifications
  CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL DEFAULT 'info',
    title TEXT NOT NULL,
    message TEXT,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_notifications_user ON notifications(user_id);
  CREATE INDEX idx_notifications_read ON notifications(is_read) WHERE is_read = false;
  CREATE INDEX idx_notifications_created ON notifications(created_at);

  -- Awards (standalone, reusable across entities)
  CREATE TABLE awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    organization TEXT,
    year TEXT NOT NULL,
    description TEXT,
    image_id UUID REFERENCES media_library(id) ON DELETE SET NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_awards_year ON awards(year);

  -- Awards pivot (polymorphic award assignments)
  CREATE TABLE awardables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    award_id UUID NOT NULL REFERENCES awards(id) ON DELETE CASCADE,
    awardable_id UUID NOT NULL,
    awardable_type TEXT NOT NULL,
    UNIQUE(award_id, awardable_id, awardable_type)
  );

  CREATE INDEX idx_awardables_type ON awardables(awardable_type, awardable_id);

  -- Partners
  CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_id UUID REFERENCES media_library(id) ON DELETE SET NULL,
    website_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_partners_active ON partners(is_active) WHERE is_active = true;
  CREATE INDEX idx_partners_slug ON partners(slug);

  -- Project Videos
  CREATE TABLE project_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT,
    url TEXT NOT NULL,
    platform TEXT DEFAULT 'youtube',
    thumbnail_id UUID REFERENCES media_library(id) ON DELETE SET NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_project_videos_project ON project_videos(project_id);

  -- Career Applications
  CREATE TABLE career_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    position_id UUID REFERENCES career_positions(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    cover_letter TEXT,
    resume_url TEXT,
    portfolio_url TEXT,
    status application_status NOT NULL DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_career_applications_position ON career_applications(position_id);
  CREATE INDEX idx_career_applications_status ON career_applications(status);

  -- SEO Rules (for automating SEO)
  CREATE TABLE seo_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern TEXT NOT NULL,
    title_template TEXT,
    description_template TEXT,
    og_title_template TEXT,
    og_description_template TEXT,
    priority INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- Analytics Events
  CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    page_url TEXT,
    session_id TEXT,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
  CREATE INDEX idx_analytics_events_created ON analytics_events(created_at);
  CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);

  -- Updated at triggers
  CREATE TRIGGER trg_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_awards_updated_at BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_career_applications_updated_at BEFORE UPDATE ON career_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_seo_rules_updated_at BEFORE UPDATE ON seo_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;
