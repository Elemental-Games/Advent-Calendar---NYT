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
    // Special case for SANTA
    if (letter === 'S' && position === 71) return 'bg-red-500 text-white border-black';
    if (letter === 'A' && position === 72) return 'bg-blue-500 text-white border-black';
    if (letter === 'N' && position === 73) return 'bg-yellow-500 text-white border-black';
    if (letter === 'T' && position === 82) return 'bg-purple-500 text-white border-black';
    if (letter === 'A' && position === 81) return 'bg-green-500 text-white border-black';

    // Theme word (Christmas)
    if (isThemeWord && isFound) {
      return 'bg-green-500 text-white border-black';
    }
    
    // Found words (not SANTA or theme word)
    if (isFound) {
      return 'bg-green-500 text-white border-black';
    }

    // Get the predefined color for hover/selection state
    const colors = generateUniqueColors();
    const hoverColor = `hover:${colors[position]}` || 'hover:bg-blue-500';

    // Currently selected - use the hover color without the 'hover:' prefix
    if (isSelected) {
      return `${colors[position]} text-white border-black`;
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