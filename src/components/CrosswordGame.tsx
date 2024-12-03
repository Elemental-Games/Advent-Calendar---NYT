import React from "react";
import { CrosswordLayout } from "./crossword/CrosswordLayout";
import { StartDialog } from "./crossword/dialogs/StartDialog";
import { CompletionDialog } from "./crossword/dialogs/CompletionDialog";
import { IncorrectDialog } from "./crossword/dialogs/IncorrectDialog";
import { useCrosswordGame } from "@/hooks/useCrosswordGame";
import { useCrosswordGrid } from "@/hooks/useCrosswordGrid";
import { useCrosswordInput } from "@/hooks/useCrosswordInput";
import { useCrosswordCellInput } from "@/hooks/useCrosswordCellInput";
import { useClueManagement } from "@/hooks/useClueManagement";
import { usePuzzleState } from "@/hooks/usePuzzleState";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import type { CrosswordGameProps } from "./crossword/types";

export function CrosswordGame({ across, down, answers, onComplete, day }: CrosswordGameProps) {
  const puzzleId = `crossword_${day}`;
  const { puzzleState, savePuzzleState, resetPuzzle } = usePuzzleState(puzzleId);

  const {
    showStartDialog,
    setShowStartDialog,
    isStarted,
    elapsedTime,
    selectedCell,
    setSelectedCell,
    showDown,
    setShowDown,
    handleStartGame,
    showCompletionDialog,
    setShowCompletionDialog,
    showIncorrectDialog,
    setShowIncorrectDialog,
    incorrectCount,
    setIncorrectCount,
    timerRef
  } = useCrosswordGame(answers, onComplete, puzzleState.completed);

  const {
    GRID,
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
  } = useCrosswordInput(answers, puzzleState.guesses);

  const { handleInputChange, handleBackspace } = useCrosswordCellInput(
    isValidCell,
    getClueNumber,
    findNextCell,
    findPreviousCell,
    setSelectedCell,
    cellRefs,
    showDown,
    guesses,
    setGuesses
  );

  const { getCurrentClue } = useClueManagement(
    selectedCell,
    showDown,
    across,
    down,
    getClueNumber
  );

  const handleKeyPress = (key: string) => {
    if (!selectedCell || puzzleState.completed) return;
    handleInputChange(selectedCell.row, selectedCell.col, key);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!isValidCell(rowIndex, colIndex) || puzzleState.completed) return;
    
    if (selectedCell?.row === rowIndex && selectedCell?.col === colIndex) {
      setShowDown(!showDown);
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
    }
  };

  const handleSubmit = () => {
    const { allCorrect, incorrectCount } = validateSubmission(GRID, isValidCell, getClueNumber);

    if (allCorrect) {
      savePuzzleState({
        completed: true,
        completionTime: elapsedTime,
        guesses
      });
      setShowCompletionDialog(true);
      onComplete?.();
    } else {
      setIncorrectCount(incorrectCount);
      setShowIncorrectDialog(true);
    }
  };

  const currentClue = getCurrentClue();

  if (puzzleState.completed) {
    return (
      <div className="text-center space-y-4 p-8">
        <h2 className="text-2xl font-bold text-green-600">Puzzle Completed!</h2>
        <p className="text-lg">Time: {formatTime(puzzleState.completionTime)}</p>
        <Button 
          onClick={resetPuzzle}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Reset Puzzle
        </Button>
      </div>
    );
  }

  return (
    <>
      <CrosswordLayout
        elapsedTime={elapsedTime}
        grid={GRID}
        guesses={guesses}
        showDown={showDown}
        selectedCell={selectedCell}
        isValidCell={isValidCell}
        getClueNumber={getClueNumber}
        handleCellClick={handleCellClick}
        handleInputChange={handleInputChange}
        cellRefs={cellRefs}
        validatedCells={validatedCells}
        currentClue={currentClue}
        onSubmit={handleSubmit}
        onKeyPress={handleKeyPress}
        onBackspace={() => selectedCell && handleBackspace(selectedCell)}
        across={across}
        down={down}
      />

      <StartDialog
        open={showStartDialog}
        onOpenChange={setShowStartDialog}
        onStart={handleStartGame}
      />

      <CompletionDialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
        elapsedTime={elapsedTime}
      />

      <IncorrectDialog
        open={showIncorrectDialog}
        onOpenChange={setShowIncorrectDialog}
        incorrectCount={incorrectCount}
      />
    </>
  );
}