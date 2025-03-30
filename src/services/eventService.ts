
import { Event } from '@/types';
import { isPastEvent } from '@/utils/dateUtils';
import { eventsData } from '@/data/eventsData';

// Function to get all events (including past ones)
export const getAllEvents = (): Event[] => {
  return eventsData;
};

// Function to get all future events
export const getFutureEvents = (): Event[] => {
  // For debugging purposes, return all events for now
  return eventsData;
  // Uncomment when date filtering is needed
  // return eventsData.filter(event => !isPastEvent(event.date));
};

// Function to get events by tag
export const getEventsByTag = (tag: string): Event[] => {
  if (!tag) return getFutureEvents();
  return getFutureEvents().filter(event => event.tag === tag);
};

// Function to get events by filters
export const getFilteredEvents = (
  searchTerm: string = '',
  date: Date | undefined = undefined,
  tag: string = ''
): Event[] => {
  let filteredEvents = getFutureEvents();
  
  // Filter by tag
  if (tag) {
    filteredEvents = filteredEvents.filter(event => event.tag === tag);
  }
  
  // Filter by search term
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredEvents = filteredEvents.filter(event => 
      event.name.toLowerCase().includes(searchLower) || 
      event.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter by date
  if (date) {
    filteredEvents = filteredEvents.filter(event => 
      new Date(event.date).toDateString() === date.toDateString()
    );
  }
  
  return filteredEvents;
};
