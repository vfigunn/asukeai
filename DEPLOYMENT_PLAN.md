# 🚀 Deployment Strategy for Asukeai

## Chosen Platform: Railway

After evaluation, we've chosen **Railway** for deployment because:
- ✅ Perfect for monorepos (frontend + backend)
- ✅ Supports private repositories
- ✅ Built-in logging and monitoring
- ✅ Easy environment variable management
- ✅ Automatic HTTPS
- ✅ Can migrate to Docker/DO later if needed

## Architecture

### 1. **Main App: Railway**
- **Frontend**: React + Vite (served as static files)
- **Backend**: Express/Fastify API
- **Cost**: $5/month (Hobby plan) or usage-based
- **Features**: Auto-deploy on push, rollbacks, logs

### 2. **Database: Supabase**
- **Already configured and working**
- **Cost**: Free tier (500MB database, 2GB bandwidth)
- **Features**: Real-time, Auth, Storage

### 3. **Scrapers: GitHub Actions**
- **Scheduled runs**: Daily at 3 AM Paraguay time
- **Manual triggers**: Via GitHub UI
- **Cost**: Free (2,000 minutes/month)
- **Monitoring**: Action logs and artifacts

## Pre-Deployment Checklist

### GitHub Secrets Required
Go to your repo Settings > Secrets and add:
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `OPENAI_API_KEY`
- [ ] `ANTHROPIC_API_KEY`
- [ ] `GROK_API_KEY`

### Local Testing
- [x] Frontend works on localhost:8080
- [x] Backend works on localhost:3001
- [x] Supabase connection verified
- [x] AI chat functioning
- [x] Scrapers tested successfully

## Railway Deployment Steps

### Step 1: Prepare the Project

1. **Create start script for Railway**:
```bash
# Create start-railway.js in project root
```

2. **Update package.json**:
```json
{
  "scripts": {
    "start": "node start-railway.js",
    "build:all": "npm run build && cd backend && npm run build"
  }
}
```

### Step 2: Deploy to Railway

1. **Install Railway CLI**:
```bash
npm install -g @railway/cli
```

2. **Login and Initialize**:
```bash
railway login
railway link  # Select your project or create new
```

3. **Set Environment Variables**:
```bash
# Frontend variables
railway variables set VITE_SUPABASE_URL=your_url
railway variables set VITE_SUPABASE_ANON_KEY=your_key
railway variables set VITE_API_URL=https://your-app.railway.app

# Backend variables
railway variables set PORT=3001
railway variables set NODE_ENV=production
railway variables set SUPABASE_URL=your_url
railway variables set SUPABASE_ANON_KEY=your_key
railway variables set OPENAI_API_KEY=your_key
railway variables set ANTHROPIC_API_KEY=your_key
railway variables set GROK_API_KEY=your_key
railway variables set CORS_ORIGIN=https://your-app.railway.app
```

4. **Deploy**:
```bash
railway up
```

### Step 3: Configure Production

1. **Update Backend CORS**:
   - Change from `http://localhost:8080` to your Railway URL

2. **Update Frontend API URL**:
   - Change from `http://localhost:3001` to production URL

3. **Enable GitHub Integration**:
   - In Railway dashboard, connect GitHub repo
   - Enable auto-deploy on push

## Post-Deployment Tasks

### 1. Test Everything
- [ ] Homepage loads with events
- [ ] Filters and search work
- [ ] Upload event form works
- [ ] AI chat responds correctly
- [ ] Check browser console for errors

### 2. Monitor Scrapers
- [ ] Manually trigger scraper workflow
- [ ] Check GitHub Actions logs
- [ ] Verify new events in Supabase

### 3. Set Up Monitoring
- [ ] Check Railway metrics dashboard
- [ ] Set up uptime monitoring (UptimeRobot free tier)
- [ ] Configure error alerts

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Railway build logs
   - Verify all dependencies are in package.json
   - Ensure build commands are correct

2. **API Not Working**
   - Check CORS configuration
   - Verify environment variables
   - Check Railway logs for errors

3. **Scrapers Not Running**
   - Check GitHub Actions tab
   - Verify secrets are set
   - Manually trigger to test

## Future Enhancements

### Phase 2: Scaling
- Add Redis for caching
- Implement rate limiting
- Add CDN for static assets

### Phase 3: Docker Migration (if needed)
- Create Dockerfile
- Set up docker-compose
- Deploy to Digital Ocean

## Monitoring Commands

```bash
# View logs
railway logs

# Check deployment status
railway status

# Open in browser
railway open

# SSH into container (if needed)
railway run bash
```

## Cost Optimization

### Current Monthly Estimate
- Railway: ~$5 (Hobby plan)
- Supabase: $0 (Free tier)
- GitHub Actions: $0 (Free tier)
- **Total: ~$5/month**

### When to Upgrade
- Railway: When you need more resources or custom domains
- Supabase: When database > 500MB or need more bandwidth
- Consider DO/Docker when: Need more control or cost > $20/month

## Emergency Procedures

### Rollback Deployment
```bash
# Via Railway dashboard or:
railway rollback
```

### Disable Scrapers
```bash
# Disable workflow in GitHub Actions tab
# or comment out schedule in .github/workflows/scrape-events.yml
```

### Database Issues
- Check Supabase dashboard
- Use Supabase CLI for backups
- Have backup export ready