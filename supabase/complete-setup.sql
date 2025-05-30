-- ========================================
-- COMPLETE SUPABASE SETUP FOR ASUKEAI
-- Run this entire script in Supabase SQL Editor
-- ========================================

-- 1. EVENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  address TEXT,
  description TEXT,
  price TEXT,
  image TEXT,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  source_url TEXT,
  source_name TEXT,
  event_hash TEXT UNIQUE,
  coordinates JSONB,
  raw_data JSONB
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_tag ON events(tag);
CREATE INDEX IF NOT EXISTS idx_events_hash ON events(event_hash);
CREATE INDEX IF NOT EXISTS idx_events_source ON events(source_name);

-- 2. SCRAPER TABLES
-- ========================================
CREATE TABLE IF NOT EXISTS scraped_raw_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL,
  raw_content TEXT,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  processed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS scraper_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  completed_at TIMESTAMP WITH TIME ZONE,
  events_found INTEGER DEFAULT 0,
  status TEXT DEFAULT 'running'
);

-- 3. ENABLE ROW LEVEL SECURITY
-- ========================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_raw_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraper_runs ENABLE ROW LEVEL SECURITY;

-- 4. CREATE RLS POLICIES
-- ========================================
-- Events policies
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous updates" ON events
  FOR UPDATE USING (true);

-- Scraper data policies (read-only for public)
CREATE POLICY "Scraper data viewable by everyone" ON scraped_raw_data
  FOR SELECT USING (true);

CREATE POLICY "Scraper runs viewable by everyone" ON scraper_runs
  FOR SELECT USING (true);

-- 5. STORAGE BUCKET FOR IMAGES
-- ========================================
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view event images" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "Anyone can upload event images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'event-images');

-- 6. INSERT SAMPLE DATA (Optional - for testing)
-- ========================================
INSERT INTO events (id, name, date, time, address, description, price, image, tag, source_name, event_hash)
VALUES 
  ('sample-1', 'Festival de Jazz en el Parque', '2025-06-15', '19:00', 'Parque Ñu Guasu, Asunción', 
   'Una noche mágica de jazz bajo las estrellas con artistas nacionales e internacionales', 
   '50000', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'Música', 
   'manual', 'sample-1'),
  
  ('sample-2', 'Taller de Pintura para Principiantes', '2025-06-20', '10:00', 'Centro Cultural Juan de Salazar, Asunción', 
   'Aprende técnicas básicas de pintura acrílica con instructores profesionales', 
   '75000', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', 'Arte', 
   'manual', 'sample-2'),
  
  ('sample-3', 'Maratón Ciudad de Asunción 10K', '2025-07-01', '06:30', 'Costanera de Asunción', 
   'Participa en la carrera más importante del año. Incluye kit del corredor y medalla', 
   '80000', 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400', 'Deportes', 
   'manual', 'sample-3')
ON CONFLICT (id) DO NOTHING;

-- 7. VERIFY SETUP
-- ========================================
-- Run these queries to verify everything is working:

-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('events', 'scraped_raw_data', 'scraper_runs');

-- Check storage bucket
SELECT * FROM storage.buckets WHERE id = 'event-images';

-- Check sample events
SELECT id, name, date, tag FROM events ORDER BY date LIMIT 5;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('events', 'scraped_raw_data', 'scraper_runs');