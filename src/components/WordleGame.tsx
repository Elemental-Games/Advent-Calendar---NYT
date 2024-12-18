import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { WordleGrid } from './wordle/WordleGrid';
import { WordleKeyboard } from './wordle/WordleKeyboard';
import { useWordle } from '@/hooks/useWordle';

interface WordleGameProps {
  solution: string;
  onComplete?: () => void;
  day: number;
}

export function WordleGame({ solution, onComplete, day }: WordleGameProps) {
  // Calculate puzzle number based on day
  const puzzleNumber = day === 13 ? 4 : 5; // Day 13 is #4, Day 17 is #5

  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    handleKeyboardClick,
  } = useWordle(solution);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      setTimeout(() => {
        setShowMessage(true);
        onComplete?.();
      }, 2000);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, onComplete]);

  useEffect(() => {
    if (turn > 5) {
      setTimeout(() => {
        toast.error(`Game Over! The word was: ${solution}`);
      }, 2000);
    }
  }, [turn, solution]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-2xl font-bold text-center text-red-700">
        Kringle #{puzzleNumber} 🎅
      </h3>

      <WordleGrid 
        guesses={guesses} 
        currentGuess={currentGuess} 
        turn={turn}
        solution={solution}
      />

      <WordleKeyboard 
        usedKeys={usedKeys}
        handleClick={handleKeyboardClick}
      />

      {showMessage && (
        <p className="text-green-600 font-bold text-xl animate-bounce">
          Well done! 🎄
        </p>
      )}
    </div>
  );
}