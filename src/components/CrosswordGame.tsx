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
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { puzzleData } from "@/lib/puzzle-data";
import type { CrosswordGameProps } from "./crossword/types";
import type { CrosswordPuzzle } from "@/lib/puzzle-types";

export function CrosswordGame({ across, down, answers, onComplete, day }: CrosswordGameProps) {
  console.log(`Initializing CrosswordGame for day ${day}`);
  
  const puzzleId = `crossword_${day}`;
  const { puzzleState, savePuzzleState, resetPuzzle } = usePuzzleState(puzzleId);

  // Get the puzzle data for the current day
  const currentPuzzle = puzzleData[day];
  console.log('Current puzzle data:', currentPuzzle);

  // Type guard to ensure we're working with a CrosswordPuzzle
  const isCrosswordPuzzle = (puzzle: any): puzzle is CrosswordPuzzle => {
    return puzzle && 'across' in puzzle && 'down' in puzzle;
  };

  if (!isCrosswordPuzzle(currentPuzzle)) {
    console.error('Invalid puzzle type for CrosswordGame');
    return null;
  }
  
  const puzzleGrid = currentPuzzle.grid || [
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "]
  ];
  console.log('Using puzzle grid:', puzzleGrid);

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
  } = useCrosswordGame(answers);

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
    const { allCorrect, incorrectCount } = validateSubmission(grid, isValidCell, getClueNumber);
    console.log('Submission validation result:', { allCorrect, incorrectCount });

    if (allCorrect) {
      savePuzzleState({
        completed: true,
        completionTime: elapsedTime,
        guesses
      });
      setTimeout(() => {
        setShowCompletionDialog(true);
        onComplete?.();
      }, 2000);
    } else {
      setIncorrectCount(incorrectCount);
      setShowIncorrectDialog(true);
    }
  };

  const handleReset = () => {
    console.log('Resetting puzzle');
    resetPuzzle();
    setGuesses({});
    setSelectedCell(null);
    window.location.reload();
  };

  const currentClue = getCurrentClue();

  if (puzzleState.completed) {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-green-600">Puzzle Completed!</h2>
          <p className="text-lg">Time: {formatTime(puzzleState.completionTime)}</p>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Reset Puzzle
          </Button>
        </div>

        <CrosswordLayout
          elapsedTime={puzzleState.completionTime}
          grid={grid}
          guesses={puzzleState.guesses || {}}
          showDown={showDown}
          selectedCell={null}
          isValidCell={isValidCell}
          getClueNumber={getClueNumber}
          handleCellClick={() => {}}
          handleInputChange={() => {}}
          cellRefs={cellRefs}
          validatedCells={{}}
          currentClue={null}
          onSubmit={() => {}}
          onKeyPress={() => {}}
          onBackspace={() => {}}
          across={across}
          down={down}
          isCompleted={true}
        />
      </div>
    );
  }

  return (
    <>
      <CrosswordLayout
        elapsedTime={elapsedTime}
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
        currentClue={currentClue}
        onSubmit={handleSubmit}
        onKeyPress={handleKeyPress}
        onBackspace={() => selectedCell && handleBackspace(selectedCell)}
        across={across}
        down={down}
        isCompleted={false}
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
        day={day}
      />

      <IncorrectDialog
        open={showIncorrectDialog}
        onOpenChange={setShowIncorrectDialog}
        incorrectCount={incorrectCount}
      />
    </>
  );
}