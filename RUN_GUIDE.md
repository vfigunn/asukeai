# 🏃 Run Guide - How to Run Asukeai Locally

## Prerequisites
- Node.js (v18+ recommended)
- Python 3.8+
- Supabase account (free)
- Git

## Step 1: Clone and Setup

```bash
# If you haven't cloned yet
git clone your-repo-url
cd asukeai

# Switch to dev branch
git checkout dev
```

## Step 2: Install Frontend Dependencies

```bash
# Install all npm packages
npm install

# If you get errors, try:
npm install --legacy-peer-deps
```

## Step 3: Configure Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local with your actual values:
# - Go to https://app.supabase.com
# - Create a new project (or use existing)
# - Go to Settings > API
# - Copy Project URL and anon key
```

Your `.env.local` should look like:
```
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_OPENAI_API_KEY=sk-...
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_GROK_API_KEY=grok-...
```

## Step 4: Setup Supabase Database

1. Go to Supabase SQL Editor
2. Run the schema:

```sql
-- Copy and paste contents of supabase/schema.sql
```

3. Insert test data:

```sql
INSERT INTO events (id, name, date, time, address, description, price, image, tag)
VALUES 
  ('demo-1', 'Festival de Jazz', '2025-07-15', '20:00', 'Teatro Municipal, Asunción', 'Una noche inolvidable de jazz', '75000', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f', 'Música'),
  ('demo-2', 'Taller de Arte Digital', '2025-07-20', '10:00', 'Centro Cultural, Asunción', 'Aprende las últimas técnicas', '45000', 'https://images.unsplash.com/photo-1561070791-2526d30994b5', 'Arte'),
  ('demo-3', 'Maratón Asunción', '2025-08-01', '06:00', 'Costanera, Asunción', '5K, 10K y 21K', '50000', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571', 'Deportes');
```

## Step 5: Run the Frontend

```bash
# Start development server
npm run dev

# You should see:
# VITE v5.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173/
# ➜  Network: http://192.168.x.x:5173/
```

## Step 6: Test Each Route

Open http://localhost:5173 in your browser and test:

### 1. **Homepage** (`/`)
- ✅ Events should load from Supabase
- ✅ Filter by category works
- ✅ Search works
- ✅ Event modal opens

### 2. **AI Chat** (`/chat`)
- ✅ Chat interface loads
- ⚠️ Won't work without API endpoint (that's ok for now)

### 3. **Upload Event** (`/upload`)
- ✅ Form displays correctly
- ✅ All fields work
- ✅ Submit creates event in Supabase

### 4. **About** (`/nosotros`)
- ✅ Page loads

## Step 7: Test Scrapers (Optional)

```bash
# Setup Python environment
cd scrapers
python -m venv venv

# Activate virtual environment
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your Supabase credentials

# Test scraper
python src/test_scraper.py
```

## Common Issues & Solutions

### Issue: `npm install` fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Supabase connection fails
- Check `.env.local` values are correct
- Ensure tables are created in Supabase
- Check Row Level Security (RLS) is enabled

### Issue: Vite doesn't start
```bash
# Check port 5173 is not in use
lsof -i :5173  # Mac/Linux
netstat -ano | findstr :5173  # Windows

# Kill process if needed
kill -9 <PID>  # Mac/Linux
```

### Issue: Events don't show
1. Check browser console for errors
2. Verify Supabase has data
3. Check network tab for API calls

## Development Workflow

```bash
# 1. Make changes
# 2. Test locally
npm run dev

# 3. Run linter
npm run lint

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

## Next Steps

Once everything works locally:
1. Commit changes to dev branch
2. Create PR to main
3. Deploy to production

## Useful Commands

```bash
# View all npm scripts
npm run

# Test Supabase connection
npm run test:supabase

# Run all tests
npm run test:all

# Check TypeScript errors
npx tsc --noEmit
```