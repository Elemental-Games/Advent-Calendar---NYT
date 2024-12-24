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
  console.log('GridCell rendering:', { letter, isSelected, isFound, foundWordIndex, isThemeWord });

  const getBaseStyles = () => {
    if (isFound) {
      // Theme word (QualityTime) - Red fill with green outline
      if (isThemeWord) {
        return cn(
          'bg-[#ea384c]',   // Red fill
          'text-white',
          'border-2',
          'border-[#22c55e]', // Green outline
          'cursor-not-allowed'
        );
      }
      
      // Specific styles for each word based on foundWordIndex
      switch(foundWordIndex) {
        case 0: // Talking - Green fill with red outline
          return cn(
            'bg-[#22c55e]',   // Green fill
            'text-white',
            'border-2',
            'border-[#ea384c]', // Red outline
            'cursor-not-allowed'
          );
        case 1: // Exploring - Brown fill with gold outline
          return cn(
            'bg-[#8B4513]',   // Brown fill
            'text-white',
            'border-2',
            'border-[#FFD700]', // Gold outline
            'cursor-not-allowed'
          );
        case 2: // Events - Gradient circular fill
          return cn(
            'bg-gradient-to-r from-[#2E7D32] via-[#ea384c] to-[#0EA5E9]',
            'text-white',
            'border-2',
            'border-[#F97316]', // Orange outline
            'cursor-not-allowed'
          );
        case 3: // Games - Purple fill with neon green outline
          return cn(
            'bg-[#9b87f5]',   // Purple fill
            'text-white',
            'border-2',
            'border-[#39FF14]', // Neon green outline
            'cursor-not-allowed'
          );
        case 4: // Pickleball - Neon green fill with dark green outline
          return cn(
            'bg-[#39FF14]',   // Neon green fill
            'text-white',
            'border-2',
            'border-[#1B5E20]', // Dark green outline
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
      return cn(
        'bg-blue-500',
        'text-white',
        'border-2',
        'border-black',
        'transition-colors duration-200'
      );
    }

    // Default state with hover
    return cn(
      'bg-white',
      'text-gray-900',
      'border-2',
      'border-gray-200',
      'hover:bg-blue-500',
      'hover:text-white',
      'transition-colors duration-200'
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