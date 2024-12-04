/**
 * GridCell Component
 * Represents an individual cell in the game grid.
 * Handles both mouse and touch interactions.
 * Manages visual states including:
 * - Normal state
 * - Selected state
 * - Found word state
 * - Theme word state
 * Uses Framer Motion for smooth animations and transitions.
 */
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
  onMouseUp: () => void;
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
  onMouseUp,
  selectionIndex,
  position,
}: GridCellProps) {
  const getBaseStyles = () => {
    if (isThemeWord && isFound) {
      return 'bg-green-500 text-white border-2 border-red-500 cursor-not-allowed opacity-75';
    }
    
    if (isFound) {
      const baseStyle = 'text-white border-2 border-red-500 cursor-not-allowed opacity-75';
      switch(foundWordIndex) {
        case 0: return `bg-green-500 ${baseStyle}`;
        case 1: return `bg-green-500 ${baseStyle}`;
        case 2: return `bg-green-500 ${baseStyle}`;
        case 3: return `bg-green-500 ${baseStyle}`;
        case 4: return `bg-green-500 ${baseStyle}`;
        case 5: return `bg-green-500 ${baseStyle}`;
        case 6: return `bg-green-500 ${baseStyle}`;
        default: return `bg-green-500 ${baseStyle}`;
      }
    }

    const colors = generateUniqueColors();
    const hoverColor = colors[position] || 'hover:bg-blue-500';

    if (isSelected) {
      return `${hoverColor.replace('hover:', '')} text-white border-2 border-black`;
    }

    return cn(
      'bg-white text-gray-900 border-2 border-gray-200',
      'hover:text-white active:text-white',
      hoverColor
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isFound) {
      e.preventDefault();
      onMouseDown();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isFound) {
      e.preventDefault();
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element?.tagName === 'BUTTON') {
        const event = new MouseEvent('mouseenter', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        element.dispatchEvent(event);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isFound) {
      e.preventDefault();
      onMouseUp();
    }
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
          "transition-all duration-200 shadow-lg",
          getBaseStyles()
        )}
        onMouseDown={!isFound ? onMouseDown : undefined}
        onMouseEnter={!isFound ? onMouseEnter : undefined}
        onMouseUp={!isFound ? onMouseUp : undefined}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {letter}
      </button>
    </motion.div>
  );
});