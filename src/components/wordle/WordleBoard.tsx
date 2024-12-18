import React from 'react';

interface WordleBoardProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
  activeCell: number;
  isWinner: boolean;
}

export function WordleBoard({ guesses, currentGuess, solution, activeCell, isWinner }: WordleBoardProps) {
  console.log('WordleBoard rendering with guesses:', guesses);
  
  const getCellColor = (guess: string, index: number, letterIndex: number) => {
    const letter = guess[letterIndex];
    
    if (!letter) return 'bg-white border-2 border-red-300';
    
    if (solution[letterIndex] === letter) {
      return 'bg-green-500 text-white border-2 border-green-600';
    }
    
    if (solution.includes(letter)) {
      return 'bg-yellow-500 text-white border-2 border-yellow-600';
    }
    
    return 'bg-gray-500 text-white border-2 border-red-300';
  };

  const emptyCells = Array(5).fill('');

  return (
    <div className="grid gap-1">
      {Array(6).fill(null).map((_, i) => (
        <div key={i} className="flex gap-1 justify-center">
          {(guesses[i] || (i === guesses.length ? currentGuess : '')).split('').concat(emptyCells).slice(0, 5).map((letter, j) => (
            <div
              key={j}
              className={`
                w-14 h-14 flex items-center justify-center text-2xl font-bold rounded
                ${guesses[i] ? getCellColor(guesses[i], i, j) : 'bg-white border-2 border-red-300'}
                ${i === guesses.length && j === activeCell && !guesses[i] ? 'border-black' : ''}
                transition-colors duration-300
              `}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}