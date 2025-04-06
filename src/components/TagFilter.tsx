
import React from 'react';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, onTagSelect }) => {
  if (!tags || tags.length === 0) {
    return null; // Don't render if there are no tags
  }

  return (
    <div className="w-full overflow-x-auto tag-filter-container pb-4">
      <div className="flex space-x-3 min-w-max">
        <button
          onClick={() => onTagSelect('')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            !selectedTag 
              ? "bg-primary text-primary-foreground shadow-md" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          Todos
        </button>
        
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedTag === tag 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
