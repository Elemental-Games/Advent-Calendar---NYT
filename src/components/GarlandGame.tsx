import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { GarlandGrid } from './garland/GarlandGrid';
import { GarlandWordList } from './garland/GarlandWordList';
import { savePuzzleState, getPuzzleState } from '@/lib/game-state';

interface GarlandGameProps {
  words: string[];
  themeWord: string;
  onComplete?: () => void;
  day: number;
}

export function GarlandGame({ words, themeWord, onComplete, day }: GarlandGameProps) {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<number[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);

  // Load saved state
  useEffect(() => {
    const savedState = getPuzzleState(day);
    if (savedState) {
      setFoundWords(savedState.foundWords || []);
      if (savedState.completed) {
        setShowCongrats(true);
        onComplete?.();
      }
    }
  }, [day, onComplete]);

  // Save state when it changes
  useEffect(() => {
    savePuzzleState(day, {
      foundWords,
      completed: foundWords.length === words.length
    });
  }, [foundWords, words.length, day]);

  const handlePathComplete = (word: string) => {
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords(prev => {
        const newFoundWords = [...prev, word];
        if (newFoundWords.length === words.length) {
          setShowCongrats(true);
          onComplete?.();
        }
        return newFoundWords;
      });
      toast.success(`Found "${word}"!`);
    }
    setCurrentPath([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Theme Word: {themeWord}</h3>
        <span className="text-sm text-gray-600">
          Found {foundWords.length} of {words.length} words
        </span>
      </div>

      <GarlandGrid
        themeWord={themeWord}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        onPathComplete={handlePathComplete}
      />

      <GarlandWordList words={words} foundWords={foundWords} />
    </div>
  );
}