
import React from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { formatDate, formatTime } from '@/utils/dateUtils';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <div className="event-card cursor-pointer" onClick={onClick}>
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold line-clamp-1">{event.name}</h3>
          <span className={`tag tag-${event.tag.toLowerCase()}`}>{event.tag}</span>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate">{event.address}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDays size={14} className="mr-1 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1 flex-shrink-0" />
            <span>{formatTime(event.date)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-primary">
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
