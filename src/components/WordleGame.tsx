import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { savePuzzleState, getPuzzleState } from "@/lib/game-state";

interface WordleGameProps {
  solution: string;
  onComplete?: () => void;
  day: number;
}

export function WordleGame({ solution, onComplete, day }: WordleGameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const savedState = getPuzzleState(day);
    if (savedState) {
      setGuesses(savedState.guesses || []);
      setIsGameOver(savedState.isGameOver || false);
      setIsWon(savedState.isWon || false);
      if (savedState.isWon) {
        onComplete?.();
      }
    }
  }, [day, onComplete]);

  // Save state whenever it changes
  useEffect(() => {
    savePuzzleState(day, {
      guesses,
      isGameOver,
      isWon
    });
  }, [guesses, isGameOver, isWon, day]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isGameOver) return;

    if (e.key === "Enter") {
      if (currentGuess.length !== 5) {
        toast.error("Word must be 5 letters!");
        return;
      }
      
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess === solution) {
        setIsWon(true);
        setIsGameOver(true);
        onComplete?.();
        toast.success("Congratulations! You won!");
      } else if (newGuesses.length >= 6) {
        setIsGameOver(true);
        toast.error(`Game Over! The word was ${solution}`);
      }
    } else if (e.key === "Backspace") {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + e.key.toLowerCase());
    }
  };

  const getLetterStyle = (letter: string, index: number, guess: string) => {
    if (solution[index] === letter) {
      return "bg-green-500";
    }
    if (solution.includes(letter)) {
      return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  return (
    <div 
      className="max-w-sm mx-auto p-4" 
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="grid gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-2">
            {[...Array(5)].map((_, j) => {
              const letter = guesses[i]?.[j] || (i === guesses.length ? currentGuess[j] : "");
              const style = guesses[i] ? getLetterStyle(letter, j, guesses[i]) : "bg-gray-200";
              
              return (
                <div
                  key={j}
                  className={`w-full aspect-square flex items-center justify-center text-white font-bold text-2xl uppercase ${style}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {isGameOver && (
        <div className="mt-4 text-center">
          <p className="text-lg mb-2">
            {isWon ? "Congratulations! You won!" : `Game Over! The word was ${solution}`}
          </p>
        </div>
      )}
    </div>
  );
}