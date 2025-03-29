
import React from 'react';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, onTagSelect }) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex space-x-2 min-w-max">
        <button
          onClick={() => onTagSelect('')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            !selectedTag 
              ? "bg-primary text-white shadow-md" 
              : "bg-secondary hover:bg-secondary/80 text-foreground/80"
          )}
        >
          All Events
        </button>
        
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedTag === tag 
                ? `bg-primary text-white shadow-md` 
                : "bg-secondary hover:bg-secondary/80 text-foreground/80"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
