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
      const selectedColor = colors[position]?.replace('hover:', '') || 'bg-orange-500';
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

  const findTargetCell = (clientX: number, clientY: number): HTMLElement | null => {
    const elements = document.elementsFromPoint(clientX, clientY);
    const targetCell = elements.find(el => 
      el instanceof HTMLElement && 
      el.hasAttribute('data-cell-index')
    ) as HTMLElement | null;
    return targetCell;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFound) return;
    e.preventDefault();
    e.stopPropagation();
    onMouseDown();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isFound) return;
    e.preventDefault();
    e.stopPropagation();
    
    const touch = e.touches[0];
    const targetCell = findTargetCell(touch.clientX, touch.clientY);
    
    if (targetCell) {
      const targetIndex = parseInt(targetCell.getAttribute('data-cell-index') || '-1');
      if (targetIndex !== position && targetIndex !== -1) {
        onMouseEnter();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isFound) return;
    e.preventDefault();
    e.stopPropagation();
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
        style={{ touchAction: 'none', WebkitTouchCallout: 'none' }}
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