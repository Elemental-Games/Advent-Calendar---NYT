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
    
    // Helper function to find clue number and position for a cell
    const findClueAndPos = (row: number, col: number, isDown: boolean) => {
      let clue = null;
      let pos = 0;
      
      if (isDown) {
        for (let r = row; r >= 0; r--) {
          const num = getClueNumber(r, col);
          if (num) {
            clue = num;
            pos = 0;
            for (let r2 = r; r2 < row; r2++) {
              if (isValidCell(r2, col)) pos++;
            }
            break;
          }
        }
      } else {
        for (let c = col; c >= 0; c--) {
          const num = getClueNumber(row, c);
          if (num) {
            clue = num;
            pos = 0;
            for (let c2 = c; c2 < col; c2++) {
              if (isValidCell(row, c2)) pos++;
            }
            break;
          }
        }
      }
      
      return { clue, pos };
    };

    // Update across word if exists
    const { clue: acrossClue, pos: acrossPos } = findClueAndPos(rowIndex, colIndex, false);
    if (acrossClue) {
      const key = `a${acrossClue}`;
      if (!newGuesses[key]) {
        const length = Array(5).fill(null).filter((_, col) => isValidCell(rowIndex, col)).length;
        newGuesses[key] = ' '.repeat(length);
      }
      newGuesses[key] = newGuesses[key].slice(0, acrossPos) + value.toUpperCase() + newGuesses[key].slice(acrossPos + 1);
      console.log(`Updated across word ${key} at position ${acrossPos}: ${newGuesses[key]}`);
    }

    // Update down word if exists
    const { clue: downClue, pos: downPos } = findClueAndPos(rowIndex, colIndex, true);
    if (downClue) {
      const key = `d${downClue}`;
      if (!newGuesses[key]) {
        const length = Array(5).fill(null).filter((_, row) => isValidCell(row, colIndex)).length;
        newGuesses[key] = ' '.repeat(length);
      }
      newGuesses[key] = newGuesses[key].slice(0, downPos) + value.toUpperCase() + newGuesses[key].slice(downPos + 1);
      console.log(`Updated down word ${key} at position ${downPos}: ${newGuesses[key]}`);
    }

    setGuesses(newGuesses);

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