import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { generateUniqueColors } from '@/lib/garland-constants';

interface GridCellProps {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  foundWordIndex: number;
  isThemeWord: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  selectionIndex: number;
  position: number;
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
  position,
}: GridCellProps) {
  const getBaseStyles = () => {
    // Theme word (Christmas)
    if (isThemeWord && isFound) {
      return 'bg-green-500 text-white border-2 border-red-500';
    }
    
    // Found words with specific colors
    if (isFound) {
      // Check for specific words based on foundWordIndex
      switch(foundWordIndex) {
        case 0: // santa
          return 'bg-red-500 text-white';
        case 1: // frost
          return 'bg-blue-500 text-white';
        case 2: // cookies
          return 'bg-yellow-500 text-white';
        case 3: // mistletoe
          return 'bg-green-500 text-white';
        case 4: // sleigh
          return 'bg-red-500 text-white';
        case 5: // rudolph
          return 'bg-purple-500 text-white';
        default:
          return 'bg-green-500 text-white';
      }
    }

    // Get the predefined color for hover/selection state
    const colors = generateUniqueColors();
    const hoverColor = `hover:${colors[position]}` || 'hover:bg-blue-500';

    // Currently selected - use the hover color without the 'hover:' prefix
    if (isSelected) {
      return `${colors[position]} text-white`;
    }

    // Default state (not found, not selected)
    return cn(
      'bg-white text-gray-900 border-gray-200',
      'hover:text-white active:text-white',
      hoverColor
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
          isFound && !isThemeWord ? 'border-transparent' : ''
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