-- ============================================================================
-- Seed Data for PT Karya Nusantara Realty
-- ============================================================================

BEGIN;

-- Admin user (password will be set via Supabase Auth UI)
INSERT INTO users (id, email, name, role) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@karyanusantara.com', 'Admin KNR', 'super_admin');

-- Permissions
INSERT INTO permissions (resource, action, description) VALUES
  ('projects', 'manage', 'Full management of projects'),
  ('services', 'manage', 'Full management of services'),
  ('blog', 'manage', 'Full management of blog posts'),
  ('team', 'manage', 'Full management of team members'),
  ('testimonials', 'manage', 'Full management of testimonials'),
  ('faq', 'manage', 'Full management of FAQ'),
  ('pricing', 'manage', 'Full management of pricing plans'),
  ('media', 'manage', 'Full management of media library'),
  ('gallery', 'manage', 'Full management of gallery'),
  ('navigation', 'manage', 'Full management of navigation'),
  ('pages', 'manage', 'Full management of pages'),
  ('settings', 'manage', 'Full management of settings'),
  ('users', 'manage', 'Full management of users'),
  ('forms', 'manage', 'Full management of form submissions'),
  ('newsletter', 'manage', 'Full management of newsletter'),
  ('career', 'manage', 'Full management of career positions'),
  ('redirects', 'manage', 'Full management of redirects');

-- Project Categories
INSERT INTO project_categories (name, slug, description, sort_order) VALUES
  ('Residential', 'residential', 'Luxury residential architecture', 1),
  ('Commercial', 'commercial', 'Premium commercial spaces', 2),
  ('Hospitality', 'hospitality', 'World-class hospitality design', 3),
  ('Urban Design', 'urban-design', 'Master planning and urban design', 4),
  ('Interior', 'interior', 'Luxury interior architecture', 5);

-- Service Categories
INSERT INTO service_categories (name, slug, description, sort_order) VALUES
  ('Architecture', 'architecture', 'Full architectural design services', 1),
  ('Interior Design', 'interior-design', 'Interior architecture and design', 2),
  ('Master Planning', 'master-planning', 'Urban and master planning', 3),
  ('Consultation', 'consultation', 'Architectural consultation', 4);

-- Blog Categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Architecture', 'architecture', 'Architecture insights and trends'),
  ('Design', 'design', 'Design philosophy and innovation'),
  ('Sustainability', 'sustainability', 'Sustainable architecture practices'),
  ('Company News', 'company-news', 'Company updates and announcements');

-- Navigation Items
INSERT INTO navigation_items (label, url, sort_order) VALUES
  ('Home', '/', 1),
  ('About', '/about', 2),
  ('Services', '/services', 3),
  ('Portfolio', '/portfolio', 4),
  ('Gallery', '/gallery', 5),
  ('Process', '/process', 6),
  ('Blog', '/blog', 7),
  ('Contact', '/contact', 8);

-- Contact Info
INSERT INTO contact_info (label, value, icon, href, sort_order) VALUES
  ('Phone', '+62 21 1234 5678', 'Phone', 'tel:+622112345678', 1),
  ('Email', 'hello@karyanusantara.com', 'Mail', 'mailto:hello@karyanusantara.com', 2),
  ('Address', 'Jakarta, Indonesia', 'MapPin', null, 3);

-- Social Media
INSERT INTO social_media (platform, url, icon, sort_order) VALUES
  ('Instagram', 'https://instagram.com/karyanusantara', 'Instagram', 1),
  ('LinkedIn', 'https://linkedin.com/company/karyanusantara', 'LinkedIn', 2);

-- Business Hours
INSERT INTO business_hours (day, open_time, close_time, is_closed, sort_order) VALUES
  ('Monday', '09:00', '17:00', false, 1),
  ('Tuesday', '09:00', '17:00', false, 2),
  ('Wednesday', '09:00', '17:00', false, 3),
  ('Thursday', '09:00', '17:00', false, 4),
  ('Friday', '09:00', '17:00', false, 5),
  ('Saturday', null, null, true, 6),
  ('Sunday', null, null, true, 7);

-- Global Settings
INSERT INTO global_settings (key, value) VALUES
  ('site_name', '"PT Karya Nusantara Realty"'),
  ('site_description', '"World-class luxury architecture and design firm"'),
  ('currency', '"IDR"'),
  ('locale', '"id_ID"'),
  ('timezone', '"Asia/Jakarta"'),
  ('logo', 'null'),
  ('favicon', 'null'),
  ('google_analytics_id', '""'),
  ('google_tag_manager_id', '""');

-- Forms
INSERT INTO forms (type, title, fields) VALUES
  ('contact', 'Contact Us', '[
    {"name": "name", "type": "text", "label": "Full Name", "required": true},
    {"name": "email", "type": "email", "label": "Email Address", "required": true},
    {"name": "phone", "type": "tel", "label": "Phone Number", "required": false},
    {"name": "subject", "type": "text", "label": "Subject", "required": true},
    {"name": "message", "type": "textarea", "label": "Message", "required": true}
  ]'),
  ('consultation', 'Consultation Request', '[
    {"name": "name", "type": "text", "label": "Full Name", "required": true},
    {"name": "email", "type": "email", "label": "Email Address", "required": true},
    {"name": "phone", "type": "tel", "label": "Phone Number", "required": true},
    {"name": "project_type", "type": "select", "label": "Project Type", "required": true,
     "options": ["Residential","Commercial","Hospitality","Urban Design","Interior","Other"]},
    {"name": "budget_range", "type": "select", "label": "Budget Range", "required": true,
     "options": ["< $100K","$100K - $500K","$500K - $1M","$1M - $5M","$5M+"]},
    {"name": "description", "type": "textarea", "label": "Project Description", "required": true},
    {"name": "timeline", "type": "text", "label": "Expected Timeline", "required": false}
  ]'),
  ('career', 'Career Application', '[
    {"name": "name", "type": "text", "label": "Full Name", "required": true},
    {"name": "email", "type": "email", "label": "Email Address", "required": true},
    {"name": "phone", "type": "tel", "label": "Phone Number", "required": true},
    {"name": "position", "type": "text", "label": "Position Applied For", "required": true},
    {"name": "cover_letter", "type": "textarea", "label": "Cover Letter", "required": true},
    {"name": "resume", "type": "file", "label": "Resume / CV", "required": true}
  ]');

COMMIT;
