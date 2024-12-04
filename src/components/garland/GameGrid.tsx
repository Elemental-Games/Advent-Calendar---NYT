import React from 'react';
import { GridCell } from './GridCell';

interface GameGridProps {
  grid: string[][];
  selectedCells: number[];
  foundWordsWithIndex: Array<{word: string, index: number}>;
  themeWord: string;
  onCellClick: (rowIndex: number, colIndex: number) => void;
  isLetterInFoundWord: (rowIndex: number, colIndex: number) => { found: boolean; wordIndex: number; isThemeWord: boolean };
}

export function GameGrid({
  grid,
  selectedCells,
  foundWordsWithIndex,
  themeWord,
  onCellClick,
  isLetterInFoundWord
}: GameGridProps) {
  console.log('GameGrid rendering with selectedCells:', selectedCells);
  
  return (
    <div className="grid gap-2 relative select-none">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((letter, colIndex) => {
            const { found, wordIndex, isThemeWord: isThemeWordCell } = isLetterInFoundWord(rowIndex, colIndex);
            const isSelected = selectedCells.includes(rowIndex * 6 + colIndex);
            const cellIndex = rowIndex * 6 + colIndex;
            
            return (
              <GridCell
                key={`${rowIndex}-${colIndex}`}
                letter={letter}
                isSelected={isSelected}
                isFound={found}
                foundWordIndex={wordIndex}
                isThemeWord={isThemeWordCell}
                onCellClick={() => onCellClick(rowIndex, colIndex)}
                position={cellIndex}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}