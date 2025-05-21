
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import EventFilters from '@/components/EventFilters';
import TagFilter from '@/components/TagFilter';
import { getFilteredEvents, getUniqueEventTags } from '@/services/eventService';
import { Event } from '@/types';
import { Loader2 } from 'lucide-react';
import { eventsData } from '@/data/eventsData';


const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query for tags
  const tagsQuery = useQuery({
    queryKey: ['event-tags'],
    queryFn: getUniqueEventTags,
  });

  // Query for events with filters
  const eventsQuery = useQuery({
    queryKey: ['events', searchTerm, selectedDate, selectedTag],
    queryFn: () => getFilteredEvents(searchTerm, selectedDate, selectedTag),
  });

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
  };

  const isLoading = eventsQuery.isLoading || tagsQuery.isLoading;
  const events = eventsQuery.data || [];
  const tags = tagsQuery.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-norwester text-3xl md:text-4xl font-bold mb-4 text-white">
          AGENDA CULTURAL<span className="text-primary"> ASUNCENA</span>
        </h1>
        <p className="text-white max-w-2xl mx-auto">
        Viva la vibrante escena cultural de Asunción. Descubra y explore los mejores eventos que la ciudad tiene para ofrecer: música en vivo, exposiciones de arte, teatro, danza, poesía, festivales, ferias, capacitaciones, fotografía, cine y charlas inspiradoras. Sumérjase en la creatividad y la pasión de la capital paraguaya. ¡Encuentre su próximo evento favorito!
        </p>
      </div>
      
      {/* Tag filters (horizontal scrollable) */}
      <div className="mb-6">
        {tagsQuery.isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <TagFilter 
            tags={tags} 
            selectedTag={selectedTag} 
            onTagSelect={handleTagSelect} 
          />
        )}
      </div>
      
      {/* Search and date filters */}
      <EventFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        tags={tags}
      />
      
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={() => handleEventClick(event)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg mt-8">
          <h3 className="text-xl font-semibold mb-2">No se encontraron eventos</h3>
          <p className="text-gray-600">
          Intente ajustar los filtros de búsqueda para encontrar eventos. 
          </p>
        </div>
      )}
      
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
