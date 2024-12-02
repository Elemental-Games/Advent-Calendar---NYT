import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import type { GuessState, CellPosition } from "@/components/crossword/types";

export function useCrosswordGame(answers: Record<string, string>, onComplete?: () => void) {
  const [guesses, setGuesses] = useState<GuessState>({});
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
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

  const handleSubmit = () => {
    const allFilled = Object.keys(answers).every(
      key => guesses[key]?.length === answers[key].length
    );

    if (!allFilled) {
      toast.error("Please fill in all boxes before submitting!");
      return;
    }

    let incorrectCount = 0;
    Object.entries(answers).forEach(([key, answer]) => {
      if (guesses[key]?.toUpperCase() !== answer.toUpperCase()) {
        incorrectCount++;
      }
    });

    if (incorrectCount > 0) {
      toast.error(`${incorrectCount} answer${incorrectCount > 1 ? 's are' : ' is'} incorrect. Keep trying!`);
    } else {
      setCompletionTime(elapsedTime);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast.success("Congratulations! You've completed the Mini FrostWord!");
      onComplete?.();
    }
  };

  return {
    guesses,
    setGuesses,
    showStartDialog,
    setShowStartDialog,
    isStarted,
    elapsedTime,
    selectedCell,
    setSelectedCell,
    showDown,
    setShowDown,
    handleStartGame,
    handleSubmit
  };
}