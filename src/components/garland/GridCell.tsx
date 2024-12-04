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
  console.log(`GridCell rendering - letter: ${letter}, isFound: ${isFound}, foundWordIndex: ${foundWordIndex}`);
  
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandling({
    isFound,
    position,
    onMouseDown,
    onMouseEnter,
    onMouseUp
  });

  const getBaseStyles = () => {
    // All found words (including theme word) get green fill and red border
    if (isFound) {
      return 'bg-green-500 text-red-500 border-2 border-red-500 cursor-not-allowed';
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

    // Default state with hover
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
        className={cn(
          "w-10 h-10 rounded-full font-bold text-lg",
          "flex items-center justify-center",
          "transition-all duration-200 shadow-lg",
          "touch-none select-none",
          getBaseStyles()
        )}
        style={{ touchAction: 'none' }}
        onClick={!isFound ? onMouseDown : undefined}
        disabled={isFound}
      >
        {letter}
      </button>
    </motion.div>
  );
});