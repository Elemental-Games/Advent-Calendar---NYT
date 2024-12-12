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
  const getBaseStyles = () => {
    // Found word styling (including theme word)
    if (isFound) {
      return cn(
        'bg-green-500',        // Green background
        'text-white',          // White text
        'border-2',           // 2px border width
        'border-red-500',     // Red border
        'cursor-not-allowed', // Not clickable cursor
        'opacity-100',        // Full opacity to make it stand out
        'pointer-events-none' // Prevent any interaction
      );
    }

    // Selected state
    if (isSelected) {
      const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500'
      ];
      const selectedColor = colors[position % colors.length];
      return `${selectedColor} text-white border-2 border-black`;
    }

    // Default hover state
    const hoverColors = [
      'hover:bg-red-500',
      'hover:bg-blue-500',
      'hover:bg-green-500',
      'hover:bg-yellow-500',
      'hover:bg-purple-500'
    ];
    const hoverColor = hoverColors[position % hoverColors.length];
    
    return cn(
      'bg-white text-gray-900 border-2 border-gray-200',
      'hover:text-white active:text-white',
      hoverColor
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
        onClick={!isFound ? onMouseDown : undefined}
      >
        {letter}
      </button>
    </motion.div>
  );
});