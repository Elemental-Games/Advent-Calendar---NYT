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
    if (!isValidCell(rowIndex, colIndex)) return;

    const newGuesses = { ...guesses };
    let clueNumber;
    
    if (showDown) {
      // Find the starting clue number for this column
      for (let row = rowIndex; row >= 0; row--) {
        const num = getClueNumber(row, colIndex);
        if (num) {
          clueNumber = num;
          break;
        }
      }
    } else {
      // Find the starting clue number for this row
      for (let col = colIndex; col >= 0; col--) {
        const num = getClueNumber(rowIndex, col);
        if (num) {
          clueNumber = num;
          break;
        }
      }
    }

    console.log(`Found clue number: ${clueNumber} for direction: ${showDown ? 'down' : 'across'}`);
    if (!clueNumber) return;

    const key = showDown ? `d${clueNumber}` : `a${clueNumber}`;
    
    // Calculate position within the word
    let pos = 0;
    if (showDown) {
      for (let row = 0; row < rowIndex; row++) {
        if (isValidCell(row, colIndex)) pos++;
      }
    } else {
      for (let col = 0; col < colIndex; col++) {
        if (isValidCell(rowIndex, col)) pos++;
      }
    }

    console.log(`Calculated position ${pos} for key ${key}`);

    // Initialize word if it doesn't exist
    if (!newGuesses[key]) {
      const length = showDown ?
        Array(5).fill(null).filter((_, row) => isValidCell(row, colIndex)).length :
        Array(5).fill(null).filter((_, col) => isValidCell(rowIndex, col)).length;
      newGuesses[key] = ' '.repeat(length);
    }

    // Update the guess
    newGuesses[key] = 
      newGuesses[key].slice(0, pos) + 
      value.toUpperCase() + 
      newGuesses[key].slice(pos + 1);

    console.log(`Updated guesses for ${key}:`, newGuesses[key]);
    setGuesses(newGuesses);

    // Move to next cell if value was entered
    if (value) {
      const nextCell = findNextCell(rowIndex, colIndex, showDown);
      if (nextCell) {
        console.log(`Moving to next cell: ${nextCell.row},${nextCell.col}`);
        setSelectedCell(nextCell);
        cellRefs.current[nextCell.row][nextCell.col]?.focus();
      }
    }
  }, [isValidCell, getClueNumber, findNextCell, setSelectedCell, cellRefs, showDown, guesses, setGuesses]);

  const handleBackspace = useCallback((selectedCell: CellPosition) => {
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