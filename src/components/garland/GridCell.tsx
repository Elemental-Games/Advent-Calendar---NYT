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
  position: number;
}

const SELECTION_COLORS = [
  'bg-green-500',  // Green
  'bg-red-500',    // Red
  'bg-blue-500',   // Blue
  'bg-orange-500', // Orange
  'bg-purple-500', // Purple
];

export const GridCell = memo(function GridCell({
  letter,
  isSelected,
  isFound,
  foundWordIndex,
  isThemeWord,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  position,
}: GridCellProps) {
  console.log('GridCell rendering:', { letter, isSelected, isFound, foundWordIndex, isThemeWord });

  const getBaseStyles = () => {
    if (isFound) {
      // Theme word (ILOVEYOUSOMUCH) - Red fill with green outline
      if (isThemeWord) {
        return cn(
          'bg-[#ea384c]',   // Red fill
          'text-white',
          'border-2',
          'border-[#22c55e]', // Green outline
          'cursor-not-allowed'
        );
      }
      
      // All other found words - Green fill with red outline
      return cn(
        'bg-[#22c55e]',   // Green fill
        'text-white',
        'border-2',
        'border-[#ea384c]', // Red outline
        'cursor-not-allowed'
      );
    }

    // Selected state - Diagonal pattern using position
    if (isSelected) {
      const row = Math.floor(position / 6);
      const col = position % 6;
      const diagonalIndex = (row + col) % SELECTION_COLORS.length;
      return cn(
        SELECTION_COLORS[diagonalIndex],
        'text-white',
        'border-2',
        'border-black',
        'transition-colors duration-200'
      );
    }

    // Default state with hover using diagonal pattern
    const row = Math.floor(position / 6);
    const col = position % 6;
    const diagonalIndex = (row + col) % SELECTION_COLORS.length;
    return cn(
      'bg-white',
      'text-gray-900',
      'border-2',
      'border-gray-200',
      'hover:text-white',
      SELECTION_COLORS[diagonalIndex].replace('bg-', 'hover:bg-'),
      'transition-colors duration-200'
    );
  };

  return (
    <motion.div
      whileHover={{ scale: isFound ? 1 : 1.05 }}
      whileTap={{ scale: isFound ? 1 : 0.95 }}
      className="touch-none select-none"
      style={{ touchAction: 'none' }}
    >
      <button
        data-cell-index={position}
        data-letter={letter}
        disabled={isFound}
        className={cn(
          "w-10 h-10 rounded-full font-bold text-lg",
          "flex items-center justify-center",
          "transition-all duration-200 shadow-lg",
          "touch-none select-none",
          getBaseStyles()
        )}
        style={{ touchAction: 'none' }}
        onMouseDown={!isFound ? onMouseDown : undefined}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
      >
        {letter}
      </button>
    </motion.div>
  );
});