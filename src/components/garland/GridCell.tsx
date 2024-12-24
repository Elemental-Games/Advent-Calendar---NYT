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
      // QualityTime - Theme word - Red Fill (Green Outline)
      if (isThemeWord) {
        return cn(
          'bg-red-500',
          'text-white',
          'border-2',
          'border-green-500',
          'cursor-not-allowed'
        );
      }
      
      // Found word styles based on index
      switch(foundWordIndex) {
        case 1: // Talking - green fill (red outline)
          return cn(
            'bg-green-500',
            'text-white',
            'border-2',
            'border-red-500',
            'cursor-not-allowed'
          );
        case 2: // Exploring - brown fill (gold outline)
          return cn(
            'bg-[#8B4513]', // Brown color
            'text-white',
            'border-2',
            'border-[#FFD700]', // Gold color
            'cursor-not-allowed'
          );
        case 3: // Events - gradient circular fill
          return cn(
            'bg-gradient-radial from-green-500 via-red-500 through-blue-500 to-orange-500',
            'text-white',
            'border-2',
            'border-transparent',
            'cursor-not-allowed'
          );
        case 4: // Games - Purple (neon green outline)
          return cn(
            'bg-purple-600',
            'text-white',
            'border-2',
            'border-[#39FF14]', // Neon green
            'cursor-not-allowed'
          );
        case 5: // Pickleball - Neon Green fill (Dark green outline)
          return cn(
            'bg-[#39FF14]', // Neon green
            'text-black',
            'border-2',
            'border-green-900', // Dark green
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
        'border-black'
      );
    }

    // Default state with hover effects
    return cn(
      'bg-white',
      'text-gray-900',
      'border-2',
      'border-gray-200',
      'hover:bg-blue-500',
      'hover:text-white'
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