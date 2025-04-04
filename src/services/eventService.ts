
import { Event } from '@/types';
import { eventsData } from '@/data/eventsData';

// Function to get all events
export const getAllEvents = async (): Promise<Event[]> => {
  return [...eventsData];
};

// Function to get events by tag
export const getEventsByTag = async (tag: string): Promise<Event[]> => {
  if (!tag) return getAllEvents();
  return eventsData.filter(event => event.tag === tag);
};

// Function to get events by id
export const getEventById = async (id: string): Promise<Event | null> => {
  const event = eventsData.find(event => event.id === id);
  return event || null;
};

// Function to get events by filters
export const getFilteredEvents = async (
  searchTerm: string = '',
  date: Date | undefined = undefined,
  tag: string = ''
): Promise<Event[]> => {
  let filteredEvents = [...eventsData];
  
  // Filter by tag
  if (tag) {
    filteredEvents = filteredEvents.filter(event => event.tag === tag);
  }
  
  // Filter by search term
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredEvents = filteredEvents.filter(
      event => 
        event.name.toLowerCase().includes(searchLower) || 
        event.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter by date
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
  
  // Sort by date
  return filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Function to get unique event tags
export const getUniqueEventTags = async (): Promise<string[]> => {
  const tags = eventsData.map(event => event.tag);
  return [...new Set(tags)];
};
