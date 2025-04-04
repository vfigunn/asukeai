import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/types';

// Function to get all events
export const getAllEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
};

// Function to get events by tag
export const getEventsByTag = async (tag: string): Promise<Event[]> => {
  if (!tag) return getAllEvents();
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('tag', tag)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events by tag:', error);
    return [];
  }

  return data || [];
};

// Function to get events by id
export const getEventById = async (id: string): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event by id:', error);
    return null;
  }

  return data;
};

// Function to get events by filters
export const getFilteredEvents = async (
  searchTerm: string = '',
  date: Date | undefined = undefined,
  tag: string = ''
): Promise<Event[]> => {
  let query = supabase.from('events').select('*');
  
  // Filter by tag
  if (tag) {
    query = query.eq('tag', tag);
  }
  
  // Filter by search term
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    query = query.or(`name.ilike.%${searchLower}%,description.ilike.%${searchLower}%`);
  }
  
  // Filter by date
  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    query = query.gte('date', startOfDay.toISOString()).lte('date', endOfDay.toISOString());
  }
  
  const { data, error } = await query.order('date', { ascending: true });

  if (error) {
    console.error('Error fetching filtered events:', error);
    return [];
  }
  
  return data || [];
};

// Function to get unique event tags
export const getUniqueEventTags = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('tag');

  if (error) {
    console.error('Error fetching event tags:', error);
    return [];
  }

  // Extract unique tags
  const tags = data.map(event => event.tag);
  return [...new Set(tags)];
};

// Function to create an event - kept the same as it requires all fields
export const createEvent = async (event: {
  name: string;
  date: string;
  address: string;
  description: string;
  price: number;
  image: string;
  tag: string;
}): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    throw new Error(error.message);
  }

  return data;
};

// Updated function to accept partial event data for updates
export const updateEvent = async (
  id: string, 
  event: Partial<{
    name: string;
    date: string;
    address: string;
    description: string;
    price: number;
    image: string;
    tag: string;
  }>
): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    throw new Error(error.message);
  }

  return data;
};

// Function to delete an event
export const deleteEvent = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    return false;
  }

  return true;
};
