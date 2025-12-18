import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface WordleBoardProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
  activeCell: number;
  isWinner: boolean;
  getLetterStates: (guess: string) => string[];
}

export function WordleBoard({ 
  guesses, 
  currentGuess, 
  solution,
  activeCell,
  isWinner,
  getLetterStates
}: WordleBoardProps) {
  console.log('WordleBoard rendering with guesses:', guesses);

  const empties = Array(6 - guesses.length - 1).fill('');
  const currentGuessArray = currentGuess.split('').concat(Array(5 - currentGuess.length).fill(''));

  return (
    <div className="grid grid-rows-6 gap-1">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-1">
          {guess.split('').map((letter, j) => {
            const states = getLetterStates(guess);
            const state = states[j];
            return (
              <motion.div
                key={j}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={cn(
                  "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded",
                  state === 'correct' && "bg-green-500 border-green-600 text-white",
                  state === 'present' && "bg-yellow-500 border-yellow-600 text-white",
                  state === 'absent' && "bg-gray-500 border-gray-600 text-white"
                )}
              >
                {letter}
              </motion.div>
            );
          })}
        </div>
      ))}
      
      {guesses.length < 6 && (
        <div className="grid grid-cols-5 gap-1">
          {currentGuessArray.map((letter, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={cn(
                "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded",
                letter ? "border-gray-400" : "border-gray-200",
                i === activeCell && "border-blue-500"
              )}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      )}

      {empties.map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-1">
          {Array(5).fill('').map((_, j) => (
            <div
              key={j}
              className="w-14 h-14 border-2 border-gray-200 flex items-center justify-center text-2xl font-bold rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
}