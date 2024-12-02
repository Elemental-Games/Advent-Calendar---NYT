import { useState } from 'react';
import type { GuessState, CellPosition } from '@/components/crossword/types';

export function useCrosswordInput(answers: Record<string, string>) {
  const [guesses, setGuesses] = useState<GuessState>({});
  const [validatedCells, setValidatedCells] = useState<Record<string, boolean>>({});

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

    const newGuesses = { ...guesses };
    const acrossKey = `a${clueNumber}`;
    const downKey = `d${clueNumber}`;

    // Initialize or get current guesses
    if (!newGuesses[acrossKey]) {
      const acrossLength = Array(5).fill(null)
        .filter((_, col) => isValidCell(rowIndex, col)).length;
      newGuesses[acrossKey] = ' '.repeat(acrossLength);
    }
    
    if (!newGuesses[downKey]) {
      const downLength = Array(5).fill(null)
        .filter((_, row) => isValidCell(row, colIndex)).length;
      newGuesses[downKey] = ' '.repeat(downLength);
    }

    // Calculate positions
    let acrossPos = 0;
    let downPos = 0;

    for (let col = 0; col < colIndex; col++) {
      if (isValidCell(rowIndex, col)) acrossPos++;
    }

    for (let row = 0; row < rowIndex; row++) {
      if (isValidCell(row, colIndex)) downPos++;
    }

    // Update guesses
    newGuesses[acrossKey] = 
      newGuesses[acrossKey].slice(0, acrossPos) + 
      value.toUpperCase() + 
      newGuesses[acrossKey].slice(acrossPos + 1);
      
    newGuesses[downKey] = 
      newGuesses[downKey].slice(0, downPos) + 
      value.toUpperCase() + 
      newGuesses[downKey].slice(downPos + 1);

    setGuesses(newGuesses);
    console.log(`Updated cell value at ${rowIndex},${colIndex} to ${value}`);
  };

  const validateSubmission = (
    grid: string[][],
    isValidCell: (row: number, col: number) => boolean,
    getClueNumber: (row: number, col: number) => string
  ) => {
    const newValidatedCells: Record<string, boolean> = {};
    let allCorrect = true;

    grid.forEach((row, rowIndex) => {
      row.forEach((correctValue, colIndex) => {
        if (!isValidCell(rowIndex, colIndex)) return;
        
        const clueNumber = getClueNumber(rowIndex, colIndex);
        if (!clueNumber) return;

        const cellKey = `${rowIndex}-${colIndex}`;
        const acrossKey = `a${clueNumber}`;
        const downKey = `d${clueNumber}`;
        
        let acrossPos = 0;
        for (let col = 0; col < colIndex; col++) {
          if (isValidCell(rowIndex, col)) acrossPos++;
        }
        
        const userValue = guesses[acrossKey]?.[acrossPos] || '';
        const isCorrect = userValue.toUpperCase() === correctValue.toUpperCase();
        newValidatedCells[cellKey] = isCorrect;
        
        if (!isCorrect) {
          allCorrect = false;
        }
      });
    });

    setValidatedCells(newValidatedCells);
    return allCorrect;
  };

  return {
    guesses,
    setGuesses,
    validatedCells,
    setValidatedCells,
    handleInputChange,
    validateSubmission
  };
}