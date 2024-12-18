import React, { useState, useEffect } from 'react';
import { CrosswordGrid } from './crossword/CrosswordGrid';
import { CrosswordHeader } from './crossword/CrosswordHeader';
import { CrosswordClues } from './crossword/CrosswordClues';
import { CrosswordControls } from './crossword/CrosswordControls';
import { CrosswordProvider } from '@/contexts/CrosswordContext';
import { savePuzzleState } from '@/lib/game-state';

interface CrosswordGameProps {
  across: Record<string, string>;
  down: Record<string, string>;
  answers: Record<string, string>;
  onComplete?: () => void;
  day: number;
  isCompleted?: boolean;
}

export function CrosswordGame({ across, down, answers, onComplete, day, isCompleted }: CrosswordGameProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(!isCompleted);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleComplete = () => {
    setIsActive(false);
    onComplete?.();
    savePuzzleState(day, { completed: true });
  };

  return (
    <div className="space-y-6">
      <CrosswordHeader elapsedTime={elapsedTime} day={day} />
      
      <CrosswordProvider 
        across={across}
        down={down}
        answers={answers}
        onComplete={handleComplete}
        isCompleted={isCompleted}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-6">
            <CrosswordGrid />
            <CrosswordControls />
          </div>
          <CrosswordClues />
        </div>
      </CrosswordProvider>
    </div>
  );
}