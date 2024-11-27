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
      if (letter === 'S' && position === 71) return 'bg-orange-500 text-white border-black';
      if (letter === 'A' && position === 72) return 'bg-blue-500 text-white border-black';
      if (letter === 'N' && position === 73) return 'bg-yellow-500 text-white border-black';
      if (letter === 'T' && position === 82) return 'bg-red-500 text-white border-black';
      if (letter === 'A' && position === 81) return 'bg-green-500 text-white border-black';
      
      // All other found words are green
      return 'bg-green-500 text-white border-black';
    }

    // Currently selected letter
    if (isSelected) {
      return 'bg-blue-500 text-white border-blue-400';
    }

    // Default state with hover
    return 'bg-white text-gray-900 border-gray-200 hover:bg-blue-500 hover:text-white';
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
          getBaseStyles()
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