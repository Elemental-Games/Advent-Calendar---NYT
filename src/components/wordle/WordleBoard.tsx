import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordleBoardProps {
  guesses: string[];
  currentGuess: string;
  activeCell: number;
  solution: string;
  isWinner: boolean;
}

export function WordleBoard({ guesses, currentGuess, activeCell, solution, isWinner }: WordleBoardProps) {
  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;

  const getLetterStyle = (letter: string, index: number, guess: string) => {
    // If there's no letter, or no guess (which happens after reset), return base style
    if (!letter || !guess) return "bg-transparent border-red-200";
    
    if (guess[index] === solution[index]) {
      return "bg-green-700 text-white border-red-800";
    }
    
    const solutionLetterCount = [...solution].filter(l => l === letter).length;
    const correctPositionsCount = [...guess].filter((l, i) => l === letter && solution[i] === letter).length;
    const previousOccurrences = [...guess].slice(0, index).filter(l => l === letter).length;
    
    if (solution.includes(letter) && 
        previousOccurrences + correctPositionsCount < solutionLetterCount) {
      return "bg-amber-500 text-white border-red-300";
    }
    
    return "bg-gray-600 text-white border-gray-700";
  };

  const handleCellClick = () => {
    const hiddenInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (hiddenInput) {
      hiddenInput.focus();
    }
  };

  console.log('WordleBoard rendering with guesses:', guesses);

  return (
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
                  "w-full relative cursor-pointer",
                  "before:content-[''] before:float-left before:pt-[100%]",
                  "border-2 rounded",
                  "text-2xl font-bold uppercase transition-all duration-300",
                  style,
                  isActive && "border-red-500 shadow-lg scale-105",
                  rowIndex === guesses.length && !letter && "hover:border-red-400"
                )}
                onClick={handleCellClick}
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
  );
}