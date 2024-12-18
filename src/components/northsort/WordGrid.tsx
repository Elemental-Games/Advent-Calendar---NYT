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
    const customArrangement = [...words];
    
    // New arrangement based on randomized positions
    const positions = [
      14, 43, 21, 32,  // Column 4 group 1, Column 3 group 4, Column 1 group 2, Column 2 group 3
      11, 44, 23, 31,  // Column 1 group 1, Column 4 group 4, Column 3 group 2, Column 1 group 3
      42, 13, 34, 22,  // Column 2 group 4, Column 3 group 1, Column 4 group 3, Column 2 group 2
      41, 12, 33, 24   // Column 1 group 4, Column 2 group 1, Column 3 group 3, Column 4 group 2
    ];
    
    // Create array with exact size needed
    const arrangedArray = new Array(words.length).fill(null);
    
    // Map each word to its position
    customArrangement.forEach((word, index) => {
      if (positions[index] !== undefined) {
        const position = index % words.length;
        arrangedArray[position] = word;
      }
    });
    
    return arrangedArray.filter(word => word !== null);
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
        )
      })}
    </div>
  );
}