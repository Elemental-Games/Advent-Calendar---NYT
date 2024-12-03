import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WordleBoard } from "./wordle/WordleBoard";
import { WordleInput } from "./wordle/WordleInput";
import { Button } from "./ui/button";
import { formatTime } from "@/lib/utils";

interface WordleGameProps {
  solution: string;
  onComplete?: () => void;
}

interface WordleState {
  guesses: string[];
  completed: boolean;
  isWinner: boolean;
  completionTime: number;
}

export function WordleGame({ solution, onComplete }: WordleGameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [activeCell, setActiveCell] = useState<number>(-1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('wordle_state');
    if (savedState) {
      const state: WordleState = JSON.parse(savedState);
      setGuesses(state.guesses);
      setGameOver(state.completed);
      setIsWinner(state.isWinner);
      setElapsedTime(state.completionTime);
    }
  }, []);

  // Save state when game is completed
  useEffect(() => {
    if (gameOver) {
      const state: WordleState = {
        guesses,
        completed: true,
        isWinner,
        completionTime: elapsedTime
      };
      localStorage.setItem('wordle_state', JSON.stringify(state));
    }
  }, [gameOver, guesses, isWinner, elapsedTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerStarted && !gameOver) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerStarted, gameOver]);

  const isValidWord = (word: string) => {
    return word.length === WORD_LENGTH;
  };

  const handleInput = (value: string) => {
    if (gameOver) return;

    if (!timerStarted) {
      setTimerStarted(true);
    }

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
      setTimeout(() => setShowCongrats(true), 2000);
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

  const handleReset = () => {
    console.log('Resetting Kringle puzzle');
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setIsWinner(false);
    setShowCongrats(false);
    setActiveCell(-1);
    setElapsedTime(0);
    setTimerStarted(false);
    localStorage.removeItem('wordle_state');
    toast.info("Puzzle reset! Try again!");
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
        
        {gameOver && isWinner && (
          <div className="text-center mb-4 space-y-4">
            <p className="text-lg font-mono text-green-600">
              Time: {formatTime(elapsedTime)}
            </p>
            <Button
              onClick={handleReset}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Reset Puzzle
            </Button>
          </div>
        )}

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
              You've completed Day 1 in {formatTime(elapsedTime)}! ⭐
            </p>
            <p className="text-gray-600">
              Come back tomorrow for a new Christmas-themed challenge! ✨
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
