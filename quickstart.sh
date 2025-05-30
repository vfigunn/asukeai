#!/bin/bash

echo "🚀 Asukeai Quick Start Script"
echo "=============================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    echo "Creating from template..."
    cat > .env.local << EOF
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
VITE_GROK_API_KEY=your_grok_api_key
EOF
    echo "✅ Created .env.local"
    echo "⚠️  Please edit .env.local with your actual values!"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "📋 Quick Start Menu:"
echo "==================="
echo "1. Start development server (npm run dev)"
echo "2. Test Supabase connection (npm run test:supabase)"
echo "3. Test scrapers (npm run test:scraper)"
echo "4. Run all tests (npm run test:all)"
echo "5. Open testing guide"
echo "6. Exit"
echo ""
read -p "Select option (1-6): " choice

case $choice in
    1)
        echo "Starting development server..."
        npm run dev
        ;;
    2)
        echo "Testing Supabase connection..."
        npm run test:supabase
        ;;
    3)
        echo "Testing scrapers..."
        npm run test:scraper
        ;;
    4)
        echo "Running all tests..."
        npm run test:all
        ;;
    5)
        echo "Opening testing guide..."
        if command -v code &> /dev/null; then
            code TESTING_GUIDE.md
        else
            cat TESTING_GUIDE.md | less
        fi
        ;;
    6)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac