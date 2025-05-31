#!/usr/bin/env python3
"""
Test script for Asukeai scrapers
"""

import os
import sys
from datetime import datetime
import json

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from dotenv import load_dotenv
    load_dotenv()
    
    from supabase import create_client
    import requests
    from bs4 import BeautifulSoup
except ImportError as e:
    print(f"❌ Missing dependency: {e}")
    print("Please run: pip install -r requirements.txt")
    sys.exit(1)

# Check environment variables
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Missing environment variables!")
    print("Please create a .env file with:")
    print("SUPABASE_URL=your_url_here")
    print("SUPABASE_ANON_KEY=your_key_here")
    sys.exit(1)

def test_supabase_connection():
    """Test Supabase connection"""
    print("🧪 Testing Supabase connection...")
    
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Try to read events
        result = supabase.table('events').select('*').limit(1).execute()
        print("✅ Supabase connection successful!")
        return supabase
    except Exception as e:
        print(f"❌ Supabase connection failed: {e}")
        return None

def test_ticketea_fetch():
    """Test fetching from Ticketea"""
    print("\n🧪 Testing Ticketea website fetch...")
    
    try:
        response = requests.get('https://ticketea.com.py', timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            events = soup.find_all('a', href=lambda x: x and '/events/' in x)
            print(f"✅ Ticketea fetch successful! Found {len(events)} event links")
            return True
        else:
            print(f"❌ Ticketea returned status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Ticketea fetch failed: {e}")
        return False

def test_minimal_scrape(supabase):
    """Test scraping one event"""
    print("\n🧪 Testing minimal event scrape...")
    
    try:
        # Get one event link
        response = requests.get('https://ticketea.com.py')
        soup = BeautifulSoup(response.content, 'html.parser')
        event_link = soup.find('a', href=lambda x: x and '/events/' in x)
        
        if not event_link:
            print("❌ No event links found")
            return
        
        # Fix URL - check if href already has domain
        href = event_link['href']
        if href.startswith('http'):
            event_url = href
        else:
            event_url = f"https://ticketea.com.py{href}"
        print(f"📍 Testing with: {event_url}")
        
        # Fetch event page
        event_response = requests.get(event_url)
        event_soup = BeautifulSoup(event_response.content, 'html.parser')
        
        # Extract basic info
        title = event_soup.find('h1') or event_soup.find('meta', property='og:title')
        if title:
            title_text = title.text.strip() if hasattr(title, 'text') else title.get('content', 'Unknown')
            print(f"✅ Found event: {title_text}")
            
            # Create test event
            test_event = {
                'id': f'test-scraper-{datetime.now().timestamp()}',
                'name': title_text[:100],  # Limit length
                'date': datetime.now().strftime('%Y-%m-%d'),
                'time': '00:00',
                'address': 'Test Address',
                'description': 'Test scrape',
                'price': '0',
                'image': '',
                'tag': 'Otros',
                'source_name': 'test-scraper',
                'event_hash': f'test-{datetime.now().timestamp()}'
            }
            
            # Try to insert
            result = supabase.table('events').insert(test_event).execute()
            print("✅ Successfully inserted test event to Supabase")
            
            # Clean up
            supabase.table('events').delete().eq('id', test_event['id']).execute()
            print("✅ Cleaned up test event")
            
        else:
            print("❌ Could not extract event title")
            
    except Exception as e:
        print(f"❌ Scrape test failed: {e}")

def main():
    """Run all tests"""
    print("🚀 Asukeai Scraper Test Suite\n")
    print(f"Supabase URL: {SUPABASE_URL}")
    print(f"Key: {SUPABASE_KEY[:20]}...\n")
    
    # Test 1: Supabase connection
    supabase = test_supabase_connection()
    if not supabase:
        print("\n⚠️  Cannot continue without Supabase connection")
        return
    
    # Test 2: Website fetch
    ticketea_ok = test_ticketea_fetch()
    
    # Test 3: Minimal scrape
    if ticketea_ok and supabase:
        test_minimal_scrape(supabase)
    
    print("\n✨ Testing complete!")
    
    # Summary
    print("\n📋 Summary:")
    print("- Supabase: " + ("✅ Connected" if supabase else "❌ Failed"))
    print("- Ticketea: " + ("✅ Accessible" if ticketea_ok else "❌ Failed"))
    
    # Next steps
    print("\n📝 Next steps:")
    print("1. If all tests pass, run the full scraper:")
    print("   python sources/ticketea_scraper.py")
    print("2. Check Supabase dashboard for scraped events")
    print("3. Test the frontend at http://localhost:5173")

if __name__ == "__main__":
    main()