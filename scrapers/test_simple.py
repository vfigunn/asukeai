#!/usr/bin/env python3
import os
from dotenv import load_dotenv
load_dotenv()

# Simple test without proxy
url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_ANON_KEY')

print(f"URL: {url}")
print(f"Key: {key[:20]}...")

try:
    # Try direct import
    from supabase import create_client
    
    # Create client with minimal parameters
    client = create_client(url, key)
    print("✅ Client created successfully!")
    
    # Try a simple query
    result = client.table('events').select('*').limit(1).execute()
    print(f"✅ Query successful! Found {len(result.data)} events")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()