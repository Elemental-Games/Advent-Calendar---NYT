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

  const findTargetCell = useCallback((x: number, y: number): number | null => {
    console.log('Finding target cell at coordinates:', x, y);
    const elements = document.elementsFromPoint(x, y);
    
    for (const element of elements) {
      if (element instanceof HTMLElement && element.dataset.cellIndex) {
        const targetIndex = parseInt(element.dataset.cellIndex);
        console.log('Found target cell with index:', targetIndex);
        return targetIndex;
      }
    }
    console.log('No target cell found at coordinates');
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
      console.log('Processing touch move from', lastProcessedPosition, 'to', targetIndex);
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
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}