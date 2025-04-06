
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const isPastEvent = (dateString: string): boolean => {
  const eventDate = new Date(dateString);
  const now = new Date();
  return eventDate < now;
};

export const getUniqueEventTags = (events: { tag: string }[]): string[] => {
  const uniqueTags = [...new Set(events.map(event => event.tag))];
  return uniqueTags;
};
