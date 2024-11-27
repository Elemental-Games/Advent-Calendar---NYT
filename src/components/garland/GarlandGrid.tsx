import React from 'react';
import { motion } from 'framer-motion';

interface GarlandGridProps {
  themeWord: string;
  currentPath: number[];
  setCurrentPath: (path: number[]) => void;
  onPathComplete: (word: string) => void;
}

export function GarlandGrid({ themeWord, currentPath, setCurrentPath, onPathComplete }: GarlandGridProps) {
  const gridSize = { rows: 6, cols: 8 };
  const letters = generateGrid(themeWord, gridSize);

  const handleCellMouseDown = (index: number) => {
    setCurrentPath([index]);
  };

  const handleCellMouseEnter = (index: number) => {
    if (currentPath.length > 0 && isAdjacent(index, currentPath[currentPath.length - 1], gridSize.cols)) {
      if (!currentPath.includes(index)) {
        setCurrentPath([...currentPath, index]);
      }
    }
  };

  const handleMouseUp = () => {
    const word = currentPath.map(index => letters[index]).join('');
    onPathComplete(word);
  };

  return (
    <div 
      className="select-none touch-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="grid grid-cols-8 gap-1 bg-white/5 backdrop-blur-xl p-4 rounded-lg shadow-inner"
        style={{ touchAction: 'none' }}
      >
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            className={`
              aspect-square rounded-lg flex items-center justify-center text-lg font-bold cursor-pointer
              ${currentPath.includes(index) ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-red-100'}
              transition-colors duration-150
            `}
            onMouseDown={() => handleCellMouseDown(index)}
            onMouseEnter={() => handleCellMouseEnter(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {letter}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function generateGrid(themeWord: string, size: { rows: number; cols: number }): string[] {
  const totalCells = size.rows * size.cols;
  const letters = Array(totalCells).fill('');
  
  // Place the theme word randomly
  const startPos = Math.floor(Math.random() * (totalCells - themeWord.length));
  for (let i = 0; i < themeWord.length; i++) {
    letters[startPos + i] = themeWord[i];
  }
  
  // Fill remaining cells with random letters
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < totalCells; i++) {
    if (!letters[i]) {
      letters[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }
  
  return letters;
}

function isAdjacent(index1: number, index2: number, cols: number): boolean {
  const row1 = Math.floor(index1 / cols);
  const col1 = index1 % cols;
  const row2 = Math.floor(index2 / cols);
  const col2 = index2 % cols;
  
  return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
}