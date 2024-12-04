import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { generateUniqueColors } from '@/lib/garland-constants';
import { useTouchHandling } from '@/hooks/useTouchHandling';

interface GridCellProps {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  foundWordIndex: number;
  isThemeWord: boolean;
  onCellClick: () => void;
  position: number;
}

export const GridCell = memo(function GridCell({
  letter,
  isSelected,
  isFound,
  foundWordIndex,
  isThemeWord,
  onCellClick,
  position,
}: GridCellProps) {
  console.log(`GridCell rendering - letter: ${letter}, isFound: ${isFound}, foundWordIndex: ${foundWordIndex}`);
  
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandling({
    isFound,
    position,
    onMouseDown: onCellClick,
    onMouseEnter: onCellClick,
    onMouseUp: onCellClick
  });

  const getBaseStyles = () => {
    // Theme word styling takes precedence
    if (isFound && isThemeWord) {
      return 'bg-green-500 text-white border-2 border-red-500';
    }
    
    // Found word styling
    if (isFound) {
      const baseStyle = 'text-white border-2 border-black';
      const colors = {
        0: 'bg-red-500',
        1: 'bg-blue-500',
        2: 'bg-yellow-500',
        3: 'bg-purple-500',
        4: 'bg-indigo-500',
        5: 'bg-pink-500',
        6: 'bg-teal-500',
        7: 'bg-orange-500'
      };
      return `${colors[foundWordIndex % 8] || 'bg-green-500'} ${baseStyle}`;
    }

    // Selected state - use the same color as hover
    if (isSelected) {
      const colors = generateUniqueColors();
      const selectedColor = colors[position]?.replace('hover:', '') || 'bg-blue-500';
      return `${selectedColor} text-white border-2 border-black`;
    }

    // Default state with hover
    const colors = generateUniqueColors();
    const hoverColor = colors[position] || 'hover:bg-blue-500';
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
        onClick={!isFound ? onCellClick : undefined}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        disabled={isFound}
      >
        {letter}
      </button>
    </motion.div>
  );
});