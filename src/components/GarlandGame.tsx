import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GridCell } from './garland/GridCell';
import { generateUniqueColors } from '@/lib/garland-constants';
import { useFoundWordDisplay } from '@/hooks/useFoundWordDisplay';
import { useWordSelection } from '@/hooks/useWordSelection';

interface GarlandGameProps {
  words?: string[];
  themeWord?: string;
  onComplete?: () => void;
}

export function GarlandGame({ 
  words = ['santa', 'sleigh', 'cookies', 'mistletoe', 'frost', 'rudolph'],
  themeWord = 'christmas',
  onComplete 
}: GarlandGameProps) {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const { selectedCells, currentWord, handleCellMouseDown, handleCellMouseEnter, handleMouseUp } = 
    useWordSelection(words, foundWords, setFoundWords, themeWord, onComplete);

  const { isLetterInFoundWord } = useFoundWordDisplay(foundWords, themeWord);
  const uniqueColors = generateUniqueColors();

  const grid = [
    ['S', 'L', 'E', 'S', 'F', 'R'],
    ['H', 'G', 'I', 'A', 'S', 'O'],
    ['M', 'I', 'T', 'M', 'T', 'R'],
    ['S', 'T', 'L', 'S', 'O', 'U'],
    ['T', 'E', 'I', 'P', 'L', 'D'],
    ['O', 'E', 'R', 'H', 'E', 'S'],
    ['S', 'A', 'N', 'H', 'K', 'I'],
    ['A', 'T', 'C', 'O', 'O', 'C'],
  ];

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Garland #1</h2>
        <p className="text-sm text-muted-foreground">
          Theme: "Tis the Season"
        </p>
      </div>

      <div 
        className="grid gap-2 relative"
        onMouseLeave={handleMouseUp}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((letter, colIndex) => {
              const { found, wordIndex, isThemeWord } = isLetterInFoundWord(rowIndex, colIndex);
              const isSelected = selectedCells.includes(rowIndex * 6 + colIndex);
              const position = (rowIndex + 1) * 10 + (colIndex + 1);
              
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
                  selectionIndex={selectedCells.indexOf(rowIndex * 6 + colIndex)}
                  uniqueColor={uniqueColors[position]}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="text-sm">
          Found words ({foundWords.length}/{words.length}):
          <div className="flex flex-wrap gap-2 mt-2">
            {foundWords.map((word, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full ${
                  word.toLowerCase() === themeWord.toLowerCase()
                    ? 'bg-green-500 text-white border-2 border-red-500'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}