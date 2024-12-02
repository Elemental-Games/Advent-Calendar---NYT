import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CrosswordGrid } from "./crossword/CrosswordGrid";
import { CrosswordClue } from "./crossword/CrosswordClue";
import { CrosswordHeader } from "./crossword/CrosswordHeader";
import { CrosswordControls } from "./crossword/CrosswordControls";
import { CrosswordClueList } from "./crossword/CrosswordClueList";
import { useCrosswordGame } from "@/hooks/useCrosswordGame";
import { useCrosswordGrid } from "@/hooks/useCrosswordGrid";
import type { CrosswordGameProps } from "./crossword/types";

export function CrosswordGame({ across, down, answers, onComplete }: CrosswordGameProps) {
  const {
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
  } = useCrosswordGame(answers, onComplete);

  const {
    GRID,
    cellRefs,
    isValidCell,
    getClueNumber,
    findNextCell,
    findPreviousCell
  } = useCrosswordGrid();

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    if (!isValidCell(rowIndex, colIndex)) return;

    const clueNumber = getClueNumber(rowIndex, colIndex);
    if (!clueNumber) return;

    const acrossKey = `a${clueNumber}`;
    const downKey = `d${clueNumber}`;
    
    const newGuesses = { ...guesses };
    
    // Update both across and down guesses
    if (!newGuesses[acrossKey]) newGuesses[acrossKey] = '';
    if (!newGuesses[downKey]) newGuesses[downKey] = '';
    
    newGuesses[acrossKey] = value;
    newGuesses[downKey] = value;

    setGuesses(newGuesses);
    console.log(`Updated cell value at ${rowIndex},${colIndex} to ${value}`);

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
    </div>
  );
}