import React from 'react';
import { motion } from 'framer-motion';
import { CHRISTMAS_COLORS } from '@/lib/garland-constants';

interface GridCellProps {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  foundWordIndex: number;
  isThemeWord: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  selectionIndex: number;
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
}: GridCellProps) {
  const getRandomChristmasColor = () => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-orange-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
    
    // Found words
    if (isFound) {
      const colorIndex = foundWordIndex % CHRISTMAS_COLORS.length;
      return {
        bg: `bg-[${CHRISTMAS_COLORS[colorIndex]}]`,
        text: 'text-white',
        border: 'border-yellow-400',
        hover: '',
      };
    }

    // Currently selected letter
    if (isSelected) {
      return {
        bg: getRandomChristmasColor(),
        text: 'text-white',
        border: 'border-transparent',
        hover: '',
      };
    }

    // Default state (not selected, not found)
    return {
      bg: 'bg-white',
      text: 'text-gray-900',
      border: 'border-transparent',
      hover: 'hover:text-white',
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
        ${!isFound && !isSelected ? 'hover:' + getRandomChristmasColor() : ''}
        ${isFound ? 'cursor-default' : 'cursor-pointer'}`}
      onMouseDown={!isFound ? onMouseDown : undefined}
      onMouseEnter={!isFound ? onMouseEnter : undefined}
      style={{ 
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out'
      }}
    >
      {letter}
    </motion.button>
  );
}