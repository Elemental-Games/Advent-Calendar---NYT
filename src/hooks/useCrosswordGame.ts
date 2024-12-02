import { useState, useRef, useEffect } from "react";

export function useCrosswordGame(answers: Record<string, string>, onComplete?: () => void) {
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showDown, setShowDown] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStarted) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted]);

  const handleStartGame = () => {
    setIsStarted(true);
    setShowStartDialog(false);
    setElapsedTime(0);
  };

  return {
    guesses,
    setGuesses,
    showStartDialog,
    setShowStartDialog,
    showCompletionDialog,
    setShowCompletionDialog,
    isStarted,
    elapsedTime,
    selectedCell,
    setSelectedCell,
    showDown,
    setShowDown,
    handleStartGame
  };
}