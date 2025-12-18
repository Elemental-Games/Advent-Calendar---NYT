import { useState, useRef } from "react";
import { usePuzzleState } from "@/hooks/usePuzzleState";
import { puzzleData } from "@/lib/puzzle-data";
import type { CrosswordPuzzle } from "@/lib/puzzle-types";

export function useGameState(day: number, answers: Record<string, string>, onComplete?: () => void) {
  const puzzleId = `crossword_${day}`;
  const { puzzleState, savePuzzleState, resetPuzzle } = usePuzzleState(puzzleId);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [showIncorrectDialog, setShowIncorrectDialog] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showDown, setShowDown] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartGame = () => {
    setIsStarted(true);
    setShowStartDialog(false);
    setElapsedTime(0);
  };

  return {
    puzzleState,
    savePuzzleState,
    resetPuzzle,
    showStartDialog,
    setShowStartDialog,
    showCompletionDialog,
    setShowCompletionDialog,
    showIncorrectDialog,
    setShowIncorrectDialog,
    incorrectCount,
    setIncorrectCount,
    isStarted,
    elapsedTime,
    setElapsedTime,
    selectedCell,
    setSelectedCell,
    showDown,
    setShowDown,
    handleStartGame,
    timerRef
  };
}