# 🚀 Deployment Checklist - Ready for Railway!

## ✅ Pre-Deployment Status

### Completed
- [x] All code tested locally
- [x] Production build successful
- [x] GitHub Actions workflows created
- [x] Railway configuration prepared
- [x] start-railway.js script created
- [x] package.json updated with deployment scripts

### Pending (Need Admin Rights)
- [ ] Add GitHub secrets for scrapers
- [ ] Push code to repository
- [ ] Deploy to Railway

## 📋 Quick Deployment Steps (Once You Have Admin Rights)

### 1. Add GitHub Secrets
```bash
# Run the script we created
./add-github-secrets.sh
```

### 2. Push Latest Changes
```bash
git add .
git commit -m "Add deployment configuration and GitHub Actions"
git push origin dev
```

### 3. Deploy to Railway

#### Option A: Via Dashboard
1. Go to https://railway.app
2. New Project → Deploy from GitHub repo
3. Select `vfigunn/asukeai`
4. Configure environment variables (see below)

#### Option B: Via CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create new project
railway new

# Link to repo
railway link

# Add environment variables
railway variables set VITE_SUPABASE_URL=https://fzvxrynxceefuivagxmz.supabase.co
railway variables set VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
railway variables set VITE_API_URL=$RAILWAY_PUBLIC_DOMAIN

# Backend variables
railway variables set PORT=3001
railway variables set NODE_ENV=production
railway variables set SUPABASE_URL=https://fzvxrynxceefuivagxmz.supabase.co
railway variables set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
railway variables set OPENAI_API_KEY=sk-proj-...
railway variables set ANTHROPIC_API_KEY=sk-ant-api03-...
railway variables set GROK_API_KEY=xai-...
railway variables set CORS_ORIGIN=$RAILWAY_PUBLIC_DOMAIN

# Deploy
railway up
```

### 4. Update Production CORS
After deployment, update the backend CORS to use the Railway URL:
1. Get your Railway URL from dashboard
2. Update `backend/.env` CORS_ORIGIN
3. Redeploy

## 🧪 Post-Deployment Testing

### Frontend Tests
- [ ] Homepage loads
- [ ] Events display
- [ ] Filters work
- [ ] Search works
- [ ] Upload event form works
- [ ] Event modal opens

### Backend Tests
- [ ] API health check: `curl https://your-app.railway.app/api/health`
- [ ] Events API: `curl https://your-app.railway.app/api/events`
- [ ] Chat responds correctly

### Scraper Tests
- [ ] Go to GitHub Actions tab
- [ ] Manually trigger "Scrape Events" workflow
- [ ] Check logs for success
- [ ] Verify new events in Supabase

## 🔧 Troubleshooting

### Build Fails on Railway
- Check build logs in Railway dashboard
- Ensure all dependencies are in package.json
- Verify node version compatibility

### Frontend Can't Connect to Backend
- Check CORS settings
- Verify VITE_API_URL environment variable
- Check Railway logs for errors

### Scrapers Not Running
- Verify GitHub secrets are set
- Check Actions tab for errors
- Manually trigger to test

## 📊 Monitoring

### Railway Dashboard
- CPU/Memory usage
- Request logs
- Deploy history

### GitHub Actions
- Scraper run history
- Success/failure rates
- Execution time

### Supabase Dashboard
- Database size
- API usage
- Event count

## 🎉 Success Criteria
- [ ] App accessible via Railway URL
- [ ] All features working
- [ ] Scrapers running daily
- [ ] No console errors
- [ ] Performance acceptable

## 📝 Final Notes
- Railway auto-deploys on push to main/dev
- Scrapers run daily at 3 AM Paraguay time
- Monitor first few days closely
- Set up alerts for failures

Ready to deploy as soon as you get admin rights! 🚀