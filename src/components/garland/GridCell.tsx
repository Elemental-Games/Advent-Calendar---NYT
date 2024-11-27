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
  const getColors = () => {
    if (isThemeWord) {
      return {
        bg: 'bg-green-500',
        text: 'text-white',
        border: 'border-red-500',
        hover: 'hover:bg-green-600',
      };
    }
    
    if (isFound) {
      const colorIndex = foundWordIndex % CHRISTMAS_COLORS.length;
      return {
        bg: `bg-[${CHRISTMAS_COLORS[colorIndex]}]`,
        text: 'text-white',
        border: 'border-yellow-300',
        hover: '',
      };
    }

    if (isSelected) {
      const colorIndex = selectionIndex % CHRISTMAS_COLORS.length;
      return {
        bg: `bg-[${CHRISTMAS_COLORS[colorIndex]}]`,
        text: 'text-white',
        border: 'border-transparent',
        hover: '',
      };
    }

    return {
      bg: 'bg-white',
      text: 'text-gray-900',
      border: 'border-transparent',
      hover: 'hover:bg-blue-500 hover:text-white',
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
        ${isFound ? 'cursor-default border-yellow-400' : 'cursor-pointer'}`}
      onMouseDown={!isFound ? onMouseDown : undefined}
      onMouseEnter={!isFound ? onMouseEnter : undefined}
    >
      {letter}
    </motion.button>
  );
}