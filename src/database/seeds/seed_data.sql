-- ============================================================
-- Seed: Demo data for development (run separately from migration)
-- ============================================================

-- Sample admin user (password: admin123)
-- NOTE: In production, use supabase CLI or dashboard to create users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
SELECT
  '00000000-0000-0000-0000-000000000001',
  'admin@karya-nusantara-realti.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"display_name":"Admin User"}'
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@karya-nusantara-realti.com');

-- Assign admin role
INSERT INTO user_roles (user_id, role_id)
SELECT '00000000-0000-0000-0000-000000000001', id FROM roles WHERE slug = 'administrator'
ON CONFLICT DO NOTHING;

-- Sample author
INSERT INTO authors (name, slug, bio, job_title) VALUES
  ('Admin User', 'admin-user', 'Platform administrator and content curator.', 'Content Director')
ON CONFLICT DO NOTHING;

-- Sample project categories
INSERT INTO project_categories (name, slug, description) VALUES
  ('Residential', 'residential', 'Luxury residential architecture projects'),
  ('Commercial', 'commercial', 'Commercial and mixed-use developments'),
  ('Hospitality', 'hospitality', 'Hotels, resorts, and hospitality spaces'),
  ('Cultural', 'cultural', 'Cultural institutions and public buildings'),
  ('Interior', 'interior', 'Interior architecture and design')
ON CONFLICT (slug) DO NOTHING;

-- Sample services
INSERT INTO service_categories (name, slug, description) VALUES
  ('Architecture', 'architecture', 'Full-service architectural design'),
  ('Interior Design', 'interior-design', 'Interior architecture and space planning'),
  ('Master Planning', 'master-planning', 'Urban and master planning'),
  ('Landscape', 'landscape', 'Landscape architecture'),
  ('Consulting', 'consulting', 'Design and construction consulting')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (title, slug, description, status, features) VALUES
  ('Architectural Design', 'architectural-design', 'Comprehensive architectural design from concept to construction documentation.', 'published', '["Concept Design","Schematic Design","Design Development","Construction Documents","Permitting Support"]'),
  ('Interior Architecture', 'interior-architecture', 'Spatial planning and interior architecture for luxury spaces.', 'published', '["Space Planning","Material Selection","Custom Millwork","Lighting Design","FF&E"]'),
  ('Master Planning', 'master-planning', 'Strategic planning for large-scale developments and communities.', 'published', '["Site Analysis","Zoning Studies","Infrastructure Planning","Phasing Strategy","Environmental Impact"]'),
  ('Landscape Architecture', 'landscape-architecture', 'Integrated landscape design that complements architectural vision.', 'published', '["Site Planning","Garden Design","Hardscape","Planting Design","Irrigation Planning"]'),
  ('Design Consultation', 'design-consultation', 'Expert design consultation for projects at any stage.', 'published', '["Feasibility Study","Design Review","Value Engineering","Sustainability Consulting","Budget Planning"]')
ON CONFLICT (slug) DO NOTHING;

-- Sample blog categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Design', 'design', 'Architectural design insights'),
  ('Sustainability', 'sustainability', 'Sustainable architecture practices'),
  ('Industry', 'industry', 'Architecture industry news and trends'),
  ('Process', 'process', 'Behind-the-scenes of our design process')
ON CONFLICT (slug) DO NOTHING;

-- Sample FAQ
INSERT INTO faq (question, answer, status) VALUES
  ('What is the typical timeline for a residential project?', 'A typical residential project takes 6-12 months from concept to completion, depending on complexity, permitting requirements, and site conditions.', 'published'),
  ('How do you charge for your services?', 'Our fee structure is typically a percentage of the construction cost, ranging from 8-15% depending on project scope and complexity. We also offer fixed-fee arrangements for defined scopes.', 'published'),
  ('Do you handle permit applications?', 'Yes, we manage the entire permitting process including preparing submission documents, coordinating with authorities, and addressing review comments.', 'published'),
  ('Can you work with my existing architect or contractor?', 'We regularly collaborate with other professionals and are happy to work with your existing team to ensure project success.', 'published'),
  ('What is your design philosophy?', 'We believe in creating architecture that responds to its context, serves its inhabitants, and stands the test of time. Every project begins with deep listening and understanding.', 'published')
ON CONFLICT DO NOTHING;

-- Sample team members
INSERT INTO team_members (name, slug, job_title, department, is_featured, status) VALUES
  ('Alexander Wirawan', 'alexander-wirawan', 'Principal Architect', 'Architecture', true, 'published'),
  ('Maria Santoso', 'maria-santoso', 'Senior Interior Designer', 'Interior Design', true, 'published'),
  ('David Chen', 'david-chen', 'Project Manager', 'Project Management', true, 'published'),
  ('Sarah Lim', 'sarah-lim', 'Architect', 'Architecture', true, 'published'),
  ('Michael Tan', 'michael-tan', 'Landscape Architect', 'Landscape', true, 'published'),
  ('Julia Kusuma', 'julia-kusuma', 'Junior Architect', 'Architecture', true, 'published')
ON CONFLICT (slug) DO NOTHING;
