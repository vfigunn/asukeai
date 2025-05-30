import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from base_scraper import BaseScraper
from bs4 import BeautifulSoup
import re
from typing import List, Dict, Optional
from datetime import datetime
import time

class TicketeaScraper(BaseScraper):
    def __init__(self):
        super().__init__('ticketea')
        self.base_url = 'https://ticketea.com.py'
    
    def fetch_event_links(self) -> List[str]:
        """Fetch all event links from Ticketea homepage."""
        try:
            response = self.session.get(self.base_url)
            if response.status_code != 200:
                print(f"Failed to fetch main page: {response.status_code}")
                return []
            
            soup = BeautifulSoup(response.content, 'html.parser')
            event_links = []
            
            for link in soup.find_all('a', href=True):
                href = link['href']
                if href.startswith("/events/"):
                    full_url = f"{self.base_url}{href}"
                    event_links.append(full_url)
            
            return list(set(event_links))  # Remove duplicates
            
        except Exception as e:
            print(f"Error fetching event links: {e}")
            return []
    
    def extract_coordinates(self, soup) -> Dict:
        """Extract coordinates from iframe or schema."""
        try:
            iframe = soup.find('iframe', src=lambda x: x and 'google.com/maps/embed' in x)
            if iframe and iframe.get('src'):
                src = iframe['src']
                if 'q=' in src:
                    coords = src.split('q=')[-1].split('&')[0]
                    lat, lng = map(float, coords.split(','))
                    return {'latitude': lat, 'longitude': lng}
        except:
            pass
        
        return {'latitude': -25.2867, 'longitude': -57.3333}  # Default Asunción
    
    def parse_spanish_date(self, date_str: str) -> str:
        """Convert Spanish date to ISO format."""
        spanish_months = {
            'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
            'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
            'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
        }
        
        try:
            # Remove day name
            date_str = re.sub(r'^(lunes|martes|miércoles|jueves|viernes|sábado|domingo)\s*,?\s*', '', date_str.lower())
            
            # Extract components
            match = re.search(r'(\d{1,2})\s+(?:de\s+)?(\w+)(?:\s+(?:de\s+)?(\d{4}))?\s*,?\s*(\d{1,2}):(\d{2})', date_str)
            if match:
                day = int(match.group(1))
                month_name = match.group(2)
                year = int(match.group(3)) if match.group(3) else datetime.now().year
                hour = int(match.group(4))
                minute = int(match.group(5))
                
                month = spanish_months.get(month_name, datetime.now().month)
                
                event_date = datetime(year, month, day, hour, minute)
                
                # If date has passed, use next year
                if event_date < datetime.now():
                    event_date = datetime(year + 1, month, day, hour, minute)
                
                return event_date.strftime('%Y-%m-%d')
            
        except Exception as e:
            print(f"Error parsing date {date_str}: {e}")
        
        return datetime.now().strftime('%Y-%m-%d')
    
    def determine_category(self, title: str, description: str) -> str:
        """Determine event category based on keywords."""
        text = f"{title} {description}".lower()
        
        category_keywords = {
            'Música': ['música', 'concierto', 'concert', 'show', 'festival', 'banda', 'dj'],
            'Teatro': ['teatro', 'obra', 'drama', 'comedia', 'musical'],
            'Deportes': ['deporte', 'partido', 'torneo', 'carrera', 'marathon'],
            'Arte': ['arte', 'exposición', 'galería', 'muestra'],
            'Capacitación': ['capacitación', 'taller', 'curso', 'workshop', 'seminario'],
            'Cine': ['cine', 'película', 'film', 'proyección'],
            'Ferias': ['feria', 'festival', 'fiesta']
        }
        
        for category, keywords in category_keywords.items():
            if any(keyword in text for keyword in keywords):
                return category
        
        return 'Otros'
    
    def parse_event(self, event_url: str) -> Optional[Dict]:
        """Parse individual event page."""
        try:
            response = self.session.get(event_url)
            if response.status_code != 200:
                return None
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Save raw data for debugging
            self.save_raw_data(response.text[:10000])
            
            # Extract title
            title_elem = soup.find('h1') or soup.find('meta', property='og:title')
            title = title_elem.text.strip() if hasattr(title_elem, 'text') else title_elem.get('content', '')
            title = title.replace('Entradas para', '').replace('- Ticketea.com.py', '').strip()
            
            # Extract image
            img_elem = soup.find('meta', property='og:image')
            image_url = img_elem.get('content', '') if img_elem else ''
            
            # Extract date/time
            date_elem = soup.find('p', class_='size-md m-b-0 line-height-20')
            date_str = date_elem.text.strip() if date_elem else ''
            date = self.parse_spanish_date(date_str)
            
            # Extract time from date string
            time_match = re.search(r'(\d{1,2}):(\d{2})', date_str)
            time = f"{time_match.group(1)}:{time_match.group(2)}" if time_match else "00:00"
            
            # Extract location and address
            location_elems = soup.find_all('p', class_='size-md m-b-0 line-height-20')
            location = location_elems[1].text.strip() if len(location_elems) > 1 else "Asunción"
            address = location_elems[2].text.strip() if len(location_elems) > 2 else ""
            
            # Extract description
            desc_elem = soup.find('div', class_='event__detalle') or soup.find('meta', property='og:description')
            description = desc_elem.text.strip() if hasattr(desc_elem, 'text') else desc_elem.get('content', '') if desc_elem else ''
            
            # Extract price
            price_elem = soup.find('span', text=re.compile(r'Gs\.\s*[\d\.]+'))
            if price_elem:
                price = re.sub(r'[^\d]', '', price_elem.text)
            else:
                price = "0"
            
            # Determine category
            tag = self.determine_category(title, description)
            
            # Extract coordinates
            coordinates = self.extract_coordinates(soup)
            
            event = {
                'id': event_url.split('/')[-1],
                'name': title,
                'date': date,
                'time': time,
                'address': address,
                'description': description[:1000],  # Limit description length
                'price': price,
                'image': image_url,
                'tag': tag,
                'url': event_url,
                'coordinates': coordinates
            }
            
            time.sleep(2)  # Be nice to the server
            return event
            
        except Exception as e:
            print(f"Error parsing event {event_url}: {e}")
            return None

if __name__ == "__main__":
    scraper = TicketeaScraper()
    results = scraper.run()
    print(f"\nScraping completed: {results}")