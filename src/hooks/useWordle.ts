import { useState } from 'react';

export function useWordle(solution: string) {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([...Array(6)]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState<Record<string, string>>({});

  const formatGuess = () => {
    return currentGuess.toUpperCase();
  };

  const addNewGuess = (formattedGuess: string) => {
    const newGuesses = [...guesses];
    newGuesses[turn] = formattedGuess;
    setGuesses(newGuesses);
    setTurn(prev => prev + 1);

    // Update used keys
    const newUsedKeys = { ...usedKeys };
    formattedGuess.split('').forEach((letter, i) => {
      if (letter === solution[i]) {
        newUsedKeys[letter] = 'correct';
      } else if (solution.includes(letter)) {
        newUsedKeys[letter] = 'present';
      } else {
        newUsedKeys[letter] = 'absent';
      }
    });
    setUsedKeys(newUsedKeys);

    // Check if guess is correct
    if (formattedGuess === solution.toUpperCase()) {
      setIsCorrect(true);
    }
  };

  const handleKeyup = (e: KeyboardEvent) => {
    if (isCorrect || turn > 5) return;

    if (e.key === 'Enter') {
      if (currentGuess.length !== 5) {
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
      setCurrentGuess('');
    }

    if (e.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(e.key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + e.key.toLowerCase());
      }
    }
  };

  const handleKeyboardClick = (key: string) => {
    if (isCorrect || turn > 5) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
      setCurrentGuess('');
      return;
    }

    if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
    handleKeyboardClick
  };
}