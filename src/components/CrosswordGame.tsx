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
import { Button } from "./ui/button";
import { toast } from "sonner";
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
    validateSubmission
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
    console.log('Resetting FrostWord puzzle for day:', day);
    gameState.resetPuzzle();
    setGuesses({});
    gameState.setSelectedCell(null);
    gameState.setShowCompletionDialog(false);
    gameState.setElapsedTime(0);
    toast.success('Puzzle reset successfully!');
  };

  const currentClue = getCurrentClue();

  return (
    <>
      <CrosswordLayout
        elapsedTime={gameState.elapsedTime}
        grid={grid}
        guesses={gameState.puzzleState.completed && gameState.puzzleState.guesses ? gameState.puzzleState.guesses : guesses}
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
        across={across}
        down={down}
        isCompleted={isCompleted || gameState.puzzleState.completed}
      />

      {(isCompleted || gameState.puzzleState.completed) && (
        <div className="flex justify-center mt-4">
          <Button 
            onClick={handleReset}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Reset Puzzle
          </Button>
        </div>
      )}

      <StartDialog
        open={gameState.showStartDialog}
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