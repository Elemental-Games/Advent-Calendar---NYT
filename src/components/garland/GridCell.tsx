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
import { generateUniqueColors } from '@/lib/garland-constants';

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
      const colors = generateUniqueColors();
      const selectedColor = colors[position]?.replace('hover:', '') || 'bg-blue-500';
      return `${selectedColor} text-white border-2 border-black`;
    }

    const colors = generateUniqueColors();
    const hoverColor = colors[position] || 'hover:bg-blue-500';
    return cn(
      'bg-white text-gray-900 border-2 border-gray-200',
      'hover:text-white active:text-white',
      hoverColor
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFound) return;
    e.preventDefault();
    console.log('Touch start on cell:', position);
    onMouseDown();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isFound) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element?.tagName === 'BUTTON') {
      const cellIndex = element.getAttribute('data-cell-index');
      const currentCellIndex = `${Math.floor(position / 10)}-${position % 10}`;
      
      console.log('Touch move - Current cell:', currentCellIndex, 'Target cell:', cellIndex);
      
      if (cellIndex && cellIndex !== currentCellIndex) {
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
    if (isFound) return;
    e.preventDefault();
    console.log('Touch end on cell:', position);
    onMouseUp();
  };

  return (
    <motion.div
      whileHover={{ scale: isFound ? 1 : 1.05 }}
      whileTap={{ scale: isFound ? 1 : 0.95 }}
      className="touch-none select-none"
    >
      <button
        data-cell-index={`${Math.floor(position / 10)}-${position % 10}`}
        className={cn(
          "w-10 h-10 rounded-full font-bold text-lg",
          "flex items-center justify-center",
          "transition-all duration-200 shadow-lg",
          "touch-none select-none",
          getBaseStyles()
        )}
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