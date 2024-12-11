import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { savePuzzleState, getPuzzleState } from "@/lib/game-state";
import { PuzzleState } from "@/types/puzzle";

interface Group {
  category: string;
  words: string[];
}

export function useNorthSortGame(day: number, groups: Array<{ category: string; words: string[] }>, onComplete?: () => void) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [completedGroups, setCompletedGroups] = useState<string[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(4);
  const [gameOver, setGameOver] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const savedState = getPuzzleState(day);
    if (savedState) {
      setCompletedGroups(savedState.completedGroups || []);
      setGameOver(savedState.gameOver || false);
      setRemainingAttempts(savedState.remainingAttempts || 4);
      if (savedState.completed) {
        console.log('Loading completed state:', savedState);
        setCompletedGroups(groups.map(g => g.category));
        setGameOver(true);
        onComplete?.();
      }
    }
  }, [day, groups, onComplete]);

  // Save state whenever it changes
  useEffect(() => {
    const state: PuzzleState = {
      completed: completedGroups.length === groups.length,
      completedGroups,
      gameOver,
      remainingAttempts,
      showCongrats
    };
    savePuzzleState(day, state);
  }, [completedGroups, gameOver, remainingAttempts, showCongrats, day, groups.length]);

  const checkNearMatch = useCallback((words: string[]) => {
    for (const group of groups) {
      const matchingWords = words.filter(word => 
        group.words.includes(word)
      );
      if (matchingWords.length === 3) {
        return true;
      }
    }
    return false;
  }, [groups]);

  const revealGroups = useCallback(() => {
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
  }, [groups, completedGroups]);

  return {
    selectedWords,
    setSelectedWords,
    completedGroups,
    setCompletedGroups,
    showCongrats,
    setShowCongrats,
    remainingAttempts,
    setRemainingAttempts,
    gameOver,
    setGameOver,
    checkNearMatch,
    revealGroups
  };
}
