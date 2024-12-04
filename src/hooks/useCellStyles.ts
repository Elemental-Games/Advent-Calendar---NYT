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
    if (isFound) {
      return 'bg-green-500 text-red-500 border-2 border-red-500';
    }

    if (isSelected) {
      return 'bg-orange-500 text-white border-2 border-black';
    }

    return cn(
      'bg-white text-gray-900 border-2 border-gray-200',
      'hover:text-white active:text-white',
      'hover:bg-blue-500'
    );
  }, [isFound, isThemeWord, isSelected, foundWordIndex]);

  return baseStyles;
}