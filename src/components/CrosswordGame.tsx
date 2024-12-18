import React, { useState, useEffect } from 'react';
import { CrosswordGrid } from './crossword/CrosswordGrid';
import { CrosswordHeader } from './crossword/CrosswordHeader';
import { CrosswordControls } from './crossword/CrosswordControls';
import { useCrosswordGrid } from "@/hooks/useCrosswordGrid";
import { useCrosswordInput } from "@/hooks/useCrosswordInput";
import { useCrosswordCellInput } from "@/hooks/useCrosswordCellInput";
import { savePuzzleState } from '@/lib/game-state';

interface CrosswordGameProps {
  across: Record<string, string>;
  down: Record<string, string>;
  answers: Record<string, string>;
  onComplete?: () => void;
  day: number;
  isCompleted?: boolean;
}

export function CrosswordGame({ across, down, answers, onComplete, day, isCompleted = false }: CrosswordGameProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(!isCompleted);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showDown, setShowDown] = useState(false);

  const {
    grid,
    cellRefs,
    isValidCell,
    getClueNumber,
    findNextCell,
    findPreviousCell
  } = useCrosswordGrid();

  const {
    guesses,
    setGuesses,
    validatedCells,
    validateSubmission
  } = useCrosswordInput(answers);

  const {
    handleInputChange,
    handleBackspace
  } = useCrosswordCellInput({
    isValidCell,
    getClueNumber,
    findNextCell,
    findPreviousCell,
    setSelectedCell,
    cellRefs,
    showDown,
    guesses,
    setGuesses
  });

  const handleKeyPress = (key: string) => {
    if (selectedCell) {
      handleInputChange(selectedCell.row, selectedCell.col, key);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (!isValidCell(row, col)) return;
    
    if (selectedCell?.row === row && selectedCell?.col === col) {
      setShowDown(!showDown);
    } else {
      setSelectedCell({ row, col });
    }
  };

  const handleSubmit = () => {
    const result = validateSubmission(grid, isValidCell, getClueNumber);
    if (result.allCorrect) {
      setIsActive(false);
      onComplete?.();
      savePuzzleState(day, { completed: true });
    }
  };

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

  return (
    <div className="space-y-6">
      <CrosswordHeader elapsedTime={elapsedTime} day={day} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-6">
          <CrosswordGrid
            grid={grid}
            guesses={guesses}
            showDown={showDown}
            selectedCell={selectedCell}
            isValidCell={isValidCell}
            getClueNumber={getClueNumber}
            handleCellClick={handleCellClick}
            handleInputChange={handleInputChange}
            cellRefs={cellRefs}
            validatedCells={validatedCells}
            isCompleted={isCompleted}
          />
          <CrosswordControls
            onSubmit={handleSubmit}
            onKeyPress={handleKeyPress}
            onBackspace={() => selectedCell && handleBackspace(selectedCell)}
          />
        </div>
      </div>
    </div>
  );
}