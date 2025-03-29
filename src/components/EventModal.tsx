
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarDays, Clock, MapPin, X } from 'lucide-react';
import { formatDate, formatTime } from '@/utils/dateUtils';
import { Event } from '@/types';
import { Button } from '@/components/ui/button';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  if (!event) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10 bg-white/80 p-1"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden bg-muted">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={`tag tag-${event.tag.toLowerCase()}`}>{event.tag}</span>
          </div>
        </div>
        
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl">{event.name}</DialogTitle>
            <DialogDescription className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center text-foreground">
                <MapPin size={16} className="mr-1 flex-shrink-0" />
                <span>{event.address}</span>
              </div>
              <p className="text-lg font-bold text-primary">
                {event.price === 0 ? 'Free' : `$${event.price}`}
              </p>
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center p-3 bg-secondary rounded-lg">
              <CalendarDays size={18} className="mr-2 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(event.date)}</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-secondary rounded-lg">
              <Clock size={18} className="mr-2 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{formatTime(event.date)}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About Event</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-accent hover:bg-accent/90">Get Tickets</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
