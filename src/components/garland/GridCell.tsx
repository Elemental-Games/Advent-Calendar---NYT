import React, { memo, useState } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);

  const getBaseStyles = () => {
    if (isFound && isThemeWord) {
      return 'bg-green-500 text-white border-2 border-red-500';
    }
    
    if (isFound) {
      const baseStyle = 'text-white border-2 border-black';
      switch(foundWordIndex) {
        case 0: return `bg-red-500 ${baseStyle}`;
        case 1: return `bg-blue-500 ${baseStyle}`;
        case 2: return `bg-yellow-500 ${baseStyle}`;
        case 3: return `bg-purple-500 ${baseStyle}`;
        case 4: return `bg-indigo-500 ${baseStyle}`;
        case 5: return `bg-orange-500 ${baseStyle}`;
        default: return `bg-green-500 ${baseStyle}`;
      }
    }

    if (isSelected) {
      return 'bg-orange-500 text-white border-2 border-black';
    }

    return cn(
      'bg-white text-gray-900 border-2 border-gray-200',
      'hover:text-white active:text-white',
      'hover:bg-blue-500'
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFound) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    onMouseDown();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isFound) return;

    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    // Get all elements at the touch point
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    
    // Find the first button element with a cell-index
    const targetElement = elements.find(el => 
      el instanceof HTMLElement && 
      el.tagName.toLowerCase() === 'button' && 
      el.dataset.cellIndex !== undefined
    ) as HTMLElement | undefined;
    
    if (targetElement?.dataset?.cellIndex) {
      const targetIndex = parseInt(targetElement.dataset.cellIndex);
      console.log('Touch move target index:', targetIndex, 'current position:', position);
      if (targetIndex !== position) {
        onMouseEnter();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isFound) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(false);
    onMouseUp();
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
      >
        {letter}
      </button>
    </motion.div>
  );
});