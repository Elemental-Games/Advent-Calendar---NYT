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
      return 'bg-green-500 text-white border-2 border-red-500 shadow-lg';
    }
    
    if (isFound) {
      const colors = {
        0: 'bg-purple-500 border-purple-700',
        1: 'bg-blue-500 border-blue-700',
        2: 'bg-yellow-500 border-yellow-700',
        3: 'bg-red-500 border-red-700',
        4: 'bg-green-500 border-green-700',
        5: 'bg-indigo-500 border-indigo-700',
      };
      return `${colors[foundWordIndex as keyof typeof colors]} text-white border-2 shadow-lg`;
    }

    if (isSelected) {
      return 'bg-orange-500 text-white border-2 border-orange-700 shadow-lg';
    }

    return 'bg-white text-gray-900 border-2 border-gray-200 hover:bg-blue-500 hover:text-white';
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
        onTouchStart={!isFound ? onMouseDown : undefined}
        onTouchMove={!isFound ? onMouseEnter : undefined}
        onTouchEnd={!isFound ? onMouseUp : undefined}
      >
        {letter}
      </button>
    </motion.div>
  );
});