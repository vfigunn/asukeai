
import { Event } from '@/types';
import { isPastEvent } from '@/utils/dateUtils';
import { eventsData } from '@/data/eventsData';

// Function to get all future events
export const getFutureEvents = (): Event[] => {
  return eventsData.filter(event => !isPastEvent(event.date));
};

// Function to get events by filters
export const getFilteredEvents = (
  searchTerm: string = '',
  date: Date | undefined = undefined,
  tag: string = ''
): Event[] => {
  return getFutureEvents().filter(event => {
    // Filter by search term
    const matchesSearch = searchTerm
      ? event.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    // Filter by date
    const matchesDate = date
      ? new Date(event.date).toDateString() === date.toDateString()
      : true;
    
    // Filter by tag
    const matchesTag = tag
      ? event.tag === tag
      : true;
    
    return matchesSearch && matchesDate && matchesTag;
  });
};
