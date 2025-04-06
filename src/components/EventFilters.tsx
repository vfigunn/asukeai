
import React from 'react';
import { Calendar, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

type FilterProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  tags: string[];
};

const EventFilters: React.FC<FilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  selectedTag,
  setSelectedTag,
  tags,
}) => {
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedDate(undefined);
    setSelectedTag('');
  };

  const isFiltersActive = searchTerm || selectedDate || selectedTag;

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant={selectedDate ? "default" : "outline"} 
                className={`gap-2 ${selectedDate ? 'bg-primary text-white' : ''}`}
              >
                <Calendar size={16} />
                {selectedDate ? (
                  <span>{selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                ) : (
                  <span>Filtrar por fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
              {selectedDate && (
                <div className="p-2 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-destructive"
                    onClick={() => setSelectedDate(undefined)}
                  >
                    <X size={16} className="mr-2" />
                    Limpiar
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {isFiltersActive && (
        <div className="mt-4 flex flex-wrap gap-2">
          {isFiltersActive && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-destructive font-medium ml-2 flex items-center"
            >
              <X size={14} className="mr-1" />
              Quitar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventFilters;
