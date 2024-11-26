import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CrosswordGameProps {
  across: Record<string, string>;
  down: Record<string, string>;
  answers: Record<string, string>;
  onComplete?: () => void;
}

export function CrosswordGame({ across, down, answers, onComplete }: CrosswordGameProps) {
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [showCongrats, setShowCongrats] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showDown, setShowDown] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 5x5 grid representation with empty cells
  const grid = [
    ['', '1', '', '2', ''],
    ['3', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['5', '', '', '', ''],
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isStarted && !isComplete) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isComplete]);

  const handleStartGame = () => {
    setIsStarted(true);
    setShowStartDialog(false);
    setElapsedTime(0);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (selectedCell?.row === rowIndex && selectedCell?.col === colIndex) {
      setShowDown(!showDown);
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
      setShowDown(false);
    }
  };

  const getClueNumber = (rowIndex: number, colIndex: number) => {
    const cell = grid[rowIndex][colIndex];
    return /[1-9]/.test(cell) ? cell : '';
  };

  const handleInputChange = (clueNumber: string, value: string) => {
    const newGuesses = { ...guesses, [clueNumber]: value.toUpperCase() };
    setGuesses(newGuesses);

    // Check if all answers are correct
    const allCorrect = Object.entries(answers).every(
      ([num, answer]) => newGuesses[num]?.toUpperCase() === answer.toUpperCase()
    );

    if (allCorrect && !isComplete) {
      setIsComplete(true);
      setCompletionTime(elapsedTime);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setShowCongrats(true);
      onComplete?.();
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
      
      {/* Grid Display */}
      <div className="mb-8">
        <div className="grid grid-cols-5 gap-1 max-w-[90vw] md:max-w-md mx-auto">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={cn(
                    "aspect-square border-2 flex items-center justify-center cursor-pointer",
                    "text-lg md:text-2xl font-bold relative transition-all",
                    cell === '' ? 'bg-gray-200' : 'bg-white/90 border-blue-200',
                    selectedCell?.row === rowIndex && selectedCell?.col === colIndex && 
                      'border-blue-500 shadow-lg scale-105'
                  )}
                >
                  {getClueNumber(rowIndex, colIndex) && (
                    <span className="absolute top-0.5 left-0.5 text-[10px] text-blue-600">
                      {getClueNumber(rowIndex, colIndex)}
                    </span>
                  )}
                  {guesses[`${showDown ? 'd' : 'a'}${getClueNumber(rowIndex, colIndex)}`]?.[0] && (
                    <span className="text-blue-700">
                      {guesses[`${showDown ? 'd' : 'a'}${getClueNumber(rowIndex, colIndex)}`][0]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Current Clue Display */}
      {currentClue && (
        <div className="text-center mb-8 animate-fade-in">
          <p className="text-lg font-semibold text-blue-700">
            {currentClue.number}. {currentClue.direction}
          </p>
          <p className="text-gray-600">{currentClue.clue}</p>
          <Input
            maxLength={5}
            value={guesses[`${currentClue.direction.toLowerCase() === 'down' ? 'd' : 'a'}${currentClue.number}`] || ""}
            onChange={(e) => handleInputChange(
              `${currentClue.direction.toLowerCase() === 'down' ? 'd' : 'a'}${currentClue.number}`,
              e.target.value
            )}
            className="uppercase mt-2 max-w-[200px] mx-auto text-center"
            disabled={isComplete}
          />
        </div>
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

      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-blue-700">
              Congratulations! 🎉❄️
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              You've completed Day 2's Mini FrostWord puzzle!
            </p>
            <p className="text-blue-600 font-mono text-xl">
              Time: {formatTime(completionTime || 0)}
            </p>
            <p className="text-gray-600">
              Come back tomorrow for a new Christmas-themed challenge.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}