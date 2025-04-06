
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
  },
  {
    id: '5',
    name: 'Cocina de Canciones',
    date: '2025-04-10T23:00:00',
    time: '19:00 Hs',
    address: 'Teatro de las Américas del Centro Cultural Paraguayo Americano',
    description: '🎶 Edu Schmidt (ex Árbol) te invita a participar del taller "Cocina de Canciones" en el Teatro de las Américas del CCPA. @eduschmidtoficial',
    price: '0',
    image: 'https://i.ibb.co/W4826SX8/Captura-de-pantalla-2025-03-31-075256-png.webp',
    tag: 'Musica'
  },
  {
    id: '6',
    name: '#Modo_Avión',
    date: '2025-04-06T23:00:00',
    time: '18:00 y 20:00 Hs',
    address: 'Teatro de las Américas del Centro Cultural Paraguayo Americano',
    description: '#MODO_AVIÓN ✈️Una obra dirigida por Tana Schémbori',
    price: 'Gs. 100.000',
    image: 'https://i.ibb.co/wF1XMPSP/Captura-de-pantalla-2025-04-01-121043-png.webp',
    tag: 'Teatro'
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
