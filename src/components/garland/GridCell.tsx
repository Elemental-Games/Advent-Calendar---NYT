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

  const getColors = () => {
    // Theme word (Christmas)
    if (isThemeWord && isFound) {
      console.log('Theme word cell:', letter);
      return {
        bg: 'bg-green-500',
        text: 'text-white',
        border: 'border-red-500',
        hover: '',
      };
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
        console.log('SANTA letter colors:', { letter, position, color: santaColors[position] });
        return {
          bg: santaColors[position],
          text: 'text-white',
          border: 'border-2 border-black',
          hover: '',
        };
      }
      
      return {
        bg: 'bg-purple-500',
        text: 'text-white',
        border: 'border-2 border-black',
        hover: '',
      };
    }

    // Currently selected letter
    if (isSelected) {
      return {
        bg: 'bg-blue-500',
        text: 'text-white',
        border: 'border-2 border-blue-400',
        hover: '',
      };
    }

    // Default state (not selected, not found)
    return {
      bg: 'bg-white',
      text: 'text-gray-900',
      border: 'border-2 border-transparent',
      hoverBg: uniqueColor,
      hoverText: 'hover:text-white',
    };
  };

  const colors = getColors();

  return (
    <motion.button
      whileHover={{ scale: isFound ? 1 : 1.05 }}
      whileTap={{ scale: isFound ? 1 : 0.95 }}
      className={`w-10 h-10 rounded-full font-bold text-lg flex items-center justify-center
        transition-colors duration-300 shadow-lg
        ${colors.bg} ${colors.text} ${colors.border}
        ${!isFound && !isSelected ? `hover:${colors.hoverBg} ${colors.hoverText}` : ''}
        ${isFound ? 'cursor-default' : 'cursor-pointer'}`}
      onMouseDown={!isFound ? onMouseDown : undefined}
      onMouseEnter={!isFound ? onMouseEnter : undefined}
      style={{ 
        transition: 'all 0.2s ease-in-out'
      }}
    >
      {letter}
    </motion.button>
  );
});