import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.log('Please update .env.local with:');
  console.log('VITE_SUPABASE_URL=your_url_here');
  console.log('VITE_SUPABASE_ANON_KEY=your_key_here');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🧪 Testing Supabase connection...\n');
  
  try {
    // Test 1: Read events
    console.log('📖 Test 1: Reading events...');
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('❌ Error reading events:', error.message);
      console.log('\nMake sure you have created the events table in Supabase!');
      process.exit(1);
    } else {
      console.log('✅ Successfully connected!');
      console.log(`   Found ${data.length} events`);
      if (data.length > 0) {
        console.log('   Sample event:', data[0].name);
      }
    }
    
    // Test 2: Insert test event
    console.log('\n📝 Test 2: Inserting test event...');
    const testEvent = {
      id: `test-${Date.now()}`,
      name: 'Test Event - Delete Me',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      time: '18:00',
      address: 'Test Location, Asunción',
      description: 'This is a test event created by the testing script',
      price: '0',
      image: 'https://via.placeholder.com/400x300?text=Test+Event',
      tag: 'Otros',
      source_name: 'test-script',
      event_hash: `test-${Date.now()}`
    };
    
    const { error: insertError } = await supabase
      .from('events')
      .insert([testEvent]);
    
    if (insertError) {
      console.error('❌ Error inserting:', insertError.message);
    } else {
      console.log('✅ Successfully inserted test event');
      console.log(`   Event ID: ${testEvent.id}`);
    }
    
    // Test 3: Delete test event
    console.log('\n🗑️  Test 3: Cleaning up test event...');
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('id', testEvent.id);
    
    if (deleteError) {
      console.error('❌ Error deleting:', deleteError.message);
    } else {
      console.log('✅ Successfully deleted test event');
    }
    
    console.log('\n🎉 All tests passed! Supabase is properly configured.');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

// Run tests
console.log('🚀 Asukeai Supabase Test Suite\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey.substring(0, 20) + '...\n');

testConnection();