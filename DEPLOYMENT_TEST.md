# 🧪 Testing Deployment on Railway (Without Affecting Live Site)

## Overview
Deploy to Railway for testing using their free subdomain before switching your production domain.

## URLs You'll Get
- **Frontend**: `https://asukeai-test.railway.app`
- **Backend API**: Same URL (Railway handles routing)
- **Your current site**: Remains untouched at your domain

## Quick Deployment Steps

### 1. Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and create new project
railway login
railway init

# Choose a name like "asukeai-test" to make it clear it's for testing
```

### 2. Set Environment Variables
```bash
# Set all your env vars but with the Railway test URL
railway variables set VITE_API_URL=https://asukeai-test.railway.app
railway variables set CORS_ORIGIN=https://asukeai-test.railway.app
# ... add all other variables from .env files
```

### 3. Deploy
```bash
railway up
```

### 4. Test Everything
Your app will be live at: `https://asukeai-test.railway.app`

Test:
- ✅ Event listing
- ✅ AI chat
- ✅ Upload form (with password)
- ✅ All filters and search
- ✅ Mobile responsiveness

### 5. Share for Feedback
Share the Railway URL with your team for testing. The URL is public but:
- Upload form is password protected
- It's separate from your production data (if needed)

## When Ready for Production

### Option 1: Add Custom Domain to Railway
```bash
# In Railway dashboard
Settings > Domains > Add Custom Domain
# Point your domain's DNS to Railway
```

### Option 2: Deploy to Your Current Host
Once tested, deploy the same code to your production environment.

## Benefits of This Approach
1. **Zero Risk**: Production site stays unchanged
2. **Full Testing**: Complete app testing with real URLs
3. **Easy Rollback**: Just don't switch the domain if issues found
4. **Team Review**: Share test URL for feedback
5. **Performance Testing**: See how it performs on Railway

## Environment Variables for Testing

```bash
# Frontend (VITE_ prefix required)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_API_URL=https://asukeai-test.railway.app

# Backend
NODE_ENV=production
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GROK_API_KEY=your_grok_key
CORS_ORIGIN=https://asukeai-test.railway.app
```

## Notes
- Railway URLs are permanent (won't change)
- HTTPS is automatic
- You can have multiple deployments (staging, production)
- Free tier includes 500 hours/month