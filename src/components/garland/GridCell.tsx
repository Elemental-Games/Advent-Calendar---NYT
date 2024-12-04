import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GridCellProps {
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  foundWordIndex: number;
  isThemeWord: boolean;
  onClick: () => void;
  position: number;
}

export const GridCell = memo(function GridCell({
  letter,
  isSelected,
  isFound,
  foundWordIndex,
  isThemeWord,
  onClick,
  position,
}: GridCellProps) {
  console.log(`GridCell rendering - letter: ${letter}, isFound: ${isFound}, foundWordIndex: ${foundWordIndex}`);

  const getBaseStyles = () => {
    if (isFound) {
      return cn(
        'bg-green-500',
        'text-red-500 font-bold',
        'border-2',
        'border-red-500',
        'cursor-not-allowed',
        'pointer-events-none',
        'opacity-90'
      );
    }

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

    const hoverColors = [
      'hover:bg-red-500',
      'hover:bg-blue-500',
      'hover:bg-green-500',
      'hover:bg-yellow-500',
      'hover:bg-purple-500'
    ];
    const hoverColor = hoverColors[position % hoverColors.length];
    
    return cn(
      'bg-white text-gray-900',
      'border-2 border-gray-200',
      'hover:text-white active:text-white',
      hoverColor,
      'cursor-pointer',
      'active:scale-95 transition-transform'
    );
  };

  return (
    <motion.div
      whileHover={{ scale: isFound ? 1 : 1.05 }}
      whileTap={{ scale: isFound ? 1 : 0.95 }}
      className="touch-none select-none"
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
        onClick={!isFound ? onClick : undefined}
        disabled={isFound}
        aria-disabled={isFound}
      >
        {letter}
      </button>
    </motion.div>
  );
});