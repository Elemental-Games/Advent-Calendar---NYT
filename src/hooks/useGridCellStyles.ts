import { cn } from "@/lib/utils";

export function useGridCellStyles() {
  const getBaseStyles = (isFound: boolean, isThemeWord: boolean, isSelected: boolean, foundWordIndex: number) => {
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

  return { getBaseStyles };
}