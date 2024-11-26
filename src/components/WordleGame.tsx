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

  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;
  
  const isValidWord = (word: string) => {
    // For now we'll accept any 5-letter word, but this should be replaced with a proper dictionary check
    return word.length === WORD_LENGTH;
  };

  const getLetterStyle = (letter: string, index: number, guess: string) => {
    if (!letter) return "bg-transparent border-blue-200";
    
    // Check if this letter is in the correct position
    if (guess[index] === solution[index]) {
      return "bg-blue-700 text-white border-blue-800";
    }
    
    // Check if this letter exists in the solution (but not in this position)
    const solutionLetterCount = [...solution].filter(l => l === letter).length;
    const correctPositionsCount = [...guess].filter((l, i) => l === letter && solution[i] === letter).length;
    const previousOccurrences = [...guess].slice(0, index).filter(l => l === letter).length;
    
    if (solution.includes(letter) && 
        previousOccurrences + correctPositionsCount < solutionLetterCount) {
      return "bg-blue-300 text-white border-blue-400";
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
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, gameOver, solution, onComplete]);

  return (
    <>
      <div className="max-w-sm mx-auto p-4">
        <h3 className="text-xl font-bold mb-6 text-center">FrostWords</h3>
        <div className="grid gap-2">
          {[...Array(MAX_GUESSES)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {[...Array(WORD_LENGTH)].map((_, colIndex) => {
                const letter = rowIndex === guesses.length 
                  ? currentGuess[colIndex] 
                  : guesses[rowIndex]?.[colIndex];
                
                const style = guesses[rowIndex] 
                  ? getLetterStyle(letter, colIndex, guesses[rowIndex])
                  : "bg-transparent border-blue-200";

                return (
                  <motion.div
                    key={colIndex}
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: 1,
                      backgroundColor: isWinner && rowIndex === guesses.length - 1 
                        ? "rgb(29 78 216)" // dark blue
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
                      "w-full aspect-square border-2 rounded flex items-center justify-center",
                      "text-2xl font-bold uppercase transition-colors duration-300",
                      style
                    )}
                  >
                    {letter}
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
            <DialogTitle className="text-center text-2xl font-bold text-blue-700">
              Congratulations! 🎉❄️
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              You've completed Day 1's FrostWords puzzle!
            </p>
            <p className="text-gray-600">
              Come back tomorrow for a new winter-themed challenge.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}