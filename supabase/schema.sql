-- Events table matching your current data structure
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

-- Create index for faster queries
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_tag ON events(tag);
CREATE INDEX idx_events_hash ON events(event_hash);

-- Raw scraped data table
CREATE TABLE IF NOT EXISTS scraped_raw_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL,
  raw_content TEXT,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  processed BOOLEAN DEFAULT FALSE
);

-- Scraper runs for monitoring
CREATE TABLE IF NOT EXISTS scraper_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  completed_at TIMESTAMP WITH TIME ZONE,
  events_found INTEGER DEFAULT 0,
  status TEXT DEFAULT 'running'
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_raw_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraper_runs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous updates" ON events
  FOR UPDATE USING (true);