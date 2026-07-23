-- Migration: 00007_fix_missing_tables
-- Description: Add tables referenced by RLS policies (00002), functions (00004),
--   indexes (00005), and seed data (00006) that were missing from the initial schema (00001)

BEGIN;

  -- Extensions (safe re-run)
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  -- ============================================================
  -- 1. roles
  -- ============================================================
  CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    is_system BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 2. user_roles
  -- ============================================================
  CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, role_id)
  );

  -- ============================================================
  -- 3. profiles
  -- ============================================================
  CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    job_title TEXT,
    phone TEXT,
    bio TEXT,
    social_links JSONB DEFAULT '{}',
    preferences JSONB DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 4. site_settings (alias for global_settings, for compatibility)
  -- ============================================================
  CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL DEFAULT '{}',
    description TEXT,
    group_name TEXT DEFAULT 'general',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 5. navigation
  -- ============================================================
  CREATE TABLE IF NOT EXISTS navigation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    location TEXT DEFAULT 'header',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 6. gallery (alias for gallery_items, for compatibility)
  -- ============================================================
  CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT,
    media_id UUID NOT NULL REFERENCES media_library(id) ON DELETE CASCADE,
    category TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 7. contact_messages
  -- ============================================================
  CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    lead_status TEXT DEFAULT 'new',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 8. consultation_requests
  -- ============================================================
  CREATE TABLE IF NOT EXISTS consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT,
    preferred_date DATE,
    preferred_time TIME,
    consultation_type TEXT,
    budget_range TEXT,
    message TEXT,
    lead_status TEXT DEFAULT 'new',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 9. bookings
  -- ============================================================
  CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    consultation_type TEXT,
    project_type TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 10. job_positions
  -- ============================================================
  CREATE TABLE IF NOT EXISTS job_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    department TEXT,
    location TEXT,
    type TEXT DEFAULT 'full-time',
    description TEXT,
    requirements JSONB DEFAULT '[]',
    benefits JSONB DEFAULT '[]',
    salary_min NUMERIC(12,2),
    salary_max NUMERIC(12,2),
    status TEXT DEFAULT 'draft',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
  );

  -- ============================================================
  -- 11. career_applications
  -- ============================================================
  CREATE TABLE IF NOT EXISTS career_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES job_positions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    portfolio_url TEXT,
    linkedin_url TEXT,
    status TEXT DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 12. leads
  -- ============================================================
  CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    source TEXT,
    status TEXT DEFAULT 'new',
    score INTEGER DEFAULT 0,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 13. awards
  -- ============================================================
  CREATE TABLE IF NOT EXISTS awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    organization TEXT,
    year TEXT,
    description TEXT,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    image_id UUID REFERENCES media_library(id) ON DELETE SET NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 14. partners
  -- ============================================================
  CREATE TABLE IF NOT EXISTS partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    url TEXT,
    logo_id UUID REFERENCES media_library(id) ON DELETE SET NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 15. notifications
  -- ============================================================
  CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT DEFAULT 'dashboard',
    priority TEXT DEFAULT 'medium',
    title TEXT NOT NULL,
    message TEXT,
    link TEXT,
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 16. job_categories
  -- ============================================================
  CREATE TABLE IF NOT EXISTS job_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 17. faq_categories
  -- ============================================================
  CREATE TABLE IF NOT EXISTS faq_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 18. gallery_categories
  -- ============================================================
  CREATE TABLE IF NOT EXISTS gallery_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 19. project_videos
  -- ============================================================
  CREATE TABLE IF NOT EXISTS project_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title TEXT,
    provider TEXT DEFAULT 'youtube',
    video_id TEXT,
    thumbnail_url TEXT,
    duration INTEGER,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 20. media_folders
  -- ============================================================
  CREATE TABLE IF NOT EXISTS media_folders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES media_folders(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 21. clients
  -- ============================================================
  CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_id UUID REFERENCES media_library(id) ON DELETE SET NULL,
    website TEXT,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- ============================================================
  -- 22. tags and taggables
  -- ============================================================
  CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS taggables (
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    taggable_id UUID NOT NULL,
    taggable_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (tag_id, taggable_id, taggable_type)
  );

  -- ============================================================
  -- Indexes
  -- ============================================================

  -- roles
  CREATE INDEX IF NOT EXISTS idx_roles_sort_order ON roles(sort_order);
  CREATE INDEX IF NOT EXISTS idx_roles_is_system ON roles(is_system);

  -- user_roles
  CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
  CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);

  -- profiles
  CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);
  CREATE INDEX IF NOT EXISTS idx_profiles_display_name ON profiles(display_name);

  -- site_settings
  CREATE INDEX IF NOT EXISTS idx_site_settings_group ON site_settings(group_name);

  -- navigation
  CREATE INDEX IF NOT EXISTS idx_navigation_location ON navigation(location);

  -- gallery
  CREATE INDEX IF NOT EXISTS idx_gallery_media ON gallery(media_id);
  CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
  CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(is_featured) WHERE is_featured = true;

  -- contact_messages
  CREATE INDEX IF NOT EXISTS idx_contacts_email ON contact_messages(email);
  CREATE INDEX IF NOT EXISTS idx_contacts_assigned ON contact_messages(assigned_to);

  -- consultation_requests
  CREATE INDEX IF NOT EXISTS idx_consultation_email ON consultation_requests(email);
  CREATE INDEX IF NOT EXISTS idx_consultation_assigned ON consultation_requests(assigned_to);

  -- bookings
  CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
  CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
  CREATE INDEX IF NOT EXISTS idx_bookings_assigned ON bookings(assigned_to);

  -- job_positions
  CREATE INDEX IF NOT EXISTS idx_job_positions_department ON job_positions(department);
  CREATE INDEX IF NOT EXISTS idx_job_positions_status ON job_positions(status);
  CREATE INDEX IF NOT EXISTS idx_job_positions_active ON job_positions(is_active) WHERE is_active = true;
  CREATE INDEX IF NOT EXISTS idx_job_positions_deleted ON job_positions(deleted_at);

  -- career_applications
  CREATE INDEX IF NOT EXISTS idx_career_apps_job ON career_applications(job_id);
  CREATE INDEX IF NOT EXISTS idx_career_apps_status ON career_applications(status);

  -- leads
  CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
  CREATE INDEX IF NOT EXISTS idx_leads_assigned ON leads(assigned_to);
  CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

  -- awards
  CREATE INDEX IF NOT EXISTS idx_awards_organization ON awards(organization);
  CREATE INDEX IF NOT EXISTS idx_awards_year ON awards(year);

  -- partners
  CREATE INDEX IF NOT EXISTS idx_partners_active ON partners(is_active) WHERE is_active = true;

  -- notifications
  CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
  CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
  CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(is_read) WHERE is_read = false;

  -- job_categories
  CREATE INDEX IF NOT EXISTS idx_job_categories_slug ON job_categories(slug);

  -- faq_categories
  CREATE INDEX IF NOT EXISTS idx_faq_categories_slug ON faq_categories(slug);

  -- gallery_categories
  CREATE INDEX IF NOT EXISTS idx_gallery_categories_slug ON gallery_categories(slug);

  -- project_videos
  CREATE INDEX IF NOT EXISTS idx_project_videos_project ON project_videos(project_id);
  CREATE INDEX IF NOT EXISTS idx_project_videos_featured ON project_videos(is_featured) WHERE is_featured = true;

  -- media_folders
  CREATE INDEX IF NOT EXISTS idx_media_folders_parent ON media_folders(parent_id);

  -- clients
  CREATE INDEX IF NOT EXISTS idx_clients_featured ON clients(is_featured) WHERE is_featured = true;

  -- taggables
  CREATE INDEX IF NOT EXISTS idx_taggables_tag ON taggables(tag_id);
  CREATE INDEX IF NOT EXISTS idx_taggables_taggable ON taggables(taggable_id, taggable_type);

  -- ============================================================
  -- updated_at triggers
  -- ============================================================
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

  CREATE TRIGGER trg_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_navigation_updated_at BEFORE UPDATE ON navigation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_gallery_updated_at BEFORE UPDATE ON gallery FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_consultation_requests_updated_at BEFORE UPDATE ON consultation_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_job_positions_updated_at BEFORE UPDATE ON job_positions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_career_applications_updated_at BEFORE UPDATE ON career_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_awards_updated_at BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_job_categories_updated_at BEFORE UPDATE ON job_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_faq_categories_updated_at BEFORE UPDATE ON faq_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_gallery_categories_updated_at BEFORE UPDATE ON gallery_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_media_folders_updated_at BEFORE UPDATE ON media_folders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER trg_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;
