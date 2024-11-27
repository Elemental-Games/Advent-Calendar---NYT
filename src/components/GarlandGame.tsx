import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface GarlandGameProps {
  words: string[];
  themeWord: string;
  onComplete?: () => void;
}

const CHRISTMAS_COLORS = [
  'rgb(255, 0, 0)',    // Red
  'rgb(0, 255, 0)',    // Green
  'rgb(0, 0, 255)',    // Blue
  'rgb(255, 255, 0)',  // Yellow
  'rgb(255, 0, 255)',  // Purple
  'rgb(0, 255, 255)',  // Cyan
  'rgb(255, 165, 0)',  // Orange
  'rgb(255, 192, 203)', // Pink
];

export function GarlandGame({ words, themeWord, onComplete }: GarlandGameProps) {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

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
      
      // Check if cells are adjacent
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

  const getCellColor = (rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * 6 + colIndex;
    
    // Check if this cell is part of any found word
    for (let i = 0; i < foundWords.length; i++) {
      const word = foundWords[i];
      const wordIndexes: number[] = [];
      
      // Find all occurrences of this word in the grid
      for (let startRow = 0; startRow < grid.length; startRow++) {
        for (let startCol = 0; startCol < grid[0].length; startCol++) {
          const possibleIndexes = findWordIndexes(word, startRow, startCol);
          if (possibleIndexes.includes(cellIndex)) {
            if (word.toLowerCase() === themeWord.toLowerCase()) {
              return {
                bg: 'bg-green-500',
                text: 'text-white',
                border: 'border-red-500',
                found: true
              };
            }
            return {
              bg: `bg-[${CHRISTMAS_COLORS[i % CHRISTMAS_COLORS.length]}]`,
              text: 'text-white',
              border: 'border-yellow-300',
              found: true
            };
          }
        }
      }
    }

    // For selected but not found cells
    if (selectedCells.includes(cellIndex)) {
      return {
        bg: 'bg-green-500',
        text: 'text-white',
        border: 'border-transparent',
        found: false
      };
    }

    // Default state
    return {
      bg: 'bg-white',
      text: 'text-gray-900',
      border: 'border-transparent',
      found: false
    };
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
        <h2 className="text-xl font-bold">Theme Word: {themeWord}</h2>
        <p className="text-sm text-muted-foreground">
          Find words by clicking and dragging through adjacent letters
        </p>
      </div>

      <div 
        ref={gridRef}
        className="grid gap-2"
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
              const colors = getCellColor(rowIndex, colIndex);
              return (
                <motion.button
                  key={`${rowIndex}-${colIndex}`}
                  whileHover={{ scale: colors.found ? 1 : 1.05 }}
                  whileTap={{ scale: colors.found ? 1 : 0.95 }}
                  className={`w-10 h-10 rounded-lg font-bold text-lg flex items-center justify-center
                    border-2 transition-colors duration-300
                    ${colors.bg} ${colors.text} ${colors.border}
                    ${colors.found ? 'cursor-default' : 'cursor-pointer'}`}
                  onMouseDown={() => !colors.found && handleCellMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                  onTouchStart={() => !colors.found && handleCellMouseDown(rowIndex, colIndex)}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);
                    const cellElement = element?.closest('button');
                    if (cellElement) {
                      const [row, col] = cellElement.getAttribute('data-position')?.split('-').map(Number) || [];
                      if (typeof row === 'number' && typeof col === 'number') {
                        handleCellMouseEnter(row, col);
                      }
                    }
                  }}
                  data-position={`${rowIndex}-${colIndex}`}
                >
                  {letter}
                </motion.button>
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