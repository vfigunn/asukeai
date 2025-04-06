
import { Event } from '@/types';

export const eventsData: Event[] = [
  {
    id: '1',
    name: 'OSCA | Orquesta Sinfónica de la Ciudad de Asunción',
    date: '2025-04-10T23:00:00',
    time: '20:00 Hs.',
    address: 'Teatro Municipal Ignacio A. Pane',
    description: 'La OSCA bajo la batuta del director invitado Johannes Krohn y del solista Christoph Wagner / cello ✨',
    price: '0',
    image: 'https://i.ibb.co/pBdKPr4d/Captura-de-pantalla-2025-03-31-075236-png.webp',
    tag: 'Musica'
  },
  {
    id: '2',
    name: 'Tribute Live Performance | Green Day',
    date: '2025-04-26T23:00:00',
    time: '23:00 Hs',
    address: 'Black Mango',
    description: 'Tributo Green Day 🤯',
    price: 'Gs. 25.000',
    image: 'https://i.ibb.co/8L6TbHrw/Captura-de-pantalla-2025-03-31-081537-png.webp',
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
    image: 'https://i.ibb.co/Q7Y39TBH/Captura-de-pantalla-2025-03-31-081420-png.webp',
    tag: 'Charlas'
  },
  {
    id: '4',
    name: 'Yo, Zelda',
    date: '2025-04-06T23:00:00',
    time: '20:00 Hs',
    address: 'Sala la Correa',
    description: 'El grupo teatral Rara Avis, Escena, estrena “Yo, Zelda” de Luz Saldívar, directora y guionista de esta pieza, basada en la vida de la escritora y bailarina norteamericana, Zelda Sayre quien vivió en la década de los años 20. Fue esposa del escritor Scott Fitzgerald (El gran Gatsby), Zelda es reconocida por desafiar todos los cánones y códigos de su época para lograr su independencia como mujer y construir su propia historia como artista dentro de una sociedad que privilegiaba a las obras de arte de los hombres.',
    price: 'Gs. 50.000',
    image: 'https://i.ibb.co/5W9bsfdy/Captura-de-pantalla-2025-04-02-122000.webp',
    tag: 'Teatro'
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
