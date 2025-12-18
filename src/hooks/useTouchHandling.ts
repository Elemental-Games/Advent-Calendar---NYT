import { useState, useCallback } from 'react';

interface TouchHandlingProps {
  isFound: boolean;
  position: number;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
}

export function useTouchHandling({
  isFound,
  position,
  onMouseDown,
  onMouseEnter,
  onMouseUp
}: TouchHandlingProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState<number | null>(null);

  const findCellFromTouch = (touch: React.Touch): number | null => {
    const x = touch.clientX;
    const y = touch.clientY;
    
    // Get all elements at touch point
    const elements = document.elementsFromPoint(x, y);
    console.log('Elements found at touch point:', elements.length);
    
    // Find button element with cell-index
    for (const element of elements) {
      if (element instanceof HTMLElement) {
        const cellIndex = element.getAttribute('data-cell-index');
        if (cellIndex) {
          const index = parseInt(cellIndex);
          console.log('Found cell at touch point:', index);
          return index;
        }
      }
    }
    
    return null;
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isFound) return;
    
    console.log('Touch start event at position:', position);
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setLastPosition(position);
    onMouseDown();
  }, [isFound, position, onMouseDown]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || isFound) return;

    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    const currentPosition = findCellFromTouch(touch);
    
    if (currentPosition !== null && currentPosition !== lastPosition) {
      console.log('Touch move from', lastPosition, 'to', currentPosition);
      setLastPosition(currentPosition);
      onMouseEnter();
    }
  }, [isDragging, isFound, lastPosition, onMouseEnter]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isFound) return;
    
    console.log('Touch end at position:', position);
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(false);
    setLastPosition(null);
    onMouseUp();
  }, [isFound, position, onMouseUp]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}