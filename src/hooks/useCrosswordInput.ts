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

  const validateSubmission = (
    grid: string[][],
    isValidCell: (row: number, col: number) => boolean,
    getClueNumber: (row: number, col: number) => string
  ) => {
    const newValidatedCells: Record<string, boolean> = {};
    let incorrectCount = 0;
    let allCorrect = true;
    let totalChecked = 0;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
        if (!isValidCell(rowIndex, colIndex)) continue;

        totalChecked++;
        const correctValue = grid[rowIndex][colIndex];
        const cellKey = `${rowIndex}-${colIndex}`;
        
        // Get current cell value from any direction
        let value = '';
        for (let row = rowIndex; row >= 0; row--) {
          if (getClueNumber(row, colIndex)) {
            const downPos = rowIndex - row;
            const downValue = guesses[`d${getClueNumber(row, colIndex)}`]?.[downPos];
            if (downValue && downValue !== ' ') {
              value = downValue;
              break;
            }
          }
        }

        if (!value) {
          for (let col = colIndex; col >= 0; col--) {
            if (getClueNumber(rowIndex, col)) {
              const acrossPos = colIndex - col;
              const acrossValue = guesses[`a${getClueNumber(rowIndex, col)}`]?.[acrossPos];
              if (acrossValue && acrossValue !== ' ') {
                value = acrossValue;
                break;
              }
            }
          }
        }

        console.log(`Validating ${rowIndex},${colIndex}: Expected ${correctValue}, Got ${value}`);
        
        const isCorrect = value.toUpperCase() === correctValue.toUpperCase();
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
    validateSubmission
  };
}