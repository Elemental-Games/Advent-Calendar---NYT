import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface CellStylesProps {
  isFound: boolean;
  isThemeWord: boolean;
  isSelected: boolean;
  foundWordIndex: number;
}

export function useCellStyles({
  isFound,
  isThemeWord,
  isSelected,
  foundWordIndex
}: CellStylesProps) {
  const baseStyles = useMemo(() => {
    // Found words get green fill with red text/border and can't be interacted with
    if (isFound) {
      return 'bg-green-500 text-red-500 border-2 border-red-500 cursor-default pointer-events-none';
    }

    // Selected state
    if (isSelected) {
      return 'bg-orange-500 text-white border-2 border-black';
    }

    // Default state with varied hover colors based on position
    const hoverColors = [
      'hover:bg-red-500',
      'hover:bg-blue-500',
      'hover:bg-yellow-500',
      'hover:bg-purple-500',
      'hover:bg-indigo-500',
      'hover:bg-orange-500',
      'hover:bg-pink-500',
      'hover:bg-teal-500'
    ];

    // Use foundWordIndex to determine hover color, cycling through the array
    const hoverColor = hoverColors[foundWordIndex % hoverColors.length];

    return cn(
      'bg-white text-gray-900 border-2 border-gray-200',
      'hover:text-white active:text-white',
      hoverColor,
      'cursor-pointer transition-colors duration-200'
    );
  }, [isFound, isThemeWord, isSelected, foundWordIndex]);

  return baseStyles;
}