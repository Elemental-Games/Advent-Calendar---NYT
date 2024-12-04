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
    // Define our color array once
    const colors = [
      'red',
      'blue',
      'yellow',
      'purple',
      'indigo',
      'orange',
      'pink',
      'teal'
    ];

    // Found words get green fill with red text/border and can't be interacted with
    if (isFound) {
      return 'bg-green-500 text-red-500 border-2 border-red-500 cursor-default pointer-events-none';
    }

    // Get a color based on the foundWordIndex
    const colorIndex = foundWordIndex % colors.length;
    const color = colors[colorIndex];

    // Selected state - use the same color array for consistency
    if (isSelected) {
      return `bg-${color}-500 text-white border-2 border-black`;
    }

    // Default state with hover using the same color
    return cn(
      'bg-white text-gray-900 border-2 border-gray-200',
      'hover:text-white active:text-white',
      `hover:bg-${color}-500`,
      'cursor-pointer transition-colors duration-200'
    );
  }, [isFound, isThemeWord, isSelected, foundWordIndex]);

  return baseStyles;
}