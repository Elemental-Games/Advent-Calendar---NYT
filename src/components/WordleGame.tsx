import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface WordleGameProps {
  solution: string;
  onComplete?: () => void;
}

export function WordleGame({ solution, onComplete }: WordleGameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === "Enter") {
        if (currentGuess.length !== WORD_LENGTH) {
          toast.error("Word must be 5 letters");
          return;
        }
        
        const newGuesses = [...guesses, currentGuess.toUpperCase()];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess.toUpperCase() === solution) {
          toast.success("Congratulations!");
          setGameOver(true);
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

  const getLetterStyle = (letter: string, index: number, guess: string) => {
    if (guess[index] === solution[index]) {
      return "bg-green-600 text-white border-green-700";
    }
    if (solution.includes(guess[index])) {
      return "bg-yellow-500 text-white border-yellow-600";
    }
    return "bg-gray-600 text-white border-gray-700";
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="grid gap-2">
        {[...Array(MAX_GUESSES)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {[...Array(WORD_LENGTH)].map((_, colIndex) => {
              const letter = rowIndex === guesses.length 
                ? currentGuess[colIndex] 
                : guesses[rowIndex]?.[colIndex];
              
              const style = guesses[rowIndex] 
                ? getLetterStyle(letter, colIndex, guesses[rowIndex])
                : "bg-transparent border-gray-400";

              return (
                <motion.div
                  key={colIndex}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
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
  );
}