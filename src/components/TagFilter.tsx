import React from 'react';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;

}

  const colorMap: { [key: string]: string } = {
    musica: 'bg-primary text-white',
    charlas: 'bg-white text-black',
    danza: 'bg-cyan-500 text-white',
    teatro: 'bg-orange-600 text-white',
    arte: 'bg-blue-800 text-white',
    fotografia: 'bg-amber-500 text-white',
    cine: 'bg-gray-500 text-white',
    ferias: 'bg-green-500 text-white',
    poesia: 'bg-red-300 text-white',
    capacitacion: 'bg-amber-800 text-white',
  };

const getTagStyle = (tag: string, isSelected: boolean): string => {
  const baseClass = colorMap[tag.toLowerCase()] || 'bg-secondary text-secondary-foreground';
  return isSelected ? `${baseClass} opacity-70` : baseClass;
};

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, onTagSelect }) => {
  if (!tags || tags.length === 0) {
    return null; 
  }


  return (
    <div className="w-full overflow-x-auto tag-filter-container pb-4 ">
      <div className="flex space-x-3 min-w-max ">
        <button
          onClick={() => onTagSelect('')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all ",
            !selectedTag 
              ? "bg-primary text-primary-foreground shadow-md" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 "
          )}
        >
          Todos
        </button>
        
        {tags.map((tag,i) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              getTagStyle(tag, selectedTag === tag)
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
