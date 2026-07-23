-- ============================================================
-- Migration 00006: Seed Data
-- ============================================================

-- ROLES
INSERT INTO roles (name, slug, description, is_system, sort_order) VALUES
  ('Owner', 'owner', 'Full system access including billing and team management', true, 1),
  ('Administrator', 'administrator', 'Full access to all CMS modules', true, 2),
  ('Editor', 'editor', 'Can create and edit content, publish with approval', true, 3),
  ('Marketing', 'marketing', 'Manages forms, leads, newsletter, and analytics', true, 4),
  ('Content Writer', 'content_writer', 'Can create and edit but not publish content', true, 5),
  ('Architect', 'architect', 'Manages projects, portfolio, and services', true, 6),
  ('Guest', 'guest', 'Read-only access to approved content', true, 7);

-- PERMISSION MODULES
INSERT INTO permissions (module, action, description) VALUES
  ('dashboard', 'view', 'View dashboard analytics'),
  ('projects', 'create', 'Create new projects'),
  ('projects', 'read', 'View projects including drafts'),
  ('projects', 'update', 'Edit projects'),
  ('projects', 'delete', 'Delete projects'),
  ('projects', 'publish', 'Publish/unpublish projects'),
  ('projects', 'archive', 'Archive projects'),
  ('blog', 'create', 'Create blog posts'),
  ('blog', 'read', 'View blog posts including drafts'),
  ('blog', 'update', 'Edit blog posts'),
  ('blog', 'delete', 'Delete blog posts'),
  ('blog', 'publish', 'Publish/unpublish blog posts'),
  ('services', 'create', 'Create services'),
  ('services', 'read', 'View services including drafts'),
  ('services', 'update', 'Edit services'),
  ('services', 'delete', 'Delete services'),
  ('services', 'publish', 'Publish/unpublish services'),
  ('media', 'upload', 'Upload media files'),
  ('media', 'read', 'View media library'),
  ('media', 'update', 'Edit media metadata'),
  ('media', 'delete', 'Delete media'),
  ('gallery', 'create', 'Add gallery items'),
  ('gallery', 'read', 'View gallery'),
  ('gallery', 'update', 'Edit gallery items'),
  ('gallery', 'delete', 'Delete gallery items'),
  ('testimonials', 'create', 'Add testimonials'),
  ('testimonials', 'read', 'View testimonials'),
  ('testimonials', 'update', 'Edit testimonials'),
  ('testimonials', 'delete', 'Delete testimonials'),
  ('team', 'create', 'Add team members'),
  ('team', 'read', 'View team members'),
  ('team', 'update', 'Edit team members'),
  ('team', 'delete', 'Delete team members'),
  ('team', 'publish', 'Publish/unpublish team members'),
  ('contacts', 'read', 'View contact messages'),
  ('contacts', 'update', 'Update contact/lead status'),
  ('contacts', 'delete', 'Delete contact messages'),
  ('leads', 'read', 'View lead dashboard'),
  ('leads', 'update', 'Update lead status and notes'),
  ('bookings', 'read', 'View booking requests'),
  ('bookings', 'update', 'Update booking status'),
  ('bookings', 'delete', 'Delete bookings'),
  ('newsletter', 'read', 'View subscribers'),
  ('newsletter', 'update', 'Manage subscribers'),
  ('newsletter', 'export', 'Export subscriber list'),
  ('career', 'create', 'Create job postings'),
  ('career', 'read', 'View applications and jobs'),
  ('career', 'update', 'Update job postings and application status'),
  ('career', 'delete', 'Delete job postings'),
  ('navigation', 'read', 'View navigation structure'),
  ('navigation', 'update', 'Edit navigation'),
  ('settings', 'read', 'View site settings'),
  ('settings', 'update', 'Update site settings'),
  ('seo', 'read', 'View SEO metadata'),
  ('seo', 'update', 'Update SEO metadata'),
  ('users', 'read', 'View user list'),
  ('users', 'create', 'Invite users'),
  ('users', 'update', 'Edit user roles and permissions'),
  ('users', 'delete', 'Remove users'),
  ('roles', 'read', 'View roles'),
  ('roles', 'update', 'Manage roles and permissions'),
  ('analytics', 'view', 'View analytics dashboards'),
  ('activity', 'read', 'View activity and audit logs'),
  ('notifications', 'read', 'View notifications'),
  ('notifications', 'update', 'Manage notification settings'),
  ('faq', 'create', 'Create FAQ items'),
  ('faq', 'read', 'View FAQ items'),
  ('faq', 'update', 'Edit FAQ items'),
  ('faq', 'delete', 'Delete FAQ items'),
  ('awards', 'create', 'Create awards'),
  ('awards', 'read', 'View awards'),
  ('awards', 'update', 'Edit awards'),
  ('awards', 'delete', 'Delete awards'),
  ('partners', 'create', 'Create partners'),
  ('partners', 'read', 'View partners'),
  ('partners', 'update', 'Edit partners'),
  ('partners', 'delete', 'Delete partners');

