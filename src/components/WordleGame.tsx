import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WordleBoard } from "./wordle/WordleBoard";
import { WordleInput } from "./wordle/WordleInput";
import { Button } from "./ui/button";

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

  const handleInput = (value: string) => {
    if (gameOver) return;
    
    if (value.length <= WORD_LENGTH) {
      setCurrentGuess(value);
      setActiveCell(value.length - 1);
    }
  };

  const handleSubmit = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      toast.error("Word must be 5 letters");
      return;
    }

    if (!isValidWord(currentGuess)) {
      toast.error("Not a valid word");
      return;
    }
    
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");
    setActiveCell(-1);

    if (currentGuess === solution) {
      setIsWinner(true);
      setGameOver(true);
      setTimeout(() => setShowCongrats(true), 1500);
      onComplete?.();
    } else if (newGuesses.length >= MAX_GUESSES) {
      toast.error(`Game Over! The word was ${solution}`);
      setGameOver(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Backspace") {
      setCurrentGuess(prev => {
        const newGuess = prev.slice(0, -1);
        setActiveCell(newGuess.length - 1);
        return newGuess;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, gameOver]);

  return (
    <>
      <div className="max-w-sm mx-auto p-4 w-full">
        <h3 className="text-2xl font-bold mb-6 text-center text-green-700">
          Kringle #1 🎄
        </h3>
        
        <div className="relative">
          <WordleInput 
            currentGuess={currentGuess}
            onInput={handleInput}
          />
        </div>

        <WordleBoard
          guesses={guesses}
          currentGuess={currentGuess}
          activeCell={activeCell}
          solution={solution}
          isWinner={isWinner}
        />

        <div className="mt-6 flex justify-center">
          <Button 
            onClick={handleSubmit}
            className="w-full max-w-[200px] bg-green-700 hover:bg-green-800 text-white border-2 border-red-500 shadow-lg transition-all duration-300"
            disabled={gameOver}
          >
            Submit
          </Button>
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