
import { Event } from '@/types';




export const eventsData: Event[] = [
  {
    id: '2',
    name: 'Tribute Live Performance | Green Day',
    date: '2025-04-26T23:00:00',
    time: '23:00 Hs',
    address: 'Black Mango',
    description: 'Tributo Green Day 🤯',
    price: 'Gs. 25.000',
    image: 'https://asukeai.notion.site/image/attachment%3A445860e2-8a91-422a-847e-fb9f6a8fbcd5%3ACaptura_de_pantalla_2025-03-31_081537.png.png?id=1c799d04-e186-801d-af7e-e78e1af26371&table=block&spaceId=14d65858-96a7-4b89-84f5-3f5dcb1d9a22&width=2000&userId=&cache=v2',
    tag: 'Musica'
  },
  {
    id: '3',
    name: 'Kurusu Rape',
    date: '2025-04-11T23:00:00',
    time: '20:00 Hs',
    address: 'Teatro Municiapl Ignacio A. Pane',
    description: 'El viernes 11 de abril a las 20:00 podrás ser testigo de cómo nuestras más profundas tradiciones cobran nueva vida gracias a la creatividad grandes artistas nacionales.',
    price: '0',
    image: 'https://asukeai.notion.site/image/attachment%3A8d84ff39-7581-47c4-8355-c08165004587%3ACaptura_de_pantalla_2025-03-31_081420.png.png?table=block&id=1c799d04-e186-8002-bbfb-fbaedc86cf5f&spaceId=14d65858-96a7-4b89-84f5-3f5dcb1d9a22&width=2000&userId=&cache=v2',
    tag: 'Charlas'
  },
  {
    id: '7',
    name: 'Tarde de Abril',
    date: '2025-04-12T23:00:00',
    time: '17:00 Hs',
    address: 'Teatro de las Américas del Centro Cultural Paraguayo Americano',
    description: '',
    price: 'Gs. 100.000',
    image: 'https://i.ibb.co/1tF9jnqT/Whats-App-Image-2025-03-11-at-15-14-08-jpeg.jpg',
    tag: 'Charlas'
  },
  {
    id: '8',
    name: 'Acústico en vivo',
    date: '2025-04-12T23:00:00',
    time: '17:00 Hs',
    address: 'Literaity',
    description: 'Este sábado 12 de abril a las 20:00 hs., te esperamos para un Show Acústico en vivo muy especial con las talentosas Claudia Miranda (@claudiamirandaamarillito), artista popular y cantautora, y Elica Báez (@elicabaez), increíble arpista e intérprete.',
    price: 'Gs. 20.000',
    image: 'https://i.ibb.co/JWm5ZzwF/Captura-de-pantalla-2025-04-02-121333-png.webp',
    tag: 'Musica'
  },
  {
    id: '9',
    name: 'Taller de Escritura Creativa',
    date: '2025-04-12T23:00:00',
    time: '16:30 Hs',
    address: 'La Cafebrería',
    description: 'Analizaremos las estructuras de los realtos de grandes autores clásicos y contemporáneos para crear uno propio',
    price: 'Gs. 80.000',
    image: 'https://i.ibb.co/5xxVsBrr/Whats-App-Image-2025-04-02-at-19-59-02.webp',
    tag: 'Capacitacion'
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
