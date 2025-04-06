
import React from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { formatDate, formatTime } from '@/utils/dateUtils';
import { Event } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  if (!event) {
    console.error("EventCard received undefined or null event");
    return null;
  }

  return (
    <Card className="event-card cursor-pointer overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1" onClick={onClick}>
      <div className="aspect-[1/1] overflow-hidden relative">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop";
            console.error("Failed to load image for event:", event.name);
          }}
        />
        <div className="absolute top-3 right-3 ">
          <Badge className={`tag tag-${event.tag.toLowerCase()} `}>{event.tag}</Badge>
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-bold line-clamp-1 mb-3">{event.name}</h3>
        
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center text-sm">
            <MapPin size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{event.address}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <CalendarDays size={14} className="mr-2 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock size={14} className="mr-2 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-4 border-t mt-auto">
        <p className="text-lg font-bold text-primary w-full">
          {event.price === '0' ? 'Entrada libre y gratuita' : `${event.price}`}
        </p>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
