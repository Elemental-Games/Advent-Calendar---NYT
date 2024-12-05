/**
 * Hook for managing the crossword grid state and operations.
 * Handles grid initialization, cell validation, clue numbering,
 * and navigation between cells.
 */

import { useRef } from "react";
import type { CellPosition } from "@/components/crossword/types";

export function useCrosswordGrid(puzzleGrid: string[][]) {
  console.log('Initializing crossword grid with puzzle:', puzzleGrid);
  
  const cellRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(5).fill(null).map(() => Array(5).fill(null))
  );

  const isValidCell = (row: number, col: number) => {
    if (row < 0 || row >= 5 || col < 0 || col >= 5) {
      console.log(`Invalid cell coordinates: row=${row}, col=${col}`);
      return false;
    }
    const isValid = puzzleGrid[row][col] !== " ";
    console.log(`Checking cell validity at [${row},${col}]: ${isValid}`);
    return isValid;
  };

  const getClueNumber = (rowIndex: number, colIndex: number) => {
    console.log(`Getting clue number for cell [${rowIndex},${colIndex}]`);
    
    if (!isValidCell(rowIndex, colIndex)) {
      console.log('Cell is not valid, returning empty clue number');
      return "";
    }

    const startsAcross = isValidCell(rowIndex, colIndex) && 
      (colIndex === 0 || !isValidCell(rowIndex, colIndex - 1));
    const startsDown = isValidCell(rowIndex, colIndex) && 
      (rowIndex === 0 || !isValidCell(rowIndex - 1, colIndex));

    console.log(`Cell starts: across=${startsAcross}, down=${startsDown}`);

    if (!startsAcross && !startsDown) {
      console.log('Cell does not start any words');
      return "";
    }

    let clueNumber = 1;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (row === rowIndex && col === colIndex) {
          console.log(`Found clue number: ${clueNumber}`);
          return clueNumber.toString();
        }
        
        const cellStartsAcross = isValidCell(row, col) && 
          (col === 0 || !isValidCell(row, col - 1));
        const cellStartsDown = isValidCell(row, col) && 
          (row === 0 || !isValidCell(row - 1, col));
        
        if (cellStartsAcross || cellStartsDown) clueNumber++;
      }
    }
    return clueNumber.toString();
  };

  const findNextCell = (
    currentRow: number,
    currentCol: number,
    showDown: boolean
  ): CellPosition | null => {
    console.log(`Finding next cell from [${currentRow},${currentCol}], moving ${showDown ? 'down' : 'right'}`);
    
    if (showDown) {
      for (let row = currentRow + 1; row < 5; row++) {
        if (isValidCell(row, currentCol)) {
          console.log(`Found next cell: [${row},${currentCol}]`);
          return { row, col: currentCol };
        }
      }
    } else {
      for (let col = currentCol + 1; col < 5; col++) {
        if (isValidCell(currentRow, col)) {
          console.log(`Found next cell: [${currentRow},${col}]`);
          return { row: currentRow, col };
        }
      }
    }
    console.log('No next cell found');
    return null;
  };

  const findPreviousCell = (
    currentRow: number,
    currentCol: number,
    showDown: boolean
  ): CellPosition | null => {
    console.log(`Finding previous cell from [${currentRow},${currentCol}], moving ${showDown ? 'up' : 'left'}`);
    
    if (showDown) {
      for (let row = currentRow - 1; row >= 0; row--) {
        if (isValidCell(row, currentCol)) {
          console.log(`Found previous cell: [${row},${currentCol}]`);
          return { row, col: currentCol };
        }
      }
    } else {
      for (let col = currentCol - 1; col >= 0; col--) {
        if (isValidCell(currentRow, col)) {
          console.log(`Found previous cell: [${currentRow},${col}]`);
          return { row: currentRow, col };
        }
      }
    }
    console.log('No previous cell found');
    return null;
  };

  return {
    grid: puzzleGrid,
    cellRefs,
    isValidCell,
    getClueNumber,
    findNextCell,
    findPreviousCell
  };
}