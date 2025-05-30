-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Anyone can view event images" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "Anyone can upload event images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'event-images');

-- Optional: Add size limit (5MB)
CREATE POLICY "Limit upload size" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'event-images' AND
    (octet_length(content) / 1024 / 1024) <= 5
  );