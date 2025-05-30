import openai
from anthropic import Anthropic
import requests
from typing import Dict, List, Optional
from config import OPENAI_API_KEY, ANTHROPIC_API_KEY, GROK_API_KEY

class LLMProcessor:
    def __init__(self, provider: str = "openai"):
        self.provider = provider.lower()
        
        if self.provider == "openai":
            openai.api_key = OPENAI_API_KEY
        elif self.provider == "claude":
            self.client = Anthropic(api_key=ANTHROPIC_API_KEY)
        elif self.provider == "grok":
            self.grok_api_key = GROK_API_KEY
    
    def extract_events(self, html_content: str, existing_events: List[Dict] = None) -> List[Dict]:
        """Extract structured event data from HTML using LLM."""
        
        prompt = f"""
        Extract event information from this HTML and return as JSON array.
        
        For each event, extract:
        - name (event title)
        - date (in YYYY-MM-DD format)
        - time (in HH:MM format)
        - address (full address)
        - description (event description)
        - price (numeric value or "Gratis" if free)
        - image (image URL)
        - tag (category: Música, Teatro, Arte, Deportes, Capacitación, Cine, Ferias)
        
        HTML:
        {html_content[:3000]}  # Limit to avoid token limits
        
        Return only valid JSON array, no explanations.
        """
        
        if self.provider == "openai":
            return self._extract_with_openai(prompt)
        elif self.provider == "claude":
            return self._extract_with_claude(prompt)
        elif self.provider == "grok":
            return self._extract_with_grok(prompt)
    
    def _extract_with_openai(self, prompt: str) -> List[Dict]:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert at extracting structured data from HTML."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1
            )
            
            import json
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"OpenAI extraction error: {e}")
            return []
    
    def _extract_with_claude(self, prompt: str) -> List[Dict]:
        try:
            message = self.client.messages.create(
                model="claude-3-haiku-20240307",
                max_tokens=1000,
                temperature=0.1,
                messages=[{"role": "user", "content": prompt}]
            )
            
            import json
            return json.loads(message.content[0].text)
        except Exception as e:
            print(f"Claude extraction error: {e}")
            return []
    
    def _extract_with_grok(self, prompt: str) -> List[Dict]:
        try:
            headers = {
                "Authorization": f"Bearer {self.grok_api_key}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": "grok-beta",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.1
            }
            
            response = requests.post(
                "https://api.x.ai/v1/chat/completions",
                headers=headers,
                json=data
            )
            
            import json
            return json.loads(response.json()['choices'][0]['message']['content'])
        except Exception as e:
            print(f"Grok extraction error: {e}")
            return []
    
    def check_duplicate(self, event: Dict, existing_events: List[Dict]) -> bool:
        """Check if event is duplicate using fuzzy matching."""
        
        prompt = f"""
        Is this event a duplicate of any existing events?
        
        New event: {event['name']} on {event['date']} at {event['address']}
        
        Existing events:
        {[f"{e['name']} on {e['date']} at {e['address']}" for e in existing_events[:10]]}
        
        Return only "true" or "false".
        """
        
        # Quick implementation - you can enhance this
        for existing in existing_events:
            if (event['name'].lower() == existing['name'].lower() and 
                event['date'] == existing['date']):
                return True
        return False