# 🧪 Testing Guide for Asukeai

## Prerequisites
- Node.js installed
- Supabase account
- API keys for OpenAI/Claude/Grok (for later tests)

## Phase 1: Supabase Setup (15 mins)

### 1.1 Create Supabase Project
1. Go to https://app.supabase.com
2. Create new project
3. Go to Settings > API
4. Copy:
   - Project URL
   - anon (public) key

### 1.2 Create Database Tables
1. Go to SQL Editor in Supabase
2. Run the schema from `/supabase/schema.sql`
3. Verify tables created: `events`, `scraped_raw_data`, `scraper_runs`

### 1.3 Update Environment Variables
```bash
# Edit .env.local with your values
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 1.4 Test Supabase Connection
```bash
# Create and run test script
npm run test:supabase
```

## Phase 2: Frontend App Testing (20 mins)

### 2.1 Start Development Server
```bash
npm install
npm run dev
```

### 2.2 Test Event Display
1. Open http://localhost:5173
2. Check if events load (will be empty initially)
3. Check console for errors

### 2.3 Insert Test Data
Run this in Supabase SQL editor:
```sql
INSERT INTO events (id, name, date, time, address, description, price, image, tag)
VALUES 
  ('test-1', 'Concierto de Jazz', '2025-06-15', '20:00', 'Teatro Municipal, Asunción', 'Una noche de jazz inolvidable', '50000', 'https://via.placeholder.com/400', 'Música'),
  ('test-2', 'Taller de Pintura', '2025-06-20', '10:00', 'Centro Cultural, Asunción', 'Aprende técnicas de acuarela', '30000', 'https://via.placeholder.com/400', 'Arte'),
  ('test-3', 'Partido de Fútbol', '2025-06-25', '18:00', 'Estadio Defensores del Chaco', 'Clásico del fútbol paraguayo', '25000', 'https://via.placeholder.com/400', 'Deportes');
```

### 2.4 Verify Features
- [ ] Events display on homepage
- [ ] Filter by category works
- [ ] Search functionality works
- [ ] Event modal opens with details

## Phase 3: Manual Upload Form (15 mins)

### 3.1 Test Upload Form
1. Navigate to http://localhost:5173/upload
2. Fill out form:
   - Name: "Festival de Verano"
   - Date: Select future date
   - Time: 19:00
   - Address: "Costanera, Asunción"
   - Description: "Festival con música en vivo"
   - Price: 0
   - Category: Música
   - Image: Leave empty

3. Click "Agregar Evento"
4. Verify:
   - Success message appears
   - Redirects to homepage
   - New event appears in list

### 3.2 Test Validation
- [ ] Try submitting without required fields
- [ ] Verify error messages

## Phase 4: Scraper Testing (30 mins)

### 4.1 Setup Scraper Environment
```bash
cd scrapers
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4.2 Create .env file
```bash
cp .env.example .env
# Edit .env with your values
```

### 4.3 Test Ticketea Scraper
```bash
cd src
python test_scraper.py
```

### 4.4 Verify Scraper Results
1. Check Supabase dashboard
2. Look for new events in `events` table
3. Check `scraper_runs` table for run status

## Phase 5: AI Chat Testing (20 mins)

### 5.1 Test Chat Interface
1. Navigate to http://localhost:5173/chat
2. Ask: "¿Qué eventos hay este mes?"
3. Verify response includes events from database

### 5.2 Update API Endpoint
Create `/api/chat.ts` in project root for local testing

### 5.3 Test Different Queries
- [ ] "Eventos de música"
- [ ] "Eventos gratis"
- [ ] "Eventos en junio"

## Phase 6: Deployment Planning

### Option A: Vercel (Recommended)
**Pros:**
- Easy deployment
- Automatic HTTPS
- Serverless functions for API
- GitHub integration
- Free tier generous

**Cons:**
- Cold starts for functions
- Limited compute time

### Option B: Railway
**Pros:**
- Always-on containers
- Better for scrapers
- PostgreSQL included

**Cons:**
- More expensive
- More complex setup

### Option C: Hybrid
- Frontend + API: Vercel
- Scrapers: GitHub Actions
- Database: Supabase

### Deployment Checklist
- [ ] Environment variables set
- [ ] API routes configured
- [ ] CORS settings updated
- [ ] Rate limiting configured
- [ ] Error monitoring setup

## Troubleshooting

### Common Issues

1. **Supabase connection fails**
   - Check API keys
   - Verify RLS policies
   - Check network/firewall

2. **Events not displaying**
   - Check browser console
   - Verify Supabase data
   - Check eventService.ts

3. **Scraper fails**
   - Check Python dependencies
   - Verify API keys
   - Check website structure hasn't changed

4. **Chat not responding**
   - Verify OpenAI API key
   - Check API endpoint URL
   - Monitor rate limits

## Test Commands Script

Create `package.json` scripts:
```json
"scripts": {
  "test:supabase": "node src/tests/testSupabase.js",
  "test:scraper": "cd scrapers && python src/test_scraper.py",
  "test:all": "npm run test:supabase && npm run test:scraper"
}