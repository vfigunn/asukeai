
export const formatDate = (dateString: string): string => {
  // Handle YYYY-MM-DD format without timezone issues
  const [year, month, day] = dateString.split('T')[0].split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
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
  // Handle YYYY-MM-DD format without timezone issues
  const [year, month, day] = dateString.split('T')[0].split('-');
  const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return eventDate < today;
};

export const getUniqueEventTags = (events: { tag: string }[]): string[] => {
  const uniqueTags = [...new Set(events.map(event => event.tag))];
  return uniqueTags;
};
