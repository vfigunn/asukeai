
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import EventFilters from '@/components/EventFilters';
import TagFilter from '@/components/TagFilter';
import { getFilteredEvents, getUniqueEventTags } from '@/services/eventService';
import { Event } from '@/types';
import { toast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

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

  // Show error if events or tags query fails
  useEffect(() => {
    if (eventsQuery.error) {
      toast({
        title: "Error loading events",
        description: "Failed to load events. Please try again later.",
        variant: "destructive"
      });
    }

    if (tagsQuery.error) {
      toast({
        title: "Error loading categories",
        description: "Failed to load event categories. Please try again later.",
        variant: "destructive"
      });
    }
  }, [eventsQuery.error, tagsQuery.error]);

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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Discover <span className="text-primary">Amazing</span> Events
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find and explore the best events happening around you. From music festivals to art exhibitions, we've got you covered!
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
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-gray-600">
            Try adjusting your search filters to find events.
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
