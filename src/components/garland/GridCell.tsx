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
      return 'bg-green-500 text-white border-red-500';
    }
    
    // Found words
    if (isFound) {
      // Special case for SANTA
      if (letter === 'S' && position === 71) return 'bg-red-500 text-white border-black';
      if (letter === 'A' && position === 72) return 'bg-blue-500 text-white border-black';
      if (letter === 'N' && position === 73) return 'bg-yellow-500 text-white border-black';
      if (letter === 'T' && position === 82) return 'bg-purple-500 text-white border-black';
      if (letter === 'A' && position === 81) return 'bg-green-500 text-white border-black';
      
      return 'bg-green-500 text-white border-black';
    }

    // Default with hover - using position-based colors
    const hoverColors = {
      1: 'hover:bg-red-500',
      2: 'hover:bg-green-500',
      3: 'hover:bg-blue-500',
      4: 'hover:bg-yellow-500',
      5: 'hover:bg-purple-500'
    };

    const colPosition = position % 10;
    const hoverColor = hoverColors[colPosition as keyof typeof hoverColors] || 'hover:bg-blue-500';

    // Currently selected - use the hover color without the 'hover:' prefix
    if (isSelected) {
      return `${hoverColor.replace('hover:', '')} text-white border-black`;
    }

    return cn(
      'bg-white text-gray-900 border-gray-200',
      'hover:text-white active:text-white',
      hoverColor,
      `active:${hoverColor.replace('hover:', '')}`
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