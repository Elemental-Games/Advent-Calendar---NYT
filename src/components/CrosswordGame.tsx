import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CrosswordCell } from "./crossword/CrosswordCell";
import { CrosswordClue } from "./crossword/CrosswordClue";
import { crosswordGrid, crosswordClues } from "./crossword/CrosswordConstants";

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

  const grid = crosswordGrid;

  const isValidCell = (row: number, col: number) => {
    return grid[row][col] !== '' || 
           (row === 1 && col >= 0 && col <= 4) || // NOEL word
           (col === 1 && row >= 0 && row <= 4) || // NOEL down
           (col === 2 && row >= 0 && row <= 2);   // TOY word
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    const cell = grid[rowIndex][colIndex];
    return /[1-9]/.test(cell) ? cell : '';
  };

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    if (!isValidCell(rowIndex, colIndex)) return;

    const clueNumber = getClueNumber(rowIndex, colIndex);
    const direction = showDown ? 'd' : 'a';
    const key = `${direction}${clueNumber}`;
    
    const newGuesses = { ...guesses };
    if (clueNumber) {
      newGuesses[key] = (newGuesses[key] || '').slice(0, colIndex) + value + (newGuesses[key] || '').slice(colIndex + 1);
    }
    setGuesses(newGuesses);

    // Move to next cell
    if (value) {
      const nextCell = findNextCell(rowIndex, colIndex, showDown);
      if (nextCell) {
        cellRefs.current[nextCell.row][nextCell.col]?.focus();
      }
    }

    // Check completion
    const allFilled = Object.keys(answers).every(
      key => newGuesses[key]?.length === answers[key].length
    );

    if (allFilled) {
      const allCorrect = Object.entries(answers).every(
        ([num, answer]) => newGuesses[num]?.toUpperCase() === answer.toUpperCase()
      );

      if (allCorrect) {
        setCompletionTime(elapsedTime);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        toast.success("Congratulations! You've completed the Mini FrostWord!");
        onComplete?.();
      } else {
        toast.error("Some letters are incorrect. Keep trying!");
      }
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

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!isValidCell(rowIndex, colIndex)) return;
    
    if (selectedCell?.row === rowIndex && selectedCell?.col === colIndex) {
      setShowDown(!showDown);
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
      setShowDown(false);
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
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Mini FrostWord ❄️
      </h3>

      <div className="text-center mb-4 text-lg font-mono text-blue-600">
        {formatTime(elapsedTime)}
      </div>
      
      <div className="mb-8">
        <div className="grid grid-cols-5 gap-1 w-full max-w-[350px] md:max-w-[450px] mx-auto">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
              {row.map((_, colIndex) => {
                const isPartOfSelectedWord = selectedCell && (
                  (showDown && selectedCell.col === colIndex) ||
                  (!showDown && selectedCell.row === rowIndex)
                );
                
                return (
                  <CrosswordCell
                    key={`${rowIndex}-${colIndex}`}
                    value={guesses[`${showDown ? 'd' : 'a'}${getClueNumber(rowIndex, colIndex)}`] || ""}
                    clueNumber={getClueNumber(rowIndex, colIndex)}
                    isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                    isPartOfWord={isPartOfSelectedWord && isValidCell(rowIndex, colIndex)}
                    isValidCell={isValidCell(rowIndex, colIndex)}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onChange={(value) => handleInputChange(rowIndex, colIndex, value)}
                    ref={el => cellRefs.current[rowIndex][colIndex] = el}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {currentClue && (
        <CrosswordClue
          number={currentClue.number}
          direction={currentClue.direction}
          clue={currentClue.clue}
        />
      )}

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
