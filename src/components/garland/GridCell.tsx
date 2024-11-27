import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

  const getBaseStyles = () => {
    // Theme word (Christmas)
    if (isThemeWord && isFound) {
      return 'bg-green-500 text-white border-red-500';
    }
    
    // Found words
    if (isFound) {
      // Special case for SANTA
      const santaColors: { [key: number]: string } = {
        71: 'bg-orange-500', // S
        72: 'bg-blue-500',   // A
        73: 'bg-yellow-500', // N
        82: 'bg-red-500',    // T
        81: 'bg-green-500'   // A
      };
      
      if (santaColors[position]) {
        console.log('SANTA position:', position, 'color:', santaColors[position]);
        return `${santaColors[position]} text-white border-black`;
      }
      
      // All other found words are green
      return 'bg-green-500 text-white border-black';
    }

    // Currently selected letter
    if (isSelected) {
      return 'bg-blue-500 text-white border-blue-400';
    }

    // Default state with hover
    return cn(
      'bg-white text-gray-900 border-gray-200',
      'hover:text-white active:text-white',
      `hover:${uniqueColor} active:${uniqueColor}`
    );
  };

  return (
    <motion.div
      whileHover={{ scale: isFound ? 1 : 1.05 }}
      whileTap={{ scale: isFound ? 1 : 0.95 }}
      className="touch-none"
    >
      <button
        className={cn(
          "w-10 h-10 rounded-full font-bold text-lg",
          "flex items-center justify-center",
          "transition-all duration-200 shadow-lg border-2",
          getBaseStyles(),
          isFound ? 'cursor-default' : 'cursor-pointer'
        )}
        onMouseDown={!isFound ? onMouseDown : undefined}
        onMouseEnter={!isFound ? onMouseEnter : undefined}
        onTouchStart={!isFound ? onMouseDown : undefined}
        onTouchMove={(e) => {
          if (!isFound) {
            e.preventDefault();
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element?.tagName === 'BUTTON') {
              element.dispatchEvent(new MouseEvent('mouseenter'));
            }
          }
        }}
      >
        {letter}
      </button>
    </motion.div>
  );
});