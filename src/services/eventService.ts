
import { Event } from '@/types';
import { isPastEvent } from '@/utils/dateUtils';

// Mock data for events
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Summer Music Festival',
    date: '2023-08-15T18:00:00',
    address: 'Central Park, New York',
    description: 'Join us for a day of amazing live music performances featuring top artists from around the world. Food and drinks will be available for purchase. This all-day event is suitable for all ages and will feature multiple stages with different genres of music including rock, pop, hip-hop, and electronic dance.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop',
    tag: 'Music'
  },
  {
    id: '2',
    name: 'Food & Wine Festival',
    date: '2023-09-10T12:00:00',
    address: 'Riverside Convention Center, Chicago',
    description: 'Experience a culinary adventure with the finest food and wine pairings from top chefs and wineries. The festival will feature cooking demonstrations, wine tastings, and gourmet food samples from local and international vendors.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    tag: 'Food'
  },
  {
    id: '3',
    name: 'Art Exhibition Opening',
    date: '2023-08-05T19:00:00',
    address: 'Modern Art Museum, Los Angeles',
    description: 'Be the first to see this groundbreaking exhibition featuring contemporary art from emerging artists. This exclusive opening night event includes a guided tour by the curator, a chance to meet the artists, and complimentary refreshments.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop',
    tag: 'Art'
  },
  {
    id: '4',
    name: 'Tech Conference 2023',
    date: '2023-10-20T09:00:00',
    address: 'Tech Hub, San Francisco',
    description: 'The most anticipated tech event of the year featuring keynote speakers from leading technology companies, hands-on workshops, and networking opportunities. Learn about the latest innovations in AI, blockchain, and cloud computing.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    tag: 'Workshop'
  },
  {
    id: '5',
    name: 'Yoga Retreat Weekend',
    date: '2023-09-15T08:00:00',
    address: 'Serenity Resort, Malibu',
    description: 'Escape the city for a weekend of relaxation, meditation, and yoga led by experienced instructors. The all-inclusive package includes accommodation, healthy meals, and access to all classes and activities.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop',
    tag: 'Workshop'
  },
  {
    id: '6',
    name: 'New Year\'s Eve Party',
    date: '2023-12-31T20:00:00',
    address: 'Grand Ballroom, Miami Beach',
    description: 'Ring in the new year with an unforgettable celebration featuring live music, dancing, gourmet dinner, and a champagne toast at midnight. Formal attire required.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1567016520496-0cb4edbb9dc5?q=80&w=2070&auto=format&fit=crop',
    tag: 'Party'
  },
  {
    id: '7',
    name: 'Film Festival',
    date: '2023-11-05T10:00:00',
    address: 'Cinema Center, Austin',
    description: 'A week-long celebration of independent filmmaking featuring screenings, panel discussions, and workshops with renowned directors and actors. This year\'s festival focuses on international documentaries and short films.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop',
    tag: 'Art'
  },
  {
    id: '8',
    name: 'Craft Beer Festival',
    date: '2023-08-28T14:00:00',
    address: 'Waterfront Park, Portland',
    description: 'Sample over 100 different craft beers from local and regional breweries. The event includes live music, food trucks, and brewing demonstrations. All attendees must be 21+ with valid ID.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=2074&auto=format&fit=crop',
    tag: 'Food'
  },
  {
    id: '9',
    name: 'Charity Run',
    date: '2023-09-03T08:00:00',
    address: 'Downtown, Boston',
    description: 'Participate in this 5k run/walk to raise funds for local children\'s hospitals. All fitness levels welcome. Registration includes a t-shirt and post-race refreshments.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop',
    tag: 'Other'
  },
  {
    id: '10',
    name: 'Jazz in the Park',
    date: '2023-08-12T17:00:00',
    address: 'Memorial Park, New Orleans',
    description: 'Bring a blanket and enjoy an evening of smooth jazz performed by top musicians under the stars. Food and beverages will be available for purchase.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop',
    tag: 'Music'
  }
];

// Function to get all future events
export const getFutureEvents = (): Event[] => {
  return mockEvents.filter(event => !isPastEvent(event.date));
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
