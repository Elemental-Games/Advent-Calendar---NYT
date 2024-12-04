import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useCellStyles } from '@/hooks/useCellStyles';

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
  const baseStyles = useCellStyles({
    isFound,
    isThemeWord,
    isSelected,
    foundWordIndex
  });

  return (
    <motion.div
      whileHover={{ scale: isFound ? 1 : 1.05 }}
      whileTap={{ scale: isFound ? 1 : 0.95 }}
      className="touch-none select-none"
      style={{ touchAction: 'none' }}
    >
      <button
        data-cell-index={position}
        className={`w-10 h-10 rounded-full font-bold text-lg
          flex items-center justify-center
          transition-all duration-200 shadow-lg
          touch-none select-none
          ${baseStyles}`}
        style={{ touchAction: 'none' }}
        onClick={!isFound ? onClick : undefined}
      >
        {letter}
      </button>
    </motion.div>
  );
});