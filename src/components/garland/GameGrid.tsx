import React from 'react';
import { GridCell } from './GridCell';
import { Button } from "@/components/ui/button";

interface GameGridProps {
  grid: string[][];
  selectedCells: number[];
  foundWordsWithIndex: Array<{word: string, index: number}>;
  themeWord: string;
  handleCellClick: (rowIndex: number, colIndex: number) => void;
  handleSubmit: () => void;
  isLetterInFoundWord: (rowIndex: number, colIndex: number) => { found: boolean; wordIndex: number; isThemeWord: boolean };
}

export function GameGrid({
  grid,
  selectedCells,
  foundWordsWithIndex,
  themeWord,
  handleCellClick,
  handleSubmit,
  isLetterInFoundWord
}: GameGridProps) {
  return (
    <div className="space-y-4">
      <div 
        className="grid gap-2 relative touch-none select-none"
        style={{ touchAction: 'none' }}
      >
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
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  position={cellIndex}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-8"
          disabled={selectedCells.length < 3}
        >
          Submit Word
        </Button>
      </div>
    </div>
  );
}