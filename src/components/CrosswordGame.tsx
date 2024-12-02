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
import type { CrosswordGameProps } from "./crossword/types";

export function CrosswordGame({ across, down, answers, onComplete }: CrosswordGameProps) {
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
    setIncorrectCount
  } = useCrosswordGame(answers, onComplete);

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
  } = useCrosswordInput(answers);

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
    if (!selectedCell) return;
    handleInputChange(selectedCell.row, selectedCell.col, key);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!isValidCell(rowIndex, colIndex)) return;
    
    if (selectedCell?.row === rowIndex && selectedCell?.col === colIndex) {
      setShowDown(!showDown);
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
    }
  };

  const handleSubmit = () => {
    const { allCorrect, incorrectCount } = validateSubmission(GRID, isValidCell, getClueNumber);

    if (allCorrect) {
      setShowCompletionDialog(true);
      onComplete?.();
    } else {
      setIncorrectCount(incorrectCount);
      setShowIncorrectDialog(true);
    }
  };

  const currentClue = getCurrentClue();

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