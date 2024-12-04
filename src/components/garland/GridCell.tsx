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
      return 'bg-red-500 text-white border-2 border-green-500 shadow-lg';
    }
    
    if (isFound) {
      const colors = {
        0: 'bg-purple-500 border-purple-700',
        1: 'bg-blue-500 border-blue-700',
        2: 'bg-pink-500 border-pink-700',
        3: 'bg-emerald-500 border-emerald-700',
        4: 'bg-amber-500 border-amber-700',
        5: 'bg-indigo-500 border-indigo-700',
        6: 'bg-cyan-500 border-cyan-700',
      };
      const colorStyle = colors[foundWordIndex as keyof typeof colors] || 'bg-gray-500 border-gray-700';
      return `${colorStyle} text-white border-2 shadow-lg opacity-90`;
    }

    if (isSelected) {
      return 'bg-orange-500 text-white border-2 border-orange-700 shadow-lg';
    }

    return 'bg-white text-gray-900 border-2 border-gray-200 hover:bg-blue-500 hover:text-white';
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
          "transition-all duration-200",
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