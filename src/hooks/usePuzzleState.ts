import { useState, useCallback } from 'react';
import type { PuzzleState } from '@/types/puzzle';

export function usePuzzleState(puzzleId: string) {
  const [puzzleState, setPuzzleState] = useState<PuzzleState>(() => {
    const saved = localStorage.getItem(`puzzle_${puzzleId}`);
    return saved ? JSON.parse(saved) : { completed: false, completionTime: 0 };
  });

  const savePuzzleState = useCallback((state: PuzzleState) => {
    localStorage.setItem(`puzzle_${puzzleId}`, JSON.stringify(state));
    setPuzzleState(state);
  }, [puzzleId]);

  const resetPuzzle = useCallback(() => {
    const newState = { completed: false, completionTime: 0 };
    localStorage.setItem(`puzzle_${puzzleId}`, JSON.stringify(newState));
    setPuzzleState(newState);
  }, [puzzleId]);

  return { puzzleState, savePuzzleState, resetPuzzle };
}