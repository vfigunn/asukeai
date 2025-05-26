
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

// console.log(tags)

// let tagColor


// const verificarColor = ()=>{tags.map((tag)=>{
//     switch(tag.toLowerCase()){
//     case 'musica': tagColor = 'bg-primary'
//       break
//     case 'charlas': tagColor = 'bg-white text-black'
//       break
//     case 'danza': tagColor = 'bg-cyan-500'
//       break
//     case 'teatro': tagColor = 'bg-orange-600'
//       break
//     case 'arte': tagColor = 'bg-blue-800'
//       break
//     case 'fotografia': tagColor = 'bg-amber-500'
//       break
//     case 'cine': tagColor = 'bg-gray-500'
//       break
//     case 'ferias': tagColor = 'bg-green-500'
//       break
//     case 'poesia': tagColor = 'bg-red-300'
//       break
//     case 'capacitacion': tagColor = 'bg-amber-800'
//       break
//     default: tagColor = 'bg-primary'
//       break
//   }
// })
// }


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
              ` px-4 py-2 rounded-full text-sm font-medium transition-all`,
              selectedTag === tag 
                ? `bg-primary text-primary-foreground shadow-md`
                : `bg-secondary text-secondary-foreground hover:bg-secondary/80`
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
