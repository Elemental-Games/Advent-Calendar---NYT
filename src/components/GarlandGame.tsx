import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GridCell } from './garland/GridCell';
import { getRandomChristmasColor } from '@/lib/garland-constants';

interface GarlandGameProps {
  words: string[];
  themeWord: string;
  onComplete?: () => void;
}

export function GarlandGame({ words, themeWord, onComplete }: GarlandGameProps) {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

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

  const handleCellMouseDown = (rowIndex: number, colIndex: number) => {
    if (!isWordFound(getCurrentWord([rowIndex * 6 + colIndex]))) {
      setIsDragging(true);
      setSelectedCells([rowIndex * 6 + colIndex]);
      setCurrentWord(getCurrentWord([rowIndex * 6 + colIndex]));
    }
  };

  const handleCellMouseEnter = (rowIndex: number, colIndex: number) => {
    if (isDragging && !isWordFound(getCurrentWord([...selectedCells, rowIndex * 6 + colIndex]))) {
      const newCell = rowIndex * 6 + colIndex;
      const lastCell = selectedCells[selectedCells.length - 1];
      
      const lastRow = Math.floor(lastCell / 6);
      const lastCol = lastCell % 6;
      const isAdjacent = Math.abs(rowIndex - lastRow) <= 1 && Math.abs(colIndex - lastCol) <= 1;
      
      if (isAdjacent && !selectedCells.includes(newCell)) {
        const newSelectedCells = [...selectedCells, newCell];
        setSelectedCells(newSelectedCells);
        setCurrentWord(getCurrentWord(newSelectedCells));
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      handleSubmitWord();
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        handleSubmitWord();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, selectedCells]);

  const getCurrentWord = (cells: number[]): string => {
    return cells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      return grid[row][col];
    }).join('');
  };

  const isWordFound = (word: string): boolean => {
    return foundWords.includes(word);
  };

  const handleSubmitWord = () => {
    const word = currentWord;
    
    if (word.length < 3) {
      setSelectedCells([]);
      setCurrentWord('');
      return;
    }

    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      if (word.toLowerCase() === themeWord.toLowerCase()) {
        toast.success("Congratulations! You found the theme word!");
      } else {
        toast.success(`Found word: ${word}!`);
      }

      if (foundWords.length + 1 === words.length) {
        toast.success('Congratulations! You found all the words!');
        onComplete?.();
      }
    }
    setSelectedCells([]);
    setCurrentWord('');
  };

  const isLetterInFoundWord = (rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * 6 + colIndex;
    
    for (let i = 0; i < foundWords.length; i++) {
      const word = foundWords[i];
      const wordIndexes = findWordIndexes(word, rowIndex, colIndex);
      if (wordIndexes.includes(cellIndex)) {
        return { found: true, wordIndex: i, isThemeWord: word.toLowerCase() === themeWord.toLowerCase() };
      }
    }
    
    return { found: false, wordIndex: -1, isThemeWord: false };
  };

  const findWordIndexes = (word: string, startRow: number, startCol: number): number[] => {
    const indexes: number[] = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of directions) {
      let found = true;
      const tempIndexes: number[] = [];
      
      for (let i = 0; i < word.length; i++) {
        const row = startRow + i * dx;
        const col = startCol + i * dy;
        
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length ||
            grid[row][col] !== word[i]) {
          found = false;
          break;
        }
        tempIndexes.push(row * 6 + col);
      }
      
      if (found) {
        return tempIndexes;
      }
    }
    
    return [];
  };

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
        onMouseLeave={() => {
          if (isDragging) {
            setIsDragging(false);
            handleSubmitWord();
          }
        }}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((letter, colIndex) => {
              const { found, wordIndex, isThemeWord } = isLetterInFoundWord(rowIndex, colIndex);
              const isSelected = selectedCells.includes(rowIndex * 6 + colIndex);
              
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