# 🔐 GitHub Secrets Configuration Guide

## Why GitHub Secrets?
GitHub Actions need these secrets to run the scrapers automatically. They're encrypted and never exposed in logs.

## Step-by-Step Setup

### 1. Navigate to Secrets
1. Go to your GitHub repository
2. Click on **Settings** (in the repo, not your profile)
3. In the left sidebar, click **Secrets and variables**
4. Click **Actions**

### 2. Add Required Secrets
Click **New repository secret** for each of these:

#### SUPABASE_URL
- **Name**: `SUPABASE_URL`
- **Value**: `https://fzvxrynxceefuivagxmz.supabase.co`

#### SUPABASE_ANON_KEY
- **Name**: `SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dnhyeW54Y2VlZnVpdmFneG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzQ5OTYsImV4cCI6MjA2NDExMDk5Nn0.Rck7JY3r_VC6m8f2iRgJTR4xNJahyMzN1oeFhLCbCVA`

#### OPENAI_API_KEY
- **Name**: `OPENAI_API_KEY`
- **Value**: Your OpenAI API key from backend/.env

#### ANTHROPIC_API_KEY
- **Name**: `ANTHROPIC_API_KEY`
- **Value**: Your Anthropic API key from backend/.env

#### GROK_API_KEY
- **Name**: `GROK_API_KEY`
- **Value**: Your Grok API key from backend/.env

## Verify Setup

### Test the Scraper Workflow
1. Go to the **Actions** tab in your repo
2. Find **"Scrape Events"** workflow
3. Click **"Run workflow"**
4. Select the branch (main or dev)
5. Click **"Run workflow"** button

### Check the Results
- The workflow should complete in 1-2 minutes
- Click on the run to see logs
- Check Supabase dashboard for new events

## Security Notes
- ✅ Secrets are encrypted at rest
- ✅ Never logged in GitHub Actions
- ✅ Only accessible to workflows in your repo
- ❌ Never commit these values in code
- ❌ Don't share screenshots of secrets page

## Troubleshooting

### "Secret not found" error
- Double-check the secret name matches exactly
- Ensure no extra spaces in the value

### "Authentication failed" error
- Verify the API key is correct
- Check if the key is still valid
- For Supabase, ensure RLS policies allow access

### Workflow doesn't appear
- Make sure .github/workflows/scrape-events.yml is committed
- Check you're on the right branch
- Refresh the Actions page