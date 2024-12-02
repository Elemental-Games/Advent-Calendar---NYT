import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CrosswordGrid } from "./crossword/CrosswordGrid";
import { CrosswordClue } from "./crossword/CrosswordClue";
import { CrosswordHeader } from "./crossword/CrosswordHeader";
import { CrosswordControls } from "./crossword/CrosswordControls";
import { CrosswordClueList } from "./crossword/CrosswordClueList";
import { useCrosswordGame } from "@/hooks/useCrosswordGame";
import { useCrosswordGrid } from "@/hooks/useCrosswordGrid";
import { useCrosswordInput } from "@/hooks/useCrosswordInput";
import { toast } from "sonner";
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
    setShowCompletionDialog
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
    handleInputChange: baseHandleInputChange,
    validateSubmission
  } = useCrosswordInput(answers);

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    console.log(`Handling input change at ${rowIndex},${colIndex} with value: ${value}`);
    
    const clueNumber = getClueNumber(rowIndex, colIndex);
    if (!clueNumber) return;

    const newGuesses = { ...guesses };
    
    // Calculate positions
    let acrossPos = 0;
    let downPos = 0;
    
    // Count valid cells up to the current position
    for (let col = 0; col < colIndex; col++) {
      if (isValidCell(rowIndex, col)) acrossPos++;
    }
    for (let row = 0; row < rowIndex; row++) {
      if (isValidCell(row, colIndex)) downPos++;
    }

    console.log(`Calculated positions - Across: ${acrossPos}, Down: ${downPos}`);

    // Update both across and down values
    const acrossKey = `a${clueNumber}`;
    const downKey = `d${clueNumber}`;

    // Initialize strings if they don't exist
    if (!newGuesses[acrossKey]) {
      newGuesses[acrossKey] = ' '.repeat(
        Array(5).fill(null).filter((_, col) => isValidCell(rowIndex, col)).length
      );
    }
    if (!newGuesses[downKey]) {
      newGuesses[downKey] = ' '.repeat(
        Array(5).fill(null).filter((_, row) => isValidCell(row, colIndex)).length
      );
    }

    // Update both values
    newGuesses[acrossKey] = 
      newGuesses[acrossKey].slice(0, acrossPos) + 
      value.toUpperCase() + 
      newGuesses[acrossKey].slice(acrossPos + 1);
    
    newGuesses[downKey] = 
      newGuesses[downKey].slice(0, downPos) + 
      value.toUpperCase() + 
      newGuesses[downKey].slice(downPos + 1);

    console.log('Updated guesses:', newGuesses);
    setGuesses(newGuesses);

    if (value) {
      const nextCell = findNextCell(rowIndex, colIndex, showDown);
      if (nextCell) {
        cellRefs.current[nextCell.row][nextCell.col]?.focus();
        setSelectedCell(nextCell);
      }
    }
  };

  const handleKeyPress = (key: string) => {
    if (!selectedCell) return;
    handleInputChange(selectedCell.row, selectedCell.col, key);
  };

  const handleBackspace = () => {
    if (!selectedCell) return;
    handleInputChange(selectedCell.row, selectedCell.col, '');
    const prevCell = findPreviousCell(selectedCell.row, selectedCell.col, showDown);
    if (prevCell) {
      setSelectedCell(prevCell);
      cellRefs.current[prevCell.row][prevCell.col]?.focus();
    }
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
    const allCorrect = validateSubmission(GRID, isValidCell, getClueNumber);

    if (allCorrect) {
      setShowCompletionDialog(true);
      onComplete?.();
    } else {
      toast.error("Some answers are incorrect. Keep trying!");
    }
  };

  const getCurrentClue = () => {
    if (!selectedCell) return null;
    const clueNumber = getClueNumber(selectedCell.row, selectedCell.col);
    if (!clueNumber) return null;
    
    return showDown ? 
      down[clueNumber] ? { number: clueNumber, clue: down[clueNumber], direction: 'Down' } :
      across[clueNumber] ? { number: clueNumber, clue: across[clueNumber], direction: 'Across' } :
      null :
      across[clueNumber] ? { number: clueNumber, clue: across[clueNumber], direction: 'Across' } :
      down[clueNumber] ? { number: clueNumber, clue: down[clueNumber], direction: 'Down' } :
      null;
  };

  const currentClue = getCurrentClue();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CrosswordHeader elapsedTime={elapsedTime} />
      
      <div className="mb-8">
        <CrosswordGrid
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
        />
      </div>

      {currentClue && (
        <CrosswordClue
          number={currentClue.number}
          direction={currentClue.direction}
          clue={currentClue.clue}
        />
      )}

      <CrosswordControls
        onSubmit={handleSubmit}
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
      />

      <CrosswordClueList across={across} down={down} />

      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-blue-700">
              Ready to Begin? ❄️
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              Click start to begin the Mini FrostWord puzzle!
            </p>
            <Button onClick={handleStartGame} className="bg-blue-600 hover:bg-blue-700">
              Start Timer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-md w-[90vw] mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-700">
              Congratulations! 🎄
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              You completed the Mini FrostWord in {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}!
            </p>
            <Button onClick={() => setShowCompletionDialog(false)} className="bg-green-600 hover:bg-green-700">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}