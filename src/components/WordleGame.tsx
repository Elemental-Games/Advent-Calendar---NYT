import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { isValidEnglishWord } from "@/lib/dictionary";
import { motion } from "framer-motion";

interface WordleGameProps {
  solution: string;
  onComplete?: () => void;
}

export function WordleGame({ solution, onComplete }: WordleGameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && !isGameOver) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted || isGameOver) return;

      if (e.key === "Enter") {
        if (currentGuess.length !== 5) {
          toast.error("Word must be 5 letters");
          return;
        }

        // Convert to lowercase for dictionary check
        const lowerGuess = currentGuess.toLowerCase();
        console.log("Checking word:", lowerGuess);
        
        if (!isValidEnglishWord(lowerGuess)) {
          toast.error("Not a valid English word");
          return;
        }

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");
        setSelectedCell(null);

        if (currentGuess === solution) {
          setIsGameOver(true);
          setCompletionTime(elapsedTime);
          setShowCompletionAnimation(true);
          toast.success("Congratulations!");
          onComplete?.();
        } else if (newGuesses.length === 6) {
          setIsGameOver(true);
          toast.error(`Game Over! The word was ${solution}`);
        }
      } else if (e.key === "Backspace") {
        setCurrentGuess(prev => prev.slice(0, -1));
        setSelectedCell(prev => prev !== null ? Math.max(0, prev - 1) : 4);
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
        setSelectedCell(currentGuess.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, isGameOver, isStarted, solution, elapsedTime, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLetterStyle = (letter: string, index: number, guess: string) => {
    if (solution[index] === letter) {
      return "bg-green-600 text-white border-green-700";
    }
    if (solution.includes(letter)) {
      return "bg-green-400 text-white border-green-500";
    }
    return "bg-gray-500 text-white border-gray-600";
  };

  const handleStartGame = () => {
    setIsStarted(true);
    setShowStartDialog(false);
    setElapsedTime(0);
  };

  const handleCellClick = (index: number) => {
    if (currentGuess.length <= index) {
      setSelectedCell(index);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Kringle #1 🎄
      </h2>
      <h3 className="text-xl font-bold mb-4 text-center text-green-600">
        Day 1
      </h3>

      <div className="text-center mb-4 text-lg font-mono">
        {formatTime(elapsedTime)}
      </div>

      <div className="grid grid-rows-6 gap-2 mb-4">
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const letter = rowIndex === guesses.length
                ? currentGuess[colIndex]
                : guesses[rowIndex]?.[colIndex];

              const isSelected = rowIndex === guesses.length && colIndex === selectedCell;

              return (
                <div
                  key={colIndex}
                  onClick={() => handleCellClick(colIndex)}
                  className={`
                    w-full aspect-square flex items-center justify-center
                    text-2xl font-bold border-2 transition-all duration-200
                    ${isSelected ? "border-red-500 scale-105" : ""}
                    ${letter
                      ? rowIndex < guesses.length
                        ? getLetterStyle(letter, colIndex, guesses[rowIndex])
                        : "border-green-300 hover:border-green-400"
                      : "border-green-200 hover:border-green-300"
                    }
                  `}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showCompletionAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
        >
          <div className="text-6xl">🎉</div>
        </motion.div>
      )}

      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-700">
              Ready to Begin? ❄️
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              Click start to begin the Kringle puzzle!
            </p>
            <Button onClick={handleStartGame} className="bg-green-600 hover:bg-green-700">
              Start Timer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}