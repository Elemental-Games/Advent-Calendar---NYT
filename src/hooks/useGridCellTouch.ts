import { useState } from 'react';

interface UseGridCellTouchProps {
  isFound: boolean;
  position: number;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
}

export function useGridCellTouch({
  isFound,
  position,
  onMouseDown,
  onMouseEnter,
  onMouseUp
}: UseGridCellTouchProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFound) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    onMouseDown();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isFound) return;

    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
    
    if (element?.dataset?.cellIndex) {
      const targetIndex = parseInt(element.dataset.cellIndex);
      if (targetIndex !== position) {
        onMouseEnter();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isFound) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(false);
    onMouseUp();
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}