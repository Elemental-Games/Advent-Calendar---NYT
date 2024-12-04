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
  const [lastProcessedPosition, setLastProcessedPosition] = useState<number | null>(null);

  const findTargetCell = useCallback((x: number, y: number) => {
    console.log('Finding target cell at:', x, y);
    const elements = document.elementsFromPoint(x, y);
    
    const targetElement = elements.find(el => 
      el instanceof HTMLElement && 
      el.tagName.toLowerCase() === 'button' && 
      el.dataset.cellIndex !== undefined
    ) as HTMLElement | undefined;

    if (targetElement?.dataset?.cellIndex) {
      const targetIndex = parseInt(targetElement.dataset.cellIndex);
      console.log('Found target cell:', targetIndex);
      return targetIndex;
    }
    return null;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isFound) return;
    
    console.log('Touch start at position:', position);
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setLastProcessedPosition(position);
    onMouseDown();
  }, [isFound, position, onMouseDown]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || isFound) return;

    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    const targetIndex = findTargetCell(touch.clientX, touch.clientY);
    
    if (targetIndex !== null && targetIndex !== lastProcessedPosition) {
      console.log('Moving from position', lastProcessedPosition, 'to', targetIndex);
      setLastProcessedPosition(targetIndex);
      onMouseEnter();
    }
  }, [isDragging, isFound, lastProcessedPosition, findTargetCell, onMouseEnter]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isFound) return;
    
    console.log('Touch end at position:', position);
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(false);
    setLastProcessedPosition(null);
    onMouseUp();
  }, [isFound, position, onMouseUp]);

  return {
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}