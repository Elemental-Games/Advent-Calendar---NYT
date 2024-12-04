import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { generateUniqueColors, FOUND_WORD_STYLES } from '@/lib/garland-constants';
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
    // Found word styling (both theme word and regular found words now use the same green/red theme)
    if (isFound) {
      return FOUND_WORD_STYLES.default;
    }

    // Selected state - use the same color as hover but without the hover: prefix
    if (isSelected) {
      const colors = generateUniqueColors();
      const selectedColor = colors[position]?.replace('hover:', '') || 'bg-[#ea384c]';
      return `${selectedColor} text-white border-2 border-black`;
    }

    // Default state with hover
    const colors = generateUniqueColors();
    const hoverColor = colors[position] || 'hover:bg-[#ea384c]';
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
        onMouseDown={!isFound ? onMouseDown : undefined}
        onMouseEnter={!isFound ? onMouseEnter : undefined}
        onMouseUp={!isFound ? onMouseUp : undefined}
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