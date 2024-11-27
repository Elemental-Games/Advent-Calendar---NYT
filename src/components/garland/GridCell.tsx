import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface GridCellProps {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  foundWordIndex: number;
  isThemeWord: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  selectionIndex: number;
  uniqueColor: string;
}

export const GridCell = memo(function GridCell({
  letter,
  isSelected,
  isFound,
  foundWordIndex,
  isThemeWord,
  onMouseDown,
  onMouseEnter,
  selectionIndex,
  uniqueColor,
}: GridCellProps) {
  const position = Math.floor(selectionIndex / 6) * 10 + (selectionIndex % 6) + 11;
  
  console.log('GridCell render:', { 
    letter,
    position,
    uniqueColor,
    isFound,
    isSelected
  });

  const getBaseColor = () => {
    // Theme word (Christmas)
    if (isThemeWord && isFound) {
      return 'bg-green-500 text-white border-red-500';
    }
    
    // Found words with specific colors for SANTA
    if (isFound) {
      const santaColors: { [key: number]: string } = {
        71: 'bg-orange-500', // S
        72: 'bg-blue-500',   // A
        73: 'bg-yellow-500', // N
        82: 'bg-red-500',    // T
        81: 'bg-green-500'   // A
      };
      
      if (santaColors[position]) {
        return `${santaColors[position]} text-white border-black`;
      }
      
      return 'bg-purple-500 text-white border-black';
    }

    // Currently selected letter
    if (isSelected) {
      return 'bg-blue-500 text-white border-blue-400';
    }

    // Default state - white background with hover color from uniqueColor
    const baseColor = uniqueColor.split('-')[1]; // Extract 'red' from 'bg-red-500'
    const shade = uniqueColor.split('-')[2]; // Extract '500' from 'bg-red-500'
    
    return `group-hover:bg-${baseColor}-${shade} group-hover:text-white bg-white text-gray-900`;
  };

  return (
    <motion.div
      className="group"
      whileHover={{ scale: isFound ? 1 : 1.05 }}
      whileTap={{ scale: isFound ? 1 : 0.95 }}
    >
      <button
        className={`
          w-10 h-10 
          rounded-full 
          font-bold 
          text-lg 
          flex 
          items-center 
          justify-center
          transition-all 
          duration-200 
          shadow-lg
          border-2
          ${getBaseColor()}
          ${isFound ? 'cursor-default' : 'cursor-pointer'}
        `}
        onMouseDown={!isFound ? onMouseDown : undefined}
        onMouseEnter={!isFound ? onMouseEnter : undefined}
        style={{ 
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {letter}
      </button>
    </motion.div>
  );
});