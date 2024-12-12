import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTouchHandling } from '@/hooks/useTouchHandling';

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
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandling({
    isFound,
    position,
    onMouseDown,
    onMouseEnter,
    onMouseUp
  });

  const getBaseStyles = () => {
    // Found letters get green fill with red outline
    if (isFound) {
      return cn(
        'bg-green-500',      // Green background
        'text-white',        // White text for contrast
        'border-2',
        'border-red-500',    // Red outline
        'cursor-not-allowed',
        'pointer-events-none'
      );
    }

    // Selected state - only if not found
    if (isSelected && !isFound) {
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

    // Default state with hover - only if not found
    if (!isFound) {
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
    }

    return ''; // Fallback empty string for TypeScript
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
        className={cn(
          "w-8 h-8 md:w-10 md:h-10",
          "rounded-full font-bold",
          "text-base md:text-lg",
          "flex items-center justify-center",
          "transition-all duration-200",
          "shadow-md hover:shadow-lg",
          "touch-none select-none",
          getBaseStyles()
        )}
        style={{ touchAction: 'none' }}
        onClick={!isFound ? onMouseDown : undefined}
        disabled={isFound}
        aria-disabled={isFound}
      >
        {letter}
      </button>
    </motion.div>
  );
});