-- ASSIGN PERMISSIONS TO ROLES
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug IN ('owner', 'administrator');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'editor'
AND p.module IN ('dashboard', 'projects', 'blog', 'services', 'media', 'gallery', 'testimonials', 'team', 'faq', 'awards', 'partners', 'notifications', 'seo');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'marketing'
AND p.module IN ('dashboard', 'contacts', 'leads', 'bookings', 'newsletter', 'notifications', 'analytics');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'content_writer'
AND p.action IN ('create', 'read', 'update')
AND p.module IN ('projects', 'blog', 'services', 'media', 'gallery', 'testimonials', 'team', 'faq', 'seo');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'architect'
AND p.module IN ('projects', 'services', 'gallery', 'media', 'team');

-- DEFAULT SITE SETTINGS
INSERT INTO site_settings (key, value, description, group_name) VALUES
  ('site_name', '"PT Karya Nusantara Realty"', 'Company name', 'general'),
  ('site_description', '"Premium architecture and design consultancy delivering world-class built environments."', 'Site description', 'general'),
  ('site_url', '"https://karya-nusantara-realti.com"', 'Production URL', 'general'),
  ('locale', '"en"', 'Default locale', 'general'),
  ('timezone', '"Asia/Jakarta"', 'Default timezone', 'general'),
  ('currency', '"USD"', 'Default currency', 'general'),
  ('email_from', '"hello@karya-nusantara-realti.com"', 'From email address', 'email'),
  ('email_notifications', '"true"', 'Enable email notifications', 'email'),
  ('whatsapp_number', '""', 'WhatsApp business number', 'contact'),
  ('whatsapp_message', '"Hi, I would like to know more about your services."', 'Default WhatsApp message', 'contact'),
  ('google_maps_api_key', '""', 'Google Maps API key', 'integrations'),
  ('recaptcha_site_key', '""', 'reCAPTCHA site key', 'integrations'),
  ('recaptcha_secret_key', '""', 'reCAPTCHA secret key (encrypted)', 'integrations'),
  ('maintenance_mode', '"false"', 'Enable maintenance mode', 'general'),
  ('storage_limit', '"10485760"', 'Max upload file size in bytes', 'media');

-- DEFAULT NAVIGATION
INSERT INTO navigation (name, slug, description, location) VALUES
  ('Main Navigation', 'main', 'Primary header navigation', 'header'),
  ('Footer Navigation', 'footer', 'Footer links', 'footer'),
  ('Legal', 'legal', 'Legal pages in footer', 'footer');

-- DEFAULT JOB CATEGORIES
INSERT INTO job_categories (name, slug, description) VALUES
  ('Architecture', 'architecture', 'Architecture and design positions'),
  ('Engineering', 'engineering', 'Structural, MEP, and civil engineering'),
  ('Interior Design', 'interior-design', 'Interior design and space planning'),
  ('Project Management', 'project-management', 'Project and construction management'),
  ('Administration', 'administration', 'Office and administrative support');

-- DEFAULT FAQ CATEGORIES
INSERT INTO faq_categories (name, slug, description) VALUES
  ('General', 'general', 'General questions about our services'),
  ('Process', 'process', 'Questions about our design and construction process'),
  ('Pricing', 'pricing', 'Questions about pricing and fees'),
  ('Timeline', 'timeline', 'Questions about project timelines');

-- DEFAULT GALLERY CATEGORIES
INSERT INTO gallery_categories (name, slug, description) VALUES
  ('Residential', 'residential', 'Residential architecture projects'),
  ('Commercial', 'commercial', 'Commercial and office spaces'),
  ('Hospitality', 'hospitality', 'Hotels, resorts, and restaurants'),
  ('Cultural', 'cultural', 'Cultural and public buildings'),
  ('Interior', 'interior', 'Interior design projects'),
  ('Landscape', 'landscape', 'Landscape architecture');
