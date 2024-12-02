import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CrosswordGrid } from "./crossword/CrosswordGrid";
import { CrosswordClue } from "./crossword/CrosswordClue";
import { CrosswordHeader } from "./crossword/CrosswordHeader";
import { CrosswordControls } from "./crossword/CrosswordControls";
import { CrosswordClueList } from "./crossword/CrosswordClueList";

interface CrosswordGameProps {
  across: Record<string, string>;
  down: Record<string, string>;
  answers: Record<string, string>;
  onComplete?: () => void;
}

export function CrosswordGame({ across, down, answers, onComplete }: CrosswordGameProps) {
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showDown, setShowDown] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cellRefs = useRef<(HTMLInputElement | null)[][]>(Array(5).fill(null).map(() => Array(5).fill(null)));

  const grid = [
    ["P", "E", "N", "D", " "],
    ["O", "W", "I", "E", " "],
    ["S", "A", "N", "T", "A"],
    ["E", "N", "J", "O", "Y"],
    [" ", " ", "A", "X", "E"]
  ];

  const isValidCell = (row: number, col: number) => {
    return grid[row][col] !== " ";
  };

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

  const handleStartGame = () => {
    setIsStarted(true);
    setShowStartDialog(false);
    setElapsedTime(0);
  };

  const getClueNumber = (rowIndex: number, colIndex: number) => {
    // Updated clue numbers to match the specified pattern
    if (rowIndex === 0 && colIndex === 0) return "11"; // 1 across and 1 down
    if (rowIndex === 0 && colIndex === 1) return "12"; // 2 down
    if (rowIndex === 0 && colIndex === 2) return "13"; // 3 down
    if (rowIndex === 0 && colIndex === 3) return "14"; // 4 down
    if (rowIndex === 1 && colIndex === 0) return "21"; // 5 across
    if (rowIndex === 2 && colIndex === 0) return "31"; // 6 across
    if (rowIndex === 2 && colIndex === 4) return "35"; // 7 down
    if (rowIndex === 3 && colIndex === 0) return "41"; // 8 across
    if (rowIndex === 4 && colIndex === 2) return "53"; // 9 across
    return "";
  };

  const getCellValue = (rowIndex: number, colIndex: number): string => {
    const clueNumber = getClueNumber(rowIndex, colIndex);
    if (!clueNumber) return "";

    // Check both across and down guesses for this cell
    const acrossKey = `a${clueNumber}`;
    const downKey = `d${clueNumber}`;
    
    // If there's a value in either direction, use it
    if (guesses[acrossKey]?.[colIndex]) return guesses[acrossKey][colIndex];
    if (guesses[downKey]?.[rowIndex]) return guesses[downKey][rowIndex];
    
    return "";
  };

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    if (!isValidCell(rowIndex, colIndex)) return;

    const clueNumber = getClueNumber(rowIndex, colIndex);
    if (!clueNumber) return;

    // Update both across and down guesses
    const acrossKey = `a${clueNumber}`;
    const downKey = `d${clueNumber}`;
    
    const newGuesses = { ...guesses };
    
    // Update the current direction's guess
    const currentKey = showDown ? downKey : acrossKey;
    newGuesses[currentKey] = (newGuesses[currentKey] || '').slice(0, showDown ? rowIndex : colIndex) + 
                            value + 
                            (newGuesses[currentKey] || '').slice(showDown ? rowIndex + 1 : colIndex + 1);

    // Also update the other direction's guess at the intersection
    const otherKey = showDown ? acrossKey : downKey;
    if (newGuesses[otherKey]) {
      newGuesses[otherKey] = newGuesses[otherKey].slice(0, showDown ? colIndex : rowIndex) + 
                            value + 
                            newGuesses[otherKey].slice(showDown ? colIndex + 1 : rowIndex + 1);
    }

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

  const findNextCell = (currentRow: number, currentCol: number, isDown: boolean): { row: number; col: number } | null => {
    if (isDown) {
      for (let row = currentRow + 1; row < 5; row++) {
        if (isValidCell(row, currentCol)) {
          return { row, col: currentCol };
        }
      }
    } else {
      for (let col = currentCol + 1; col < 5; col++) {
        if (isValidCell(currentRow, col)) {
          return { row: currentRow, col };
        }
      }
    }
    return null;
  };

  const findPreviousCell = (currentRow: number, currentCol: number, isDown: boolean): { row: number; col: number } | null => {
    if (isDown) {
      for (let row = currentRow - 1; row >= 0; row--) {
        if (isValidCell(row, currentCol)) {
          return { row, col: currentCol };
        }
      }
    } else {
      for (let col = currentCol - 1; col >= 0; col--) {
        if (isValidCell(currentRow, col)) {
          return { row: currentRow, col };
        }
      }
    }
    return null;
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

  const handleSubmit = () => {
    const allFilled = Object.keys(answers).every(
      key => guesses[key]?.length === answers[key].length
    );

    if (!allFilled) {
      toast.error("Please fill in all boxes before submitting!");
      return;
    }

    let incorrectCount = 0;
    Object.entries(answers).forEach(([key, answer]) => {
      if (guesses[key]?.toUpperCase() !== answer.toUpperCase()) {
        incorrectCount++;
      }
    });

    if (incorrectCount > 0) {
      toast.error(`${incorrectCount} answer${incorrectCount > 1 ? 's are' : ' is'} incorrect. Keep trying!`);
    } else {
      setCompletionTime(elapsedTime);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast.success("Congratulations! You've completed the Mini FrostWord!");
      onComplete?.();
    }
  };

  const currentClue = getCurrentClue();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CrosswordHeader elapsedTime={elapsedTime} />
      
      <div className="mb-8">
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
