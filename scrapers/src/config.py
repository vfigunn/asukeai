import os
from dotenv import load_dotenv

load_dotenv()

# API Keys
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
GROK_API_KEY = os.getenv('GROK_API_KEY')

# Supabase
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_ANON_KEY = os.getenv('SUPABASE_ANON_KEY')

# Scraper settings
SCRAPERS = {
    'ticketea': {
        'base_url': 'https://ticketea.com.py',
        'enabled': True
    },
    'tuti': {
        'base_url': 'https://tuti.com.py',
        'enabled': True
    }
}

# Categories mapping
CATEGORY_KEYWORDS = {
    'Música': ['música', 'concierto', 'festival', 'show', 'banda', 'dj'],
    'Teatro': ['teatro', 'obra', 'drama', 'comedia'],
    'Arte': ['arte', 'exposición', 'galería', 'muestra'],
    'Deportes': ['deporte', 'partido', 'torneo', 'carrera'],
    'Capacitación': ['capacitación', 'taller', 'curso', 'workshop'],
    'Cine': ['cine', 'película', 'film', 'proyección'],
    'Ferias': ['feria', 'festival', 'fiesta']
}