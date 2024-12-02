import { useState } from 'react';
import { useGridCalculations } from './useGridCalculations';
import type { GuessState } from '@/components/crossword/types';

export function useCrosswordInput(answers: Record<string, string>) {
  const [guesses, setGuesses] = useState<GuessState>({});
  const [validatedCells, setValidatedCells] = useState<Record<string, boolean>>({});
  const { calculatePosition } = useGridCalculations();

  const handleInputChange = (
    rowIndex: number, 
    colIndex: number, 
    value: string,
    isValidCell: (row: number, col: number) => boolean,
    getClueNumber: (row: number, col: number) => string
  ) => {
    if (!isValidCell(rowIndex, colIndex)) return;

    const clueNumber = getClueNumber(rowIndex, colIndex);
    if (!clueNumber) return;

    const { acrossPos, downPos } = calculatePosition(rowIndex, colIndex, isValidCell);
    
    const newGuesses = { ...guesses };
    const acrossKey = `a${clueNumber}`;
    const downKey = `d${clueNumber}`;

    // Initialize guess strings if they don't exist
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

    // Update both across and down values to maintain consistency
    newGuesses[acrossKey] = 
      newGuesses[acrossKey].slice(0, acrossPos) + 
      value.toUpperCase() + 
      newGuesses[acrossKey].slice(acrossPos + 1);
      
    newGuesses[downKey] = 
      newGuesses[downKey].slice(0, downPos) + 
      value.toUpperCase() + 
      newGuesses[downKey].slice(downPos + 1);

    console.log(`Updated guesses for cell ${rowIndex},${colIndex}:`, {
      across: newGuesses[acrossKey],
      down: newGuesses[downKey],
      pos: { acrossPos, downPos }
    });

    setGuesses(newGuesses);
  };

  const validateSubmission = (
    grid: string[][],
    isValidCell: (row: number, col: number) => boolean,
    getClueNumber: (row: number, col: number) => string
  ) => {
    const newValidatedCells: Record<string, boolean> = {};
    let incorrectCount = 0;
    let allCorrect = true;

    grid.forEach((row, rowIndex) => {
      row.forEach((correctValue, colIndex) => {
        if (!isValidCell(rowIndex, colIndex)) return;
        
        const clueNumber = getClueNumber(rowIndex, colIndex);
        if (!clueNumber) return;

        const { acrossPos } = calculatePosition(rowIndex, colIndex, isValidCell);
        const acrossKey = `a${clueNumber}`;
        const userValue = guesses[acrossKey]?.[acrossPos] || '';
        
        const cellKey = `${rowIndex}-${colIndex}`;
        const isCorrect = userValue.toUpperCase() === correctValue.toUpperCase();
        newValidatedCells[cellKey] = isCorrect;
        
        if (!isCorrect) {
          incorrectCount++;
          allCorrect = false;
        }
      });
    });

    setValidatedCells(newValidatedCells);
    return { allCorrect, incorrectCount };
  };

  return {
    guesses,
    setGuesses,
    validatedCells,
    handleInputChange,
    validateSubmission
  };
}