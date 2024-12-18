import React from 'react';

interface WordleGridProps {
  guesses: string[];
  currentGuess: string;
  turn: number;
  solution: string;
}

export function WordleGrid({ guesses, currentGuess, turn, solution }: WordleGridProps) {
  const rows = Array(6).fill(null);

  return (
    <div className="grid grid-rows-6 gap-1">
      {rows.map((_, rowIndex) => {
        // Current guess row
        if (rowIndex === turn && currentGuess) {
          const letters = currentGuess.padEnd(5, ' ').split('');
          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-1">
              {letters.map((letter, colIndex) => (
                <div
                  key={colIndex}
                  className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center text-xl font-bold uppercase"
                >
                  {letter}
                </div>
              ))}
            </div>
          );
        }

        // Past guesses
        if (rowIndex < turn) {
          const guess = guesses[rowIndex];
          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-1">
              {guess.split('').map((letter, colIndex) => {
                let bgColor = 'bg-gray-400'; // wrong
                if (letter === solution[colIndex]) {
                  bgColor = 'bg-green-500'; // correct position
                } else if (solution.includes(letter)) {
                  bgColor = 'bg-yellow-500'; // wrong position
                }
                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 ${bgColor} flex items-center justify-center text-xl font-bold text-white uppercase`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        }

        // Empty rows
        return (
          <div key={rowIndex} className="grid grid-cols-5 gap-1">
            {Array(5).fill(null).map((_, colIndex) => (
              <div
                key={colIndex}
                className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center text-xl font-bold"
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}