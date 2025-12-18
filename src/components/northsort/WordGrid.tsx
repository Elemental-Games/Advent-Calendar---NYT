import { motion } from "framer-motion";
import { useMemo } from "react";

interface WordGridProps {
  words: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
  disabled?: boolean;
  day?: number;
}

export function WordGrid({ words, selectedWords, onWordClick, disabled, day }: WordGridProps) {
  const arrangedWords = useMemo(() => {
    const positions = [
      14, 43, 21, 32,  // Morgan Wallen, Beach, Hinge, Phillies
      11, 44, 23, 31,  // Wegmans, Bar, Restaurant, Parking Lot
      42, 13, 34, 22,  // Hilton Head, Virginia, Nashville, Philadelphia
      41, 12, 33, 24   // Concerts, Weddings, Eagles, 76ers
    ];
    
    // Create a mapping of positions to words
    const positionMap: { [key: number]: string } = {};
    words.forEach((word, index) => {
      if (positions[index] !== undefined) {
        positionMap[positions[index]] = word;
      }
    });

    // Create the final arrangement by position
    const finalArrangement: string[] = [];
    for (let row = 1; row <= 4; row++) {
      for (let col = 1; col <= 4; col++) {
        const position = row * 10 + col;
        const word = positionMap[position];
        if (word) {
          finalArrangement.push(word);
        }
      }
    }

    return finalArrangement;
  }, [words]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {arrangedWords.map((word, index) => {
        if (!word) return null;
        const isFound = selectedWords.includes(word);
        return (
          <motion.button
            key={`${word}-${index}`}
            whileHover={{ scale: isFound ? 1 : 1.02 }}
            whileTap={{ scale: isFound ? 1 : 0.98 }}
            onClick={() => !isFound && onWordClick(word)}
            disabled={disabled || isFound}
            className={`px-3 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center justify-center
              ${isFound
                ? 'bg-green-100 text-green-800 border-2 border-red-500 cursor-not-allowed opacity-75'
                : 'bg-white hover:bg-red-50'
              }`}
          >
            <span className="break-words text-center">
              {word}
            </span>
          </motion.button>
        )}
      )}
    </div>
  );
}