import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface GarlandGameProps {
  words: string[];
  themeWord: string;
  onComplete?: () => void;
}

export function GarlandGame({ words, themeWord, onComplete }: GarlandGameProps) {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');

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

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * 6 + colIndex;
    
    if (selectedCells.includes(cellIndex)) {
      // Deselect from this cell onwards
      const index = selectedCells.indexOf(cellIndex);
      setSelectedCells(selectedCells.slice(0, index));
      setCurrentWord(getCurrentWord(selectedCells.slice(0, index)));
    } else {
      const newSelectedCells = [...selectedCells, cellIndex];
      setSelectedCells(newSelectedCells);
      setCurrentWord(getCurrentWord(newSelectedCells));
    }
  };

  const getCurrentWord = (cells: number[]): string => {
    return cells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      return grid[row][col];
    }).join('');
  };

  const handleSubmitWord = () => {
    if (currentWord.length < 3) {
      toast.error('Word must be at least 3 letters long');
      return;
    }

    if (words.includes(currentWord) && !foundWords.includes(currentWord)) {
      setFoundWords([...foundWords, currentWord]);
      toast.success(`Found word: ${currentWord}!`);
      setSelectedCells([]);
      setCurrentWord('');

      if (foundWords.length + 1 === words.length) {
        toast.success('Congratulations! You found all the words!');
        onComplete?.();
      }
    } else if (foundWords.includes(currentWord)) {
      toast.error('Word already found!');
    } else {
      toast.error('Not a valid word!');
    }
    setSelectedCells([]);
    setCurrentWord('');
  };

  const isCellSelected = (rowIndex: number, colIndex: number) => {
    return selectedCells.includes(rowIndex * 6 + colIndex);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Theme Word: {themeWord}</h2>
        <p className="text-sm text-muted-foreground">
          Find words using adjacent letters
        </p>
      </div>

      <div className="grid gap-2">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((letter, colIndex) => (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-lg font-bold text-lg flex items-center justify-center
                  ${isCellSelected(rowIndex, colIndex)
                    ? 'bg-green-500 text-white'
                    : 'bg-white shadow-md hover:bg-gray-50'
                  }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {letter}
              </motion.button>
            ))}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="text-lg font-semibold">
            Current word: {currentWord}
          </div>
          <button
            onClick={handleSubmitWord}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit Word
          </button>
        </div>

        <div className="text-sm">
          Found words ({foundWords.length}/{words.length}):
          <div className="flex flex-wrap gap-2 mt-2">
            {foundWords.map((word, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full"
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