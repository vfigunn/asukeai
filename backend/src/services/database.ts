import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import type { Event, CreateEvent } from '../types/index.js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export class DatabaseService {
  // Test connection
  static async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('id')
        .limit(1);
      
      return !error;
    } catch {
      return false;
    }
  }

  // Get all events
  static async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  }

  // Get events by tag
  static async getEventsByTag(tag: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('tag', tag)
      .order('date', { ascending: true });

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  }

  // Create event
  static async createEvent(event: CreateEvent): Promise<Event> {
    const eventWithHash = {
      ...event,
      event_hash: `manual_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    };

    const { data, error } = await supabase
      .from('events')
      .insert([eventWithHash])
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data;
  }

  // Get events for chat context (future events only)
  static async getEventsForChat(): Promise<Event[]> {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    console.log(`[DatabaseService] Fetching events from date: ${todayStr}`);
    
    const { data, error } = await supabase
      .from('events')
      .select('id, name, date, time, address, description, price, tag')
      .gte('date', todayStr)  // Only get events from today onwards
      .order('date', { ascending: true })
      .limit(100);  // Increased limit to 100

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    console.log(`[DatabaseService] Fetched ${data?.length || 0} events`);
    if (data && data.length > 0) {
      console.log(`[DatabaseService] First event date: ${data[0]?.date}, Last event date: ${data[data.length - 1]?.date}`);
    }

    return data || [];
  }
}