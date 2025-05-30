# 🚀 Supabase Setup Guide for Asukeai

## Quick Setup (2 minutes)

### Step 1: Login to Supabase
1. Go to https://app.supabase.com
2. Open your project dashboard
3. Navigate to **SQL Editor** (left sidebar)

### Step 2: Run the Complete Setup
1. Click **New query**
2. Copy the entire contents of `complete-setup.sql`
3. Paste into the SQL editor
4. Click **Run** (or press Cmd/Ctrl + Enter)

### Step 3: Verify Setup
You should see:
- ✅ "Success. No rows returned" for table creation
- ✅ Sample events in the results
- ✅ Storage bucket created

### Step 4: Check Your Tables
1. Go to **Table Editor** (left sidebar)
2. You should see:
   - `events` table with 3 sample events
   - `scraped_raw_data` table (empty)
   - `scraper_runs` table (empty)

### Step 5: Check Storage
1. Go to **Storage** (left sidebar)
2. You should see:
   - `event-images` bucket (public)

## What Each Part Does

### Events Table
- **Main table** for all event data
- Includes coordinates (JSONB) for map features
- Has indexes for fast searching
- Unique event_hash prevents duplicates

### Storage Bucket
- **event-images**: For user-uploaded images
- 5MB size limit per image
- Public read access
- Anyone can upload (will add auth later)

### RLS Policies
- **Read**: Everyone can view events
- **Write**: Currently open (will add auth later)
- Protects against accidental data deletion

## Testing the Setup

### Test 1: View Events in App
1. Go to http://localhost:8080
2. You should see 3 sample events

### Test 2: Upload Form
1. Go to http://localhost:8080/upload
2. Try uploading an event with image
3. Check it appears on homepage

### Test 3: Chat
1. Go to http://localhost:8080/chat
2. Ask: "¿Qué eventos hay?"
3. Should list the events

## Troubleshooting

### If tables don't create:
- Check for syntax errors in SQL editor
- Make sure you're in the right project
- Try running sections individually

### If RLS blocks access:
- Temporarily disable RLS: `ALTER TABLE events DISABLE ROW LEVEL SECURITY;`
- Fix policies
- Re-enable: `ALTER TABLE events ENABLE ROW LEVEL SECURITY;`

### If storage doesn't work:
- Check bucket exists in Storage tab
- Verify policies are created
- Check file size (must be < 5MB)

## Next Steps
1. ✅ Run the setup SQL
2. ✅ Test the app works
3. ✅ Run scrapers to populate real data
4. ✅ Add authentication (later)