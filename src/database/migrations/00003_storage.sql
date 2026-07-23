-- ============================================================
-- Migration 00003: Storage Configuration
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('public', 'public', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','image/gif','application/pdf']),
  ('private', 'private', false, 52428800, ARRAY['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','image/gif','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('media', 'media', false, 524288000, ARRAY['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','image/gif','video/mp4','video/webm','video/quicktime','application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public bucket read" ON storage.objects FOR SELECT USING (bucket_id = 'public');

CREATE POLICY "Authenticated users can upload to public" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'public' AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update own public uploads" ON storage.objects FOR UPDATE USING (
  bucket_id = 'public' AND auth.uid() = owner
);

CREATE POLICY "Admin access to private bucket" ON storage.objects FOR SELECT USING (
  bucket_id = 'private' AND is_admin(auth.uid())
);

CREATE POLICY "Authenticated users can upload to private" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'private' AND auth.role() = 'authenticated'
);

CREATE POLICY "Admin access to media bucket" ON storage.objects FOR ALL USING (
  bucket_id = 'media' AND is_admin(auth.uid())
);

CREATE POLICY "Staff can upload to media bucket" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'media' AND auth.role() = 'authenticated'
);
