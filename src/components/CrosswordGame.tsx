import React, { useEffect } from "react";
import { CrosswordLayout } from "./crossword/CrosswordLayout";
import { StartDialog } from "./crossword/dialogs/StartDialog";
import { CompletionDialog } from "./crossword/dialogs/CompletionDialog";
import { IncorrectDialog } from "./crossword/dialogs/IncorrectDialog";
import { useCrosswordGrid } from "@/hooks/useCrosswordGrid";
import { useCrosswordInput } from "@/hooks/useCrosswordInput";
import { useCrosswordCellInput } from "@/hooks/useCrosswordCellInput";
import { useClueManagement } from "@/hooks/useClueManagement";
import { puzzleData } from "@/lib/puzzle-data";
import { useGameState } from "./crossword/GameStateProvider";
import { GameControls } from "./crossword/GameControls";
import type { CrosswordGameProps } from "./crossword/types";
import type { CrosswordPuzzle } from "@/lib/puzzle-types";

export function CrosswordGame({ across, down, answers, onComplete, day, isCompleted = false }: CrosswordGameProps) {
  console.log(`Initializing CrosswordGame for day ${day}, isCompleted:`, isCompleted);
  
  const gameState = useGameState(day, answers, onComplete);
  
  // Get the puzzle data for the current day
  const currentPuzzle = puzzleData[day];
  console.log('Current puzzle data:', currentPuzzle);

  // Type guard to ensure we're working with a CrosswordPuzzle
  const isCrosswordPuzzle = (puzzle: any): puzzle is CrosswordPuzzle => {
    return puzzle && puzzle.type === 'frostword';
  };

  if (!isCrosswordPuzzle(currentPuzzle)) {
    console.error('Invalid puzzle type for CrosswordGame');
    return null;
  }

  const puzzleGrid = currentPuzzle.grid || Array(5).fill(Array(5).fill(" "));
  console.log('Using puzzle grid:', puzzleGrid);

  // Initialize game as started if it's already completed
  useEffect(() => {
    if (isCompleted || gameState.puzzleState.completed) {
      gameState.setShowStartDialog(false);
      gameState.setIsStarted(true);
      if (gameState.puzzleState.completionTime) {
        gameState.setElapsedTime(gameState.puzzleState.completionTime);
      }
    }
  }, [isCompleted, gameState.puzzleState.completed]);

  const {
    grid,
    cellRefs,
    isValidCell,
    getClueNumber,
    findNextCell,
    findPreviousCell
  } = useCrosswordGrid(puzzleGrid);

  const {
    guesses,
    setGuesses,
    validatedCells,
    validateSubmission,
    resetGuesses  // Add this to the destructuring
  } = useCrosswordInput(answers);

  const { handleInputChange, handleBackspace } = useCrosswordCellInput(
    isValidCell,
    getClueNumber,
    findNextCell,
    findPreviousCell,
    gameState.setSelectedCell,
    cellRefs,
    gameState.showDown,
    guesses,
    setGuesses
  );

  const { getCurrentClue } = useClueManagement(
    gameState.selectedCell,
    gameState.showDown,
    across,
    down,
    getClueNumber
  );

  useEffect(() => {
    // Only start timer if game is started and not completed
    if (gameState.isStarted && !gameState.showCompletionDialog && !gameState.puzzleState.completed) {
      gameState.timerRef.current = setInterval(() => {
        gameState.setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (gameState.timerRef.current) {
        clearInterval(gameState.timerRef.current);
      }
    };
  }, [gameState.isStarted, gameState.showCompletionDialog, gameState.puzzleState.completed]);

  const handleKeyPress = (key: string) => {
    if (!gameState.selectedCell || gameState.puzzleState.completed) return;
    handleInputChange(gameState.selectedCell.row, gameState.selectedCell.col, key);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!isValidCell(rowIndex, colIndex) || gameState.puzzleState.completed) return;
    
    if (gameState.selectedCell?.row === rowIndex && gameState.selectedCell?.col === colIndex) {
      gameState.setShowDown(!gameState.showDown);
    } else {
      gameState.setSelectedCell({ row: rowIndex, col: colIndex });
    }
  };

  const handleSubmit = () => {
    const { allCorrect, incorrectCount } = validateSubmission(grid, isValidCell, getClueNumber);
    console.log('Submission validation result:', { allCorrect, incorrectCount });

    if (allCorrect) {
      gameState.savePuzzleState({
        completed: true,
        completionTime: gameState.elapsedTime,
        guesses
      });
      setTimeout(() => {
        gameState.setShowCompletionDialog(true);
        onComplete?.();
      }, 2000);
    } else {
      gameState.setIncorrectCount(incorrectCount);
      gameState.setShowIncorrectDialog(true);
    }
  };

  const handleReset = () => {
    console.log('Resetting puzzle state...');
    resetGuesses();  // Reset all guesses to empty
    gameState.setSelectedCell(null);
    gameState.setShowDown(false);
    gameState.setElapsedTime(0);
    gameState.setIsStarted(false);
    gameState.setShowStartDialog(true);
    if (gameState.timerRef.current) {
      clearInterval(gameState.timerRef.current);
    }
    localStorage.removeItem(`crossword_${day}`);
    gameState.resetPuzzle();
  };

  const currentClue = getCurrentClue();

  // If the puzzle is completed, use the saved guesses
  const displayGuesses = gameState.puzzleState.completed ? gameState.puzzleState.guesses || {} : guesses;

  return (
    <>
      <CrosswordLayout
        elapsedTime={gameState.elapsedTime}
        grid={grid}
        guesses={displayGuesses}
        showDown={gameState.showDown}
        selectedCell={gameState.selectedCell}
        isValidCell={isValidCell}
        getClueNumber={getClueNumber}
        handleCellClick={handleCellClick}
        handleInputChange={handleInputChange}
        cellRefs={cellRefs}
        validatedCells={validatedCells}
        currentClue={currentClue}
        onSubmit={handleSubmit}
        onKeyPress={handleKeyPress}
        onBackspace={() => gameState.selectedCell && handleBackspace(gameState.selectedCell)}
        onReset={handleReset}  // Add the reset handler
        across={across}
        down={down}
        isCompleted={isCompleted || gameState.puzzleState.completed}
      />

      <StartDialog
        open={gameState.showStartDialog && !isCompleted && !gameState.puzzleState.completed}
        onOpenChange={gameState.setShowStartDialog}
        onStart={gameState.handleStartGame}
      />

      <CompletionDialog
        open={gameState.showCompletionDialog}
        onOpenChange={gameState.setShowCompletionDialog}
        elapsedTime={gameState.elapsedTime}
        day={day}
      />

      <IncorrectDialog
        open={gameState.showIncorrectDialog}
        onOpenChange={gameState.setShowIncorrectDialog}
        incorrectCount={gameState.incorrectCount}
      />
    </>
  );
}