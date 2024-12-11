import React, { useState, useEffect } from 'react';
import { WordleBoard } from './wordle/WordleBoard';
import { WordleInput } from './wordle/WordleInput';
import { WordleKeyboard } from './wordle/WordleKeyboard';
import { WordleCompletionDialog } from './wordle/WordleCompletionDialog';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface WordleGameProps {
  solution: string;
  onComplete?: () => void;
  day: number;
}

export function WordleGame({ solution, onComplete, day }: WordleGameProps) {
  console.log('WordleGame rendering with solution:', solution);
  
  const [guesses, setGuesses] = useState<string[]>(() => {
    const saved = localStorage.getItem(`kringle_${day}`);
    return saved ? JSON.parse(saved).guesses : [];
  });
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(() => {
    const saved = localStorage.getItem(`kringle_${day}`);
    return saved ? JSON.parse(saved).isGameOver : false;
  });
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
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

  const saveGameState = (newGuesses: string[], newIsGameOver: boolean) => {
    localStorage.setItem(`kringle_${day}`, JSON.stringify({
      guesses: newGuesses,
      isGameOver: newIsGameOver
    }));
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
      saveGameState(newGuesses, true);
      onComplete?.();
      setShowCompletionDialog(true);
    } else if (newGuesses.length >= 6) {
      setIsGameOver(true);
      saveGameState(newGuesses, true);
      toast.error(`Game Over! The word was ${solution}`);
    } else {
      saveGameState(newGuesses, false);
    }
  };

  const handleReset = () => {
    console.log('Resetting Kringle puzzle for day:', day);
    localStorage.removeItem(`kringle_${day}`);
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
    setActiveCell(0);
    setShowCompletionDialog(false);
    toast.success('Puzzle reset successfully!');
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <WordleBoard 
        guesses={guesses} 
        currentGuess={currentGuess} 
        solution={solution}
        activeCell={activeCell}
        isWinner={isGameOver && guesses[guesses.length - 1] === solution}
      />
      <WordleInput 
        currentGuess={currentGuess}
        onInput={setCurrentGuess}
        isGameOver={isGameOver}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
      />
      <WordleKeyboard
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
        usedLetters={usedLetters}
      />
      {isGameOver && (
        <Button 
          onClick={handleReset}
          variant="outline"
          className="mt-4 text-red-600 border-red-600 hover:bg-red-50"
        >
          Reset Puzzle
        </Button>
      )}
      <WordleCompletionDialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
        day={day}
      />
    </div>
  );
}