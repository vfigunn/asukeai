#!/bin/bash

echo "🧪 Quick Scraper Test"
echo "===================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed!"
    exit 1
fi

cd scrapers

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -q -r requirements.txt

# Run the test
echo ""
echo "🚀 Running scraper test..."
echo "=========================="
python src/test_scraper.py

echo ""
echo "✅ Test complete! Check your Supabase dashboard for scraped events."
echo ""
echo "To run full scraper:"
echo "  cd scrapers/src/sources"
echo "  python ticketea_scraper.py"