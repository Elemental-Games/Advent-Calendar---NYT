import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WordleGameProps {
  solution: string;
  onComplete?: () => void;
}

export function WordleGame({ solution, onComplete }: WordleGameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [activeCell, setActiveCell] = useState<number>(-1);

  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;
  
  const isValidWord = (word: string) => {
    return word.length === WORD_LENGTH;
  };

  const getLetterStyle = (letter: string, index: number, guess: string) => {
    if (!letter) return "bg-transparent border-red-200";
    
    if (guess[index] === solution[index]) {
      return "bg-green-700 text-white border-red-800"; // Dark red border for correct letters
    }
    
    const solutionLetterCount = [...solution].filter(l => l === letter).length;
    const correctPositionsCount = [...guess].filter((l, i) => l === letter && solution[i] === letter).length;
    const previousOccurrences = [...guess].slice(0, index).filter(l => l === letter).length;
    
    if (solution.includes(letter) && 
        previousOccurrences + correctPositionsCount < solutionLetterCount) {
      return "bg-amber-700 text-white border-red-300"; // Changed to amber-700 for darkened gold
    }
    
    return "bg-gray-600 text-white border-gray-700";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === "Enter") {
        if (currentGuess.length !== WORD_LENGTH) {
          toast.error("Word must be 5 letters");
          return;
        }

        if (!isValidWord(currentGuess)) {
          toast.error("Not a valid word");
          return;
        }
        
        const newGuesses = [...guesses, currentGuess.toUpperCase()];
        setGuesses(newGuesses);
        setCurrentGuess("");
        setActiveCell(-1);

        if (currentGuess.toUpperCase() === solution) {
          setIsWinner(true);
          setGameOver(true);
          setTimeout(() => setShowCongrats(true), 1500);
          onComplete?.();
        } else if (newGuesses.length >= MAX_GUESSES) {
          toast.error(`Game Over! The word was ${solution}`);
          setGameOver(true);
        }
      } else if (e.key === "Backspace") {
        setCurrentGuess(prev => {
          const newGuess = prev.slice(0, -1);
          setActiveCell(newGuess.length);
          return newGuess;
        });
      } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => {
          const newGuess = prev + e.key.toUpperCase();
          setActiveCell(newGuess.length - 1);
          return newGuess;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, gameOver, solution, onComplete]);

  return (
    <>
      <div className="max-w-sm mx-auto p-4 w-full">
        <h3 className="text-2xl font-bold mb-6 text-center text-green-700">
          Kringle #1 🎄
        </h3>
        <div className="grid gap-2 w-full max-w-[95vw] sm:max-w-sm mx-auto">
          {[...Array(MAX_GUESSES)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {[...Array(WORD_LENGTH)].map((_, colIndex) => {
                const letter = rowIndex === guesses.length 
                  ? currentGuess[colIndex] 
                  : guesses[rowIndex]?.[colIndex];
                
                const style = guesses[rowIndex] 
                  ? getLetterStyle(letter, colIndex, guesses[rowIndex])
                  : "bg-transparent border-red-200";

                const isActive = rowIndex === guesses.length && colIndex === activeCell;

                return (
                  <motion.div
                    key={colIndex}
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: 1,
                      backgroundColor: isWinner && rowIndex === guesses.length - 1 
                        ? "rgb(21 128 61)" 
                        : undefined
                    }}
                    transition={isWinner && rowIndex === guesses.length - 1 
                      ? { 
                          delay: colIndex * 0.2,
                          duration: 0.3
                        }
                      : undefined
                    }
                    className={cn(
                      "w-full relative",
                      "before:content-[''] before:float-left before:pt-[100%]",
                      "border-2 rounded",
                      "text-2xl font-bold uppercase transition-all duration-300",
                      style,
                      isActive && "border-red-500 shadow-lg scale-105",
                      rowIndex === guesses.length && !letter && "hover:border-red-400"
                    )}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {letter}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-700">
              Congratulations! 🎄🎅
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              You've completed Day 1!
            </p>
            <p className="text-gray-600">
              Come back tomorrow for a new Christmas-themed challenge.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}