import { useState, useRef, useEffect } from 'react';

export function useGameTimer(isStarted: boolean, onComplete?: () => void) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
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

  const completeGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCompletionTime(elapsedTime);
    onComplete?.();
  };

  return {
    elapsedTime,
    completionTime,
    completeGame
  };
}