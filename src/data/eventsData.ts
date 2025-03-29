
import { Event } from '@/types';

export const eventsData: Event[] = [
  {
    id: '1',
    name: 'Summer Music Festival',
    date: '2024-08-15T18:00:00',
    address: 'Central Park, New York',
    description: 'Join us for a day of amazing live music performances featuring top artists from around the world. Food and drinks will be available for purchase.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop',
    tag: 'Music'
  },
  {
    id: '2',
    name: 'Food & Wine Festival',
    date: '2024-09-10T12:00:00',
    address: 'Riverside Convention Center, Chicago',
    description: 'Experience a culinary adventure with the finest food and wine pairings from top chefs and wineries.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    tag: 'Food'
  },
  {
    id: '3',
    name: 'Art Exhibition Opening',
    date: '2024-08-05T19:00:00',
    address: 'Modern Art Museum, Los Angeles',
    description: 'Be the first to see this groundbreaking exhibition featuring contemporary art from emerging artists.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop',
    tag: 'Art'
  },
  {
    id: '4',
    name: 'Tech Conference 2024',
    date: '2024-10-20T09:00:00',
    address: 'Tech Hub, San Francisco',
    description: 'The most anticipated tech event of the year featuring keynote speakers from leading technology companies.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    tag: 'Workshop'
  },
  {
    id: '5',
    name: 'Yoga Retreat Weekend',
    date: '2024-09-15T08:00:00',
    address: 'Serenity Resort, Malibu',
    description: 'Escape the city for a weekend of relaxation, meditation, and yoga led by experienced instructors.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop',
    tag: 'Workshop'
  },
  {
    id: '6',
    name: 'New Year\'s Eve Party',
    date: '2024-12-31T20:00:00',
    address: 'Grand Ballroom, Miami Beach',
    description: 'Ring in the new year with an unforgettable celebration featuring live music, dancing, and gourmet dinner.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1567016520496-0cb4edbb9dc5?q=80&w=2070&auto=format&fit=crop',
    tag: 'Party'
  }
];

// Export a function to get all events
export const getAllEvents = (): Event[] => {
  return eventsData;
};

// Function to get unique tags from events
export const getEventTags = (): string[] => {
  const tags = eventsData.map(event => event.tag);
  return [...new Set(tags)];
};

// Function to filter events by tag
export const getEventsByTag = (tag: string): Event[] => {
  if (!tag) return eventsData;
  return eventsData.filter(event => event.tag === tag);
};
