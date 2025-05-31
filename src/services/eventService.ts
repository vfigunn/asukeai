
import { Event } from '@/types';
import { eventsData } from '@/data/eventsData';
import { supabase } from '@/lib/supabase';

// Function to get all events (including past events)
export const getAllEvents = async (includePast: boolean = false): Promise<Event[]> => {
  try {
    let query = supabase.from('events').select('*');
    
    if (!includePast) {
      // Get today's date in YYYY-MM-DD format
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split('T')[0];
      query = query.gte('date', todayStr);
    }
    
    const { data, error } = await query
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    // Fallback to static data with filtering
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let events = [...eventsData];
    if (!includePast) {
      events = events.filter(event => new Date(event.date) >= today);
    }
    
    return events.sort((a, b) => {
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare === 0) {
        return a.time.localeCompare(b.time);
      }
      return dateCompare;
    });
  }
};

// Function to get events by tag
export const getEventsByTag = async (tag: string): Promise<Event[]> => {
  if (!tag) return getAllEvents();
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('tag', tag)
      .gte('date', todayStr) // Only get events from today onwards
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events by tag:', error);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return eventsData
      .filter(event => event.tag === tag && new Date(event.date) >= today)
      .sort((a, b) => {
        const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateCompare === 0) {
          return a.time.localeCompare(b.time);
        }
        return dateCompare;
      });
  }
};

// Function to get events by id
export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching event by id:', error);
    const event = eventsData.find(event => event.id === id);
    return event || null;
  }
};

// Function to get events by filters
export const getFilteredEvents = async (
  searchTerm: string = '',
  date: Date | undefined = undefined,
  tag: string = ''
): Promise<Event[]> => {
  try {
    let query = supabase.from('events').select('*');
    
    // Always filter out past events unless a specific date is selected
    if (!date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().split('T')[0];
      query = query.gte('date', todayStr);
    }
    
    // Filter by tag
    if (tag) {
      query = query.eq('tag', tag);
    }
    
    // Filter by search term
    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }
    
    // Filter by specific date
    if (date) {
      const dateStr = date.toISOString().split('T')[0];
      query = query.eq('date', dateStr);
    }
    
    const { data, error } = await query
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching filtered events:', error);
    // Fallback to local filtering
    let filteredEvents = [...eventsData];
    
    // Filter out past events unless a specific date is selected
    if (!date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filteredEvents = filteredEvents.filter(event => new Date(event.date) >= today);
    }
    
    if (tag) {
      filteredEvents = filteredEvents.filter(event => event.tag === tag);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredEvents = filteredEvents.filter(
        event => 
          event.name.toLowerCase().includes(searchLower) || 
          event.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      filteredEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= startOfDay && eventDate <= endOfDay;
      });
    }
    
    return filteredEvents.sort((a, b) => {
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare === 0) {
        return a.time.localeCompare(b.time);
      }
      return dateCompare;
    });
  }
};

// Function to get unique event tags
export const getUniqueEventTags = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('tag')
      .order('tag');
    
    if (error) throw error;
    const tags = data?.map(item => item.tag) || [];
    return [...new Set(tags)];
  } catch (error) {
    console.error('Error fetching tags:', error);
    const tags = eventsData.map(event => event.tag);
    return [...new Set(tags)];
  }
};
