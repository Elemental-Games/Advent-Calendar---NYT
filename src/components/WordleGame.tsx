import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { isValidEnglishWord } from "@/lib/dictionary";

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
        if (!isValidEnglishWord(currentGuess)) {
          toast.error("Not a valid word");
          return;
        }
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess === solution) {
          setIsGameOver(true);
          setCompletionTime(elapsedTime);
          toast.success("Congratulations!");
          onComplete?.();
        } else if (newGuesses.length === 6) {
          setIsGameOver(true);
          toast.error(`Game Over! The word was ${solution}`);
        }
      } else if (e.key === "Backspace") {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
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
      return "bg-green-500 text-white border-green-500";
    }
    if (solution.includes(letter)) {
      return "bg-yellow-500 text-white border-yellow-500";
    }
    return "bg-gray-500 text-white border-gray-500";
  };

  const handleStartGame = () => {
    setIsStarted(true);
    setShowStartDialog(false);
    setElapsedTime(0);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Kringle #1 - Day 1
      </h2>
      <h3 className="text-xl font-bold mb-4 text-center text-green-600">
        Kringle #1 ❄️
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

              return (
                <div
                  key={colIndex}
                  className={`
                    w-full aspect-square flex items-center justify-center
                    text-2xl font-bold border-2
                    ${letter
                      ? rowIndex < guesses.length
                        ? getLetterStyle(letter, colIndex, guesses[rowIndex])
                        : "border-gray-300"
                      : "border-gray-200"
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