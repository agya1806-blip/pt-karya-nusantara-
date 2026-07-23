-- ============================================================================
-- Database Functions
-- ============================================================================

-- Generate URL-friendly slug from text
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        trim(input_text),
        '[^a-zA-Z0-9\s-]', '', 'g'
      ),
      '\s+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Get count of published items for dashboard stats
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
  total_projects BIGINT,
  published_projects BIGINT,
  total_services BIGINT,
  published_services BIGINT,
  total_blog_posts BIGINT,
  published_blog_posts BIGINT,
  total_team_members BIGINT,
  total_testimonials BIGINT,
  total_faq BIGINT,
  total_pricing_plans BIGINT,
  unread_submissions BIGINT,
  active_subscribers BIGINT,
  total_media BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM projects WHERE deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM projects WHERE status = 'published' AND deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM services WHERE deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM services WHERE status = 'published' AND deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM blog_posts WHERE deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM blog_posts WHERE status = 'published' AND deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM team_members WHERE deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM testimonials WHERE deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM faq)::BIGINT,
    (SELECT COUNT(*) FROM pricing_plans WHERE deleted_at IS NULL)::BIGINT,
    (SELECT COUNT(*) FROM form_submissions WHERE is_read = false)::BIGINT,
    (SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true)::BIGINT,
    (SELECT COUNT(*) FROM media_library WHERE deleted_at IS NULL)::BIGINT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Soft delete function
CREATE OR REPLACE FUNCTION soft_delete_record(
  table_name TEXT,
  record_id UUID
) RETURNS VOID AS $$
BEGIN
  EXECUTE format(
    'UPDATE %I SET deleted_at = now() WHERE id = $1',
    table_name
  ) USING record_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Search across multiple content types
CREATE OR REPLACE FUNCTION search_content(search_query TEXT)
RETURNS TABLE (
  id UUID,
  title TEXT,
  type TEXT,
  slug TEXT,
  excerpt TEXT,
  url TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  -- Projects
  SELECT
    p.id,
    p.title,
    'project'::TEXT,
    p.slug,
    LEFT(p.description, 200),
    '/portfolio/' || p.slug,
    ts_rank(to_tsvector('english', p.title || ' ' || p.description), plainto_tsquery('english', search_query))::REAL
  FROM projects p
  WHERE p.status = 'published'
    AND p.deleted_at IS NULL
    AND to_tsvector('english', p.title || ' ' || p.description) @@ plainto_tsquery('english', search_query)

  UNION ALL

  -- Services
  SELECT
    s.id,
    s.title,
    'service'::TEXT,
    s.slug,
    LEFT(s.description, 200),
    '/services/' || s.slug,
    ts_rank(to_tsvector('english', s.title || ' ' || s.description), plainto_tsquery('english', search_query))::REAL
  FROM services s
  WHERE s.status = 'published'
    AND s.deleted_at IS NULL
    AND to_tsvector('english', s.title || ' ' || s.description) @@ plainto_tsquery('english', search_query)

  UNION ALL

  -- Blog Posts
  SELECT
    b.id,
    b.title,
    'blog'::TEXT,
    b.slug,
    LEFT(COALESCE(b.excerpt, ''), 200),
    '/blog/' || b.slug,
    ts_rank(to_tsvector('english', b.title || ' ' || COALESCE(b.excerpt, '')), plainto_tsquery('english', search_query))::REAL
  FROM blog_posts b
  WHERE b.status = 'published'
    AND b.deleted_at IS NULL
    AND to_tsvector('english', b.title || ' ' || COALESCE(b.excerpt, '')) @@ plainto_tsquery('english', search_query)

  ORDER BY relevance DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
