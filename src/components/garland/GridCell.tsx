import React from 'react';
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

export function GridCell({
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
  const getColors = () => {
    // Theme word (Christmas)
    if (isThemeWord && isFound) {
      return {
        bg: 'bg-green-500',
        text: 'text-black',
        border: 'border-red-500',
        hover: '',
      };
    }
    
    // Found words with specific colors for SANTA
    if (isFound) {
      // Special handling for SANTA word positions
      const santaColors: { [key: number]: string } = {
        71: 'bg-orange-500', // S
        72: 'bg-blue-500',   // A
        73: 'bg-yellow-500', // N
        82: 'bg-red-500',    // T
        81: 'bg-green-500'   // A
      };
      
      const position = Math.floor(selectionIndex / 6) * 10 + (selectionIndex % 6) + 11;
      const specificColor = santaColors[position];
      
      return {
        bg: specificColor || `bg-[${uniqueColor}]`,
        text: 'text-white',
        border: 'border-black',
        hover: '',
      };
    }

    // Currently selected letter
    if (isSelected) {
      return {
        bg: `bg-[${uniqueColor}]`,
        text: 'text-white',
        border: 'border-blue-400',
        hover: '',
      };
    }

    // Default state (not selected, not found)
    return {
      bg: 'bg-white hover:bg-opacity-90',
      text: 'text-gray-900',
      border: 'border-transparent',
      hover: `hover:bg-[${uniqueColor}] hover:text-white`,
    };
  };

  const colors = getColors();

  return (
    <motion.button
      whileHover={{ scale: isFound ? 1 : 1.05 }}
      whileTap={{ scale: isFound ? 1 : 0.95 }}
      className={`w-10 h-10 rounded-full font-bold text-lg flex items-center justify-center
        border-2 transition-colors duration-300 shadow-lg
        ${colors.bg} ${colors.text} ${colors.border} ${colors.hover}
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
}