/**
 * GameGrid Component
 * Displays the main game grid of letters where players can select words.
 * Handles mouse and touch interactions for word selection.
 * Manages the visual state of cells (selected, found, theme word).
 * Integrates with ConnectionLines for selection visualization.
 */
import React from 'react';
import { GridCell } from './GridCell';

interface GameGridProps {
  grid: string[][];
  selectedCells: number[];
  foundWordsWithIndex: Array<{word: string, index: number}>;
  themeWord: string;
  handleCellMouseDown: (rowIndex: number, colIndex: number) => void;
  handleCellMouseEnter: (rowIndex: number, colIndex: number) => void;
  handleMouseUp: () => void;
  isLetterInFoundWord: (rowIndex: number, colIndex: number) => { found: boolean; wordIndex: number; isThemeWord: boolean };
}

export function GameGrid({
  grid,
  selectedCells,
  foundWordsWithIndex,
  themeWord,
  handleCellMouseDown,
  handleCellMouseEnter,
  handleMouseUp,
  isLetterInFoundWord
}: GameGridProps) {
  return (
    <div 
      className="grid gap-2 relative touch-none select-none"
      style={{ touchAction: 'none' }}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
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
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
                selectionIndex={selectedCells.indexOf(cellIndex)}
                position={cellIndex}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}