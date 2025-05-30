import requests
from bs4 import BeautifulSoup
import hashlib
import json
from datetime import datetime
from typing import List, Dict, Optional
from abc import ABC, abstractmethod
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_ANON_KEY

class BaseScraper(ABC):
    def __init__(self, source_name: str):
        self.source_name = source_name
        self.supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    @abstractmethod
    def fetch_event_links(self) -> List[str]:
        """Fetch all event links from the source."""
        pass
    
    @abstractmethod
    def parse_event(self, event_url: str) -> Optional[Dict]:
        """Parse individual event details."""
        pass
    
    def generate_event_hash(self, event: Dict) -> str:
        """Generate unique hash for duplicate detection."""
        unique_string = f"{event['name']}_{event['date']}_{event.get('address', '')}"
        return hashlib.md5(unique_string.encode()).hexdigest()
    
    def save_raw_data(self, content: str):
        """Save raw HTML to database for debugging."""
        try:
            self.supabase.table('scraped_raw_data').insert({
                'source_name': self.source_name,
                'raw_content': content[:50000],  # Limit size
                'processed': False
            }).execute()
        except Exception as e:
            print(f"Error saving raw data: {e}")
    
    def check_duplicate(self, event_hash: str) -> bool:
        """Check if event already exists."""
        try:
            result = self.supabase.table('events').select('id').eq('event_hash', event_hash).execute()
            return len(result.data) > 0
        except:
            return False
    
    def save_event(self, event: Dict) -> bool:
        """Save event to Supabase."""
        try:
            event['event_hash'] = self.generate_event_hash(event)
            event['source_name'] = self.source_name
            event['source_url'] = event.get('url', '')
            
            # Check for duplicate
            if self.check_duplicate(event['event_hash']):
                print(f"Duplicate event skipped: {event['name']}")
                return False
            
            # Insert event
            result = self.supabase.table('events').insert(event).execute()
            print(f"Saved event: {event['name']}")
            return True
        except Exception as e:
            print(f"Error saving event {event.get('name', 'Unknown')}: {e}")
            return False
    
    def run(self) -> Dict:
        """Main scraping process."""
        start_time = datetime.now()
        
        # Create scraper run record
        run_result = self.supabase.table('scraper_runs').insert({
            'source_name': self.source_name,
            'status': 'running'
        }).execute()
        run_id = run_result.data[0]['id']
        
        events_found = 0
        events_saved = 0
        
        try:
            # Fetch event links
            event_links = self.fetch_event_links()
            events_found = len(event_links)
            print(f"Found {events_found} events from {self.source_name}")
            
            # Parse each event
            for url in event_links:
                event = self.parse_event(url)
                if event and self.save_event(event):
                    events_saved += 1
                    
            # Update run status
            self.supabase.table('scraper_runs').update({
                'completed_at': datetime.now().isoformat(),
                'events_found': events_found,
                'status': 'completed'
            }).eq('id', run_id).execute()
            
        except Exception as e:
            print(f"Error in scraper run: {e}")
            self.supabase.table('scraper_runs').update({
                'completed_at': datetime.now().isoformat(),
                'status': 'failed'
            }).eq('id', run_id).execute()
        
        return {
            'source': self.source_name,
            'events_found': events_found,
            'events_saved': events_saved,
            'duration': (datetime.now() - start_time).seconds
        }