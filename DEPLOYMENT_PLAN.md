# 🚀 Deployment Strategy for Asukeai

## For Private Repositories

Since Vercel requires a paid plan for private repos, here are the best alternatives:

### Option A: **Netlify** (Recommended for Private Repos)
- **Why:** Free tier includes private repos, excellent DX, automatic HTTPS
- **Cost:** FREE for private repos (300 build minutes/month)
- **Setup time:** 5 minutes
- **Includes:** Serverless functions, form handling, identity

### Option B: **Digital Ocean App Platform**
- **Why:** More control, better for complex apps, includes database
- **Cost:** $5/month (Basic tier)
- **Setup time:** 15 minutes
- **Includes:** Managed infrastructure, auto-scaling

## Recommended Architecture: Hybrid Approach

### 1. **Frontend & API: Netlify** (for private repos)
- **Why:** Free private repo deployment, serverless functions
- **Cost:** Free tier (300 build mins, 100GB bandwidth)
- **Setup time:** 5 minutes

### 2. **Database: Supabase** 
- **Why:** Already integrated, great TypeScript support, real-time capabilities
- **Cost:** Free tier = 500MB database, 2GB bandwidth
- **Setup time:** Already done

### 3. **Scrapers: GitHub Actions**
- **Why:** Free compute time, scheduled runs, integrated with repo
- **Cost:** 2,000 minutes/month free
- **Setup time:** 10 minutes

## Deployment Steps

### Option A: Deploy to Netlify (Recommended for Private Repos)

#### Step 1: Using Netlify CLI (5 mins)
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Deploy to production
netlify deploy --prod
```

#### Step 2: Using Netlify Dashboard
1. Go to https://app.netlify.com
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub account
4. Select your private repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site Settings

### Option B: Deploy to Digital Ocean App Platform

#### Step 1: Using DO CLI
```bash
# Install doctl
brew install doctl  # Mac
# or download from https://docs.digitalocean.com/reference/doctl/how-to/install/

# Authenticate
doctl auth init

# Create app
doctl apps create --spec .do/app.yaml
```

#### Step 2: Create app.yaml
```yaml
name: asukeai
region: nyc
services:
- name: web
  github:
    repo: your-username/asukeai
    branch: main
    deploy_on_push: true
  build_command: npm run build
  run_command: npm run preview
  environment_slug: node-js
  instance_size_slug: basic-xxs
  envs:
  - key: VITE_SUPABASE_URL
    scope: RUN_AND_BUILD
  - key: VITE_SUPABASE_ANON_KEY
    scope: RUN_AND_BUILD
```

### Step 2: Configure GitHub Secrets (5 mins)

In your GitHub repo settings > Secrets:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GROK_API_KEY`

### Step 3: Enable GitHub Actions (2 mins)

Push the `.github/workflows/scrape-events.yml` file to enable automated scraping.

## Security Considerations

### 1. **API Keys**
- Never commit `.env` files
- Use environment variables in all deployments
- Rotate keys regularly

### 2. **Rate Limiting**
```typescript
// Add to API routes
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};
```

### 3. **Supabase RLS**
- Public read access for events
- Authenticated write access only
- Enable email verification for uploads

### 4. **CORS Configuration**
```typescript
// vercel.json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://yourdomain.com" }
      ]
    }
  ]
}
```

## Cost Analysis

### Monthly Costs (Estimated)
- **Vercel:** $0 (Free tier)
- **Supabase:** $0 (Free tier)
- **GitHub Actions:** $0 (2000 mins free)
- **Total:** $0/month

### When to Upgrade
- **Vercel Pro ($20/mo):** When you need >100GB bandwidth
- **Supabase Pro ($25/mo):** When you need >500MB database
- **GitHub Actions:** When you need >2000 minutes

## Monitoring & Analytics

### 1. **Vercel Analytics**
- Built-in performance monitoring
- Real user metrics
- Free with deployment

### 2. **Supabase Dashboard**
- Query performance
- Database size
- API usage

### 3. **Error Tracking**
Consider adding Sentry (free tier available):
```bash
npm install @sentry/react
```

## Alternative Deployment Options

### Option B: Full Railway Deployment
**When to use:** If you need always-on scrapers or more control

```yaml
# railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Option C: Self-Hosted on VPS
**When to use:** Maximum control, cost optimization at scale

- DigitalOcean: $6/mo droplet
- Nginx reverse proxy
- PM2 for process management
- Let's Encrypt for SSL

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] GitHub secrets configured
- [ ] Supabase RLS policies enabled
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Error monitoring setup
- [ ] Analytics configured
- [ ] Backup strategy defined
- [ ] Rate limiting implemented
- [ ] CORS properly configured

## Quick Deploy Commands

```bash
# 1. Deploy frontend to Vercel
vercel --prod

# 2. Test production API
curl https://your-app.vercel.app/api/health

# 3. Trigger scraper manually
gh workflow run scrape-events

# 4. Monitor logs
vercel logs --follow
```

## Support & Maintenance

### Weekly Tasks
- Check scraper success rate
- Review error logs
- Update dependencies

### Monthly Tasks
- Rotate API keys
- Review usage metrics
- Database cleanup

### Emergency Contacts
- Vercel Status: https://vercel-status.com
- Supabase Status: https://status.supabase.com
- GitHub Status: https://githubstatus.com