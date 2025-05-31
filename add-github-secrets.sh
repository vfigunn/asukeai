#!/bin/bash

# GitHub Secrets Setup Script for Asukeai
# This script adds all required secrets to your GitHub repository

echo "🔐 GitHub Secrets Setup for Asukeai"
echo "===================================="
echo ""

# Check if gh CLI is authenticated
if ! gh auth status >/dev/null 2>&1; then
    echo "❌ GitHub CLI is not authenticated!"
    echo "Please run: gh auth login"
    echo "Then run this script again."
    exit 1
fi

# Get repository name
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
if [ -z "$REPO" ]; then
    echo "❌ Could not determine repository. Make sure you're in the repo directory."
    exit 1
fi

echo "📍 Repository: $REPO"
echo ""

# Read secrets from .env files
echo "📖 Reading secrets from local .env files..."

# Get values from backend/.env
SUPABASE_URL=$(grep "^SUPABASE_URL=" backend/.env | cut -d '=' -f2)
SUPABASE_ANON_KEY=$(grep "^SUPABASE_ANON_KEY=" backend/.env | cut -d '=' -f2)
OPENAI_API_KEY=$(grep "^OPENAI_API_KEY=" backend/.env | cut -d '=' -f2)
ANTHROPIC_API_KEY=$(grep "^ANTHROPIC_API_KEY=" backend/.env | cut -d '=' -f2)
GROK_API_KEY=$(grep "^GROK_API_KEY=" backend/.env | cut -d '=' -f2)

# Verify we have all values
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ] || [ -z "$OPENAI_API_KEY" ] || [ -z "$ANTHROPIC_API_KEY" ] || [ -z "$GROK_API_KEY" ]; then
    echo "❌ Missing required values in backend/.env"
    echo "Please ensure all these keys are present:"
    echo "  - SUPABASE_URL"
    echo "  - SUPABASE_ANON_KEY"
    echo "  - OPENAI_API_KEY"
    echo "  - ANTHROPIC_API_KEY"
    echo "  - GROK_API_KEY"
    exit 1
fi

echo "✅ All secrets found!"
echo ""
echo "🚀 Adding secrets to GitHub..."

# Add secrets to GitHub
gh secret set SUPABASE_URL --body="$SUPABASE_URL" && echo "✅ SUPABASE_URL added"
gh secret set SUPABASE_ANON_KEY --body="$SUPABASE_ANON_KEY" && echo "✅ SUPABASE_ANON_KEY added"
gh secret set OPENAI_API_KEY --body="$OPENAI_API_KEY" && echo "✅ OPENAI_API_KEY added"
gh secret set ANTHROPIC_API_KEY --body="$ANTHROPIC_API_KEY" && echo "✅ ANTHROPIC_API_KEY added"
gh secret set GROK_API_KEY --body="$GROK_API_KEY" && echo "✅ GROK_API_KEY added"

echo ""
echo "🎉 All secrets have been added!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com/$REPO/actions"
echo "2. Find 'Scrape Events' workflow"
echo "3. Click 'Run workflow' to test"
echo ""
echo "🔒 Security note: These secrets are encrypted and only accessible to workflows."