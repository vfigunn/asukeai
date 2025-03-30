
import React, { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import EventFilters from '@/components/EventFilters';
import TagFilter from '@/components/TagFilter';
import { getAllEvents, getFilteredEvents } from '@/services/eventService';
import { getUniqueEventTags } from '@/utils/dateUtils';
import { Event } from '@/types';
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  // Get all events and tags
  const allEvents = getAllEvents();
  const tags = getUniqueEventTags(allEvents);

  // Load initial events on component mount
  useEffect(() => {
    const initialEvents = getFilteredEvents();
    console.log('Initial events on mount:', initialEvents);
    setEvents(initialEvents);
  }, []);

  // Update filtered events when filters change
  useEffect(() => {
    const filtered = getFilteredEvents(searchTerm, selectedDate, selectedTag);
    console.log('Filtered events after filter change:', filtered);
    setEvents(filtered);
  }, [searchTerm, selectedDate, selectedTag]);

  // Debug on mount
  useEffect(() => {
    console.log('All events from data source:', allEvents);
    
    if (allEvents.length === 0) {
      toast({
        title: "No events found",
        description: "Please check the events data.",
        variant: "destructive"
      });
    }
  }, [allEvents]);

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
        <TagFilter 
          tags={tags} 
          selectedTag={selectedTag} 
          onTagSelect={handleTagSelect} 
        />
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
      
      {events.length > 0 ? (
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
