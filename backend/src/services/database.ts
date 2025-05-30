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

  // Get events for chat context (latest 50)
  static async getEventsForChat(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('name, date, time, address, description, price, tag')
      .order('date', { ascending: true })
      .limit(50);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data || [];
  }
}