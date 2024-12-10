/**
 * Hook for managing crossword puzzle input state and validation.
 * Handles user input tracking, validation of submissions, and maintains
 * the state of guesses and validated cells across the puzzle grid.
 * Provides functions for checking answer correctness and managing feedback.
 */

import { useState } from 'react';
import { useGridCalculations } from './useGridCalculations';
import type { GuessState } from '@/components/crossword/types';

export function useCrosswordInput(answers: Record<string, string>) {
  const [guesses, setGuesses] = useState<GuessState>({});
  const [validatedCells, setValidatedCells] = useState<Record<string, boolean>>({});
  const { calculatePosition } = useGridCalculations();

  const resetGuesses = () => {
    console.log('Resetting all guesses to empty state');
    setGuesses({});
    setValidatedCells({});
  };

  const validateSubmission = (
    grid: string[][],
    isValidCell: (row: number, col: number) => boolean,
    getClueNumber: (row: number, col: number) => string
  ) => {
    const newValidatedCells: Record<string, boolean> = {};
    let incorrectCount = 0;
    let allCorrect = true;
    let totalChecked = 0;

    // Helper function to get the value for a cell from either direction
    const getCellValue = (rowIndex: number, colIndex: number): string => {
      let value = '';
      
      // Check down direction
      for (let row = rowIndex; row >= 0; row--) {
        const downClue = getClueNumber(row, colIndex);
        if (downClue) {
          let pos = 0;
          for (let r = row; r < rowIndex; r++) {
            if (isValidCell(r, colIndex)) pos++;
          }
          const downValue = guesses[`d${downClue}`]?.[pos];
          if (downValue && downValue !== ' ') {
            value = downValue;
            break;
          }
        }
      }

      // Check across direction if no down value found
      if (!value) {
        for (let col = colIndex; col >= 0; col--) {
          const acrossClue = getClueNumber(rowIndex, col);
          if (acrossClue) {
            let pos = 0;
            for (let c = col; c < colIndex; c++) {
              if (isValidCell(rowIndex, c)) pos++;
            }
            const acrossValue = guesses[`a${acrossClue}`]?.[pos];
            if (acrossValue && acrossValue !== ' ') {
              value = acrossValue;
              break;
            }
          }
        }
      }

      return value.toUpperCase();
    };

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
        if (!isValidCell(rowIndex, colIndex)) continue;

        totalChecked++;
        const correctValue = grid[rowIndex][colIndex].toUpperCase();
        const cellKey = `${rowIndex}-${colIndex}`;
        const value = getCellValue(rowIndex, colIndex);
        
        console.log(`Validating cell ${rowIndex},${colIndex}: Expected ${correctValue}, Got ${value}`);
        
        const isCorrect = value === correctValue;
        newValidatedCells[cellKey] = isCorrect;

        if (!isCorrect) {
          incorrectCount++;
          allCorrect = false;
          console.log(`Incorrect value at ${rowIndex},${colIndex}: Expected ${correctValue}, Got ${value}`);
        }
      }
    }

    console.log(`Validation complete - Checked ${totalChecked} cells, Found ${incorrectCount} incorrect`);
    setValidatedCells(newValidatedCells);
    return { allCorrect, incorrectCount };
  };

  return {
    guesses,
    setGuesses,
    validatedCells,
    validateSubmission,
    resetGuesses  // Add resetGuesses to the returned object
  };
}