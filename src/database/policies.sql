-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PUBLIC ACCESS POLICIES
-- Only published/non-deleted content visible to anonymous users
-- ============================================================================

-- Projects: public can only see published, non-deleted
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  TO anon
  USING (status = 'published' AND deleted_at IS NULL);

-- Services: public can only see published, non-deleted
CREATE POLICY "Public can view published services"
  ON services FOR SELECT
  TO anon
  USING (status = 'published' AND deleted_at IS NULL);

-- Blog posts: public can only see published, non-deleted
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (status = 'published' AND deleted_at IS NULL);

-- Team members: public can only see non-deleted
CREATE POLICY "Public can view active team members"
  ON team_members FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

-- Testimonials: public can see all non-deleted
CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

-- FAQ: public can see published
CREATE POLICY "Public can view published faq"
  ON faq FOR SELECT
  TO anon
  USING (is_published = true);

-- Pricing: public can see active, non-deleted
CREATE POLICY "Public can view active pricing"
  ON pricing_plans FOR SELECT
  TO anon
  USING (is_active = true AND deleted_at IS NULL);

-- Gallery: public can see non-deleted
CREATE POLICY "Public can view gallery"
  ON gallery_items FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

-- Navigation: public can see active
CREATE POLICY "Public can view navigation"
  ON navigation_items FOR SELECT
  TO anon
  USING (is_active = true);

-- Career: public can see active
CREATE POLICY "Public can view career positions"
  ON career_positions FOR SELECT
  TO anon
  USING (is_active = true AND deleted_at IS NULL);

-- Contact info: public can view
CREATE POLICY "Public can view contact info"
  ON contact_info FOR SELECT
  TO anon
  USING (true);

-- Social media: public can view
CREATE POLICY "Public can view social media"
  ON social_media FOR SELECT
  TO anon
  USING (true);

-- Business hours: public can view
CREATE POLICY "Public can view business hours"
  ON business_hours FOR SELECT
  TO anon
  USING (true);

-- Company milestones: public can view
CREATE POLICY "Public can view milestones"
  ON company_milestones FOR SELECT
  TO anon
  USING (true);

-- Media library: public can view non-deleted media
CREATE POLICY "Public can view media"
  ON media_library FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

-- Newsletter: public can insert only
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (true);

-- Form submissions: public can insert only
CREATE POLICY "Public can submit forms"
  ON form_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Pages: public can view published
CREATE POLICY "Public can view published pages"
  ON pages FOR SELECT
  TO anon
  USING (status = 'published' AND deleted_at IS NULL);

-- Categories: public can view non-deleted
CREATE POLICY "Public can view project categories"
  ON project_categories FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

CREATE POLICY "Public can view service categories"
  ON service_categories FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

CREATE POLICY "Public can view blog categories"
  ON blog_categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view authors"
  ON authors FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

-- ============================================================================
-- AUTHENTICATED USER POLICIES
-- Authenticated users with appropriate roles have broader access
-- ============================================================================

-- Helper function to check if user has specific role
CREATE OR REPLACE FUNCTION auth_has_role(required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = required_role
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has at least the specified role level
CREATE OR REPLACE FUNCTION auth_has_minimum_role(min_role user_role)
RETURNS BOOLEAN AS $$
DECLARE
  role_hierarchy TEXT[] := ARRAY['author', 'marketing', 'editor', 'admin', 'super_admin'];
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND is_active = true
    AND array_position(role_hierarchy, role::TEXT) >=
        array_position(role_hierarchy, min_role::TEXT)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin users can manage all content
CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('admin'))
  WITH CHECK (auth_has_minimum_role('admin'));

CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('admin'))
  WITH CHECK (auth_has_minimum_role('admin'));

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('admin'))
  WITH CHECK (auth_has_minimum_role('admin'));

-- Editors can manage their own content
CREATE POLICY "Editors can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('editor'))
  WITH CHECK (auth_has_minimum_role('editor'));

CREATE POLICY "Editors can manage services"
  ON services FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('editor'))
  WITH CHECK (auth_has_minimum_role('editor'));

CREATE POLICY "Editors can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('editor'))
  WITH CHECK (auth_has_minimum_role('editor'));

-- Authors can manage blog posts and media
CREATE POLICY "Authors can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('author'))
  WITH CHECK (auth_has_minimum_role('author'));

CREATE POLICY "Authors can manage media"
  ON media_library FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('author'))
  WITH CHECK (auth_has_minimum_role('author'));

-- Marketing can manage testimonials, FAQ, pricing, navigation
CREATE POLICY "Marketing can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('marketing'))
  WITH CHECK (auth_has_minimum_role('marketing'));

CREATE POLICY "Marketing can manage faq"
  ON faq FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('marketing'))
  WITH CHECK (auth_has_minimum_role('marketing'));

CREATE POLICY "Marketing can manage pricing"
  ON pricing_plans FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('marketing'))
  WITH CHECK (auth_has_minimum_role('marketing'));

CREATE POLICY "Marketing can manage navigation"
  ON navigation_items FOR ALL
  TO authenticated
  USING (auth_has_minimum_role('marketing'))
  WITH CHECK (auth_has_minimum_role('marketing'));

-- Authenticated users can view their own audit trail
CREATE POLICY "Users can view their own audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
