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
    if (isFound) {
      // Theme word (Fantasy) - Brighter yellow fill with darker green outline
      if (isThemeWord) {
        return cn(
          'bg-[#FFE566]',    // Much brighter yellow background
          'text-black',       // Black text for contrast
          'border-2',
          'border-[#2E7D32]', // Darker forest green outline
          'cursor-not-allowed',
          'opacity-100',
          'pointer-events-none'
        );
      }
      
      // Specific styles for each word based on foundWordIndex
      switch(foundWordIndex) {
        case 1: // LADD - Orange/coral fill
          return cn(
            'bg-[#FF7043]',   // Coral/orange
            'text-white',
            'border-2',
            'border-black',
            'cursor-not-allowed'
          );
        case 2: // WALKER - Light blue with bright outline
          return cn(
            'bg-[#40C4FF]',   // Light blue
            'text-white',
            'border-2',
            'border-[#39FF14]', // Bright green outline
            'cursor-not-allowed'
          );
        case 3: // COURTLAND - Navy blue
          return cn(
            'bg-[#1A237E]',   // Navy blue
            'text-white',
            'border-2',
            'border-black',
            'cursor-not-allowed'
          );
        case 4: // MONTGOMERY - Navy blue fill and neon green outline
          return cn(
            'bg-[#1A237E]',   // Deep navy blue
            'text-white',
            'border-2',
            'border-[#39FF14]', // Neon green
            'cursor-not-allowed'
          );
        case 5: // LAPORTA - Pure black fill and bright sky blue outline
          return cn(
            'bg-black',
            'text-white',
            'border-2',
            'border-[#40C4FF]', // Bright sky blue
            'cursor-not-allowed'
          );
        default:
          return cn(
            'bg-green-500',
            'text-white',
            'border-2',
            'border-red-500',
            'cursor-not-allowed'
          );
      }
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
        onMouseDown={!isFound ? onMouseDown : undefined}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
      >
        {letter}
      </button>
    </motion.div>
  );
});