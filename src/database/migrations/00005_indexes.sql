-- ============================================================
-- Migration 00005: Performance Indexes
-- ============================================================

-- Publication date ranges
CREATE INDEX idx_projects_published_at ON projects(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_services_published_at ON services(published_at DESC) WHERE status = 'published';

-- Featured content
CREATE INDEX idx_projects_featured_order ON projects(sort_order, published_at DESC) WHERE featured = true AND status = 'published';
CREATE INDEX idx_blog_posts_featured_order ON blog_posts(sort_order, published_at DESC) WHERE featured = true AND status = 'published';

-- Filtering indexes
CREATE INDEX idx_projects_filters ON projects(building_type, style, location, year) WHERE status = 'published';
CREATE INDEX idx_projects_area ON projects(area_size) WHERE status = 'published';
CREATE INDEX idx_projects_budget ON projects(budget) WHERE status = 'published';

-- Category lookups
CREATE INDEX idx_projects_category_slug ON project_categories(slug);
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX idx_service_categories_slug ON service_categories(slug);

-- Search optimization
CREATE INDEX idx_projects_search ON projects USING gin(
  coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(client_name,'') gin_trgm_ops
);
CREATE INDEX idx_blog_search ON blog_posts USING gin(
  coalesce(title,'') || ' ' || coalesce(excerpt,'') gin_trgm_ops
);
CREATE INDEX idx_services_search ON services USING gin(
  coalesce(title,'') || ' ' || coalesce(description,'') gin_trgm_ops
);
CREATE INDEX idx_team_search ON team_members USING gin(
  coalesce(name,'') || ' ' || coalesce(job_title,'') gin_trgm_ops
);

-- Contact/lead sorting
CREATE INDEX idx_contacts_lead_status ON contact_messages(lead_status, created_at DESC);
CREATE INDEX idx_consultation_status_date ON consultation_requests(lead_status, preferred_date);
CREATE INDEX idx_leads_status_score ON leads(status, score DESC);

-- Booking schedule lookup
CREATE INDEX idx_bookings_schedule ON bookings(preferred_date, preferred_time) WHERE status = 'confirmed';

-- Notification cleanup targeting
CREATE INDEX idx_notifications_cleanup ON notifications(created_at) WHERE is_read = true;

-- Activity log pruning
CREATE INDEX idx_activity_logs_prune ON activity_logs(created_at) WHERE created_at < now() - interval '90 days';

-- Slug uniqueness lookups
CREATE INDEX idx_projects_slug_active ON projects(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_blog_slug_active ON blog_posts(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_services_slug_active ON services(slug) WHERE deleted_at IS NULL;

-- JSONB indexes for filtering
CREATE INDEX idx_projects_content ON projects USING gin(content jsonb_path_ops);
CREATE INDEX idx_blog_content ON blog_posts USING gin(content jsonb_path_ops);

-- Foreign key performance
CREATE INDEX idx_project_images_media ON project_images(media_id);
CREATE INDEX idx_gallery_project ON gallery(project_id);
CREATE INDEX idx_awards_project ON awards(project_id);
CREATE INDEX idx_testimonials_project ON testimonials(project_id);
CREATE INDEX idx_testimonials_service ON testimonials(service_id);
