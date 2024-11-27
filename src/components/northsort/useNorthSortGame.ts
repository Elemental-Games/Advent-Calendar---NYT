import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { savePuzzleState, getPuzzleState } from '@/lib/game-state';
import { checkNearMatch, findMatchingGroup, getCompletedWords, getRemainingWords } from './NorthSortLogic';

interface GameState {
  completedGroups: string[];
  gameOver: boolean;
  remainingAttempts: number;
  showCongrats: boolean;
}

export const useNorthSortGame = (day: number, groups: Array<{ category: string; color: string; words: string[] }>, onComplete?: () => void) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [completedGroups, setCompletedGroups] = useState<string[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(4);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const savedState = getPuzzleState(day);
    if (savedState) {
      setCompletedGroups(savedState.completedGroups || []);
      setGameOver(savedState.gameOver || false);
      setRemainingAttempts(savedState.remainingAttempts || 4);
      if (savedState.showCongrats) {
        setShowCongrats(true);
        onComplete?.();
      }
    }
  }, [day, onComplete]);

  useEffect(() => {
    const state: GameState = {
      completedGroups,
      gameOver,
      remainingAttempts,
      showCongrats
    };
    savePuzzleState(day, state);
  }, [completedGroups, gameOver, remainingAttempts, showCongrats, day]);

  const allWords = groups.flatMap(group => group.words);
  const completedWords = getCompletedWords(completedGroups, groups);
  const remainingWords = getRemainingWords(allWords, completedWords);

  console.log('Game State:', {
    completedGroups,
    completedWords,
    remainingWords,
    selectedWords
  });

  const handleWordClick = (word: string) => {
    if (gameOver) return;
    
    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) {
      toast.error("Please select exactly 4 words");
      return;
    }

    const matchingGroup = findMatchingGroup(selectedWords, groups);

    if (matchingGroup) {
      setCompletedGroups(prev => [...prev, matchingGroup.category]);
      setSelectedWords([]);
      
      if (completedGroups.length + 1 === groups.length) {
        setShowCongrats(true);
        onComplete?.();
      } else {
        toast.success("Correct group!");
      }
    } else {
      const isNearMatch = checkNearMatch(selectedWords, groups);
      if (isNearMatch) {
        toast.error("Almost there! You're just one word away from a correct group!");
      } else {
        toast.error("These words don't form a group. Try again!");
      }
      
      setRemainingAttempts(prev => prev - 1);
      if (remainingAttempts <= 1) {
        setGameOver(true);
        revealGroups();
      }
      setSelectedWords([]);
    }
  };

  const revealGroups = () => {
    let currentIndex = 0;
    const revealNextGroup = () => {
      if (currentIndex < groups.length) {
        const nextGroup = groups[currentIndex];
        if (!completedGroups.includes(nextGroup.category)) {
          setCompletedGroups(prev => [...prev, nextGroup.category]);
        }
        currentIndex++;
        if (currentIndex < groups.length) {
          setTimeout(revealNextGroup, 2000);
        }
      }
    };
    revealNextGroup();
  };

  return {
    selectedWords,
    completedGroups,
    showCongrats,
    setShowCongrats,
    remainingAttempts,
    gameOver,
    remainingWords,
    handleWordClick,
    handleSubmit
  };
};