import React from 'react';
import { GridCell } from './GridCell';
import { ConnectionLines } from './ConnectionLines';

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
  
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    console.log('Cell clicked at:', rowIndex, colIndex);
    const { found } = isLetterInFoundWord(rowIndex, colIndex);
    if (!found) {
      onCellClick(rowIndex, colIndex);
    } else {
      console.log('Ignoring click on found letter');
    }
  };

  return (
    <div className="grid gap-1 md:gap-2 relative select-none max-w-[360px] mx-auto">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 md:gap-2 justify-center">
          {row.map((letter, colIndex) => {
            const { found, wordIndex, isThemeWord } = isLetterInFoundWord(rowIndex, colIndex);
            const isSelected = selectedCells.includes(rowIndex * 6 + colIndex);
            const cellIndex = rowIndex * 6 + colIndex;
            
            return (
              <GridCell
                key={`${rowIndex}-${colIndex}`}
                letter={letter}
                isSelected={isSelected}
                isFound={found}
                foundWordIndex={wordIndex}
                isThemeWord={isThemeWord}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                position={cellIndex}
              />
            );
          })}
        </div>
      ))}
      <ConnectionLines selectedCells={selectedCells} gridWidth={6} />
    </div>
  );
}