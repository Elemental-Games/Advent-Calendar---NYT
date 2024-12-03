/**
 * Hook for managing individual cell input in the crossword puzzle.
 * Handles keyboard input, cell navigation, and input validation at the cell level.
 * Coordinates with the grid state to ensure proper input handling and cell updates.
 * Manages backspace functionality and cell selection behavior.
 */

import { useCallback } from 'react';
import type { CellPosition } from '@/components/crossword/types';

export function useCrosswordCellInput(
  isValidCell: (row: number, col: number) => boolean,
  getClueNumber: (row: number, col: number) => string,
  findNextCell: (row: number, col: number, showDown: boolean) => CellPosition | null,
  findPreviousCell: (row: number, col: number, showDown: boolean) => CellPosition | null,
  setSelectedCell: (cell: CellPosition | null) => void,
  cellRefs: React.MutableRefObject<(HTMLInputElement | null)[][]>,
  showDown: boolean,
  guesses: Record<string, string>,
  setGuesses: (guesses: Record<string, string>) => void
) {
  const handleInputChange = useCallback((rowIndex: number, colIndex: number, value: string) => {
    console.log(`Handling input change at ${rowIndex},${colIndex} with value: ${value}`);
    
    const clueNumber = getClueNumber(rowIndex, colIndex);
    if (!clueNumber) return;

    const newGuesses = { ...guesses };
    
    // Calculate positions
    let acrossPos = 0;
    let downPos = 0;
    
    // Count valid cells up to the current position
    for (let col = 0; col < colIndex; col++) {
      if (isValidCell(rowIndex, col)) acrossPos++;
    }
    for (let row = 0; row < rowIndex; row++) {
      if (isValidCell(row, colIndex)) downPos++;
    }

    console.log(`Calculated positions - Across: ${acrossPos}, Down: ${downPos}`);

    // Update both across and down values
    const acrossKey = `a${clueNumber}`;
    const downKey = `d${clueNumber}`;

    // Initialize strings if they don't exist
    if (!newGuesses[acrossKey]) {
      newGuesses[acrossKey] = ' '.repeat(
        Array(5).fill(null).filter((_, col) => isValidCell(rowIndex, col)).length
      );
    }
    if (!newGuesses[downKey]) {
      newGuesses[downKey] = ' '.repeat(
        Array(5).fill(null).filter((_, row) => isValidCell(row, colIndex)).length
      );
    }

    // Update both values
    newGuesses[acrossKey] = 
      newGuesses[acrossKey].slice(0, acrossPos) + 
      value.toUpperCase() + 
      newGuesses[acrossKey].slice(acrossPos + 1);
    
    newGuesses[downKey] = 
      newGuesses[downKey].slice(0, downPos) + 
      value.toUpperCase() + 
      newGuesses[downKey].slice(downPos + 1);

    console.log('Updated guesses:', newGuesses);
    setGuesses(newGuesses);

    if (value) {
      const nextCell = findNextCell(rowIndex, colIndex, showDown);
      if (nextCell) {
        cellRefs.current[nextCell.row][nextCell.col]?.focus();
        setSelectedCell(nextCell);
      }
    }
  }, [isValidCell, getClueNumber, findNextCell, setSelectedCell, cellRefs, showDown, guesses, setGuesses]);

  const handleBackspace = useCallback((selectedCell: CellPosition | null) => {
    if (!selectedCell) return;
    handleInputChange(selectedCell.row, selectedCell.col, '');
    const prevCell = findPreviousCell(selectedCell.row, selectedCell.col, showDown);
    if (prevCell) {
      setSelectedCell(prevCell);
      cellRefs.current[prevCell.row][prevCell.col]?.focus();
    }
  }, [handleInputChange, findPreviousCell, showDown, setSelectedCell, cellRefs]);

  return {
    handleInputChange,
    handleBackspace
  };
}
