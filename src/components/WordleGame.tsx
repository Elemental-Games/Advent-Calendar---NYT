import React, { useState, useEffect } from 'react';
import { WordleBoard } from './wordle/WordleBoard';
import { WordleInput } from './wordle/WordleInput';
import { WordleKeyboard } from './wordle/WordleKeyboard';
import { toast } from 'sonner';

interface WordleGameProps {
  solution: string;
  onComplete?: () => void;
}

export function WordleGame({ solution, onComplete }: WordleGameProps) {
  console.log('WordleGame rendering with solution:', solution);
  
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [activeCell, setActiveCell] = useState(0);

  const usedLetters = {
    correct: [] as string[],
    present: [] as string[],
    absent: [] as string[]
  };

  // Calculate used letters
  guesses.forEach(guess => {
    guess.split('').forEach((letter, i) => {
      if (solution[i] === letter) {
        usedLetters.correct.push(letter);
      } else if (solution.includes(letter)) {
        usedLetters.present.push(letter);
      } else {
        usedLetters.absent.push(letter);
      }
    });
  });

  const handleKeyPress = (key: string) => {
    if (isGameOver) return;
    if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
      setActiveCell(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBackspace = () => {
    if (isGameOver) return;
    setCurrentGuess(prev => prev.slice(0, -1));
    setActiveCell(prev => Math.max(prev - 1, 0));
  };

  const handleEnter = () => {
    if (isGameOver) return;
    if (currentGuess.length !== 5) {
      toast.error('Word must be 5 letters long');
      return;
    }
    
    const newGuesses = [...guesses, currentGuess.toUpperCase()];
    setGuesses(newGuesses);
    setCurrentGuess('');
    setActiveCell(0);

    const isWinner = currentGuess.toUpperCase() === solution;
    if (isWinner) {
      setIsGameOver(true);
      onComplete?.();
      toast.success('Congratulations! You won!');
    } else if (newGuesses.length >= 6) {
      setIsGameOver(true);
      toast.error(`Game Over! The word was ${solution}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      
      if (e.key === 'Enter') {
        handleEnter();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (/^[A-Za-z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, isGameOver]);

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <WordleBoard 
        guesses={guesses} 
        currentGuess={currentGuess} 
        solution={solution}
        activeCell={activeCell}
        isWinner={isGameOver && currentGuess.toUpperCase() === solution}
      />
      <WordleInput 
        currentGuess={currentGuess}
        isGameOver={isGameOver}
        onInput={setCurrentGuess}
      />
      <WordleKeyboard
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
        usedLetters={usedLetters}
      />
    </div>
  );
}