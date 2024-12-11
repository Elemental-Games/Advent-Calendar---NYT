import { motion } from "framer-motion";
import { useMemo } from "react";

interface WordGridProps {
  words: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
  disabled?: boolean;
}

export function WordGrid({ words, selectedWords, onWordClick, disabled }: WordGridProps) {
  const arrangedWords = useMemo(() => {
    const customArrangement = [...words];
    
    // Custom arrangement for day 11
    if (customArrangement.includes("SLALOM")) {
      // Arrange words in a scattered pattern
      const positions = [0, 5, 10, 15, 2, 7, 12, 1, 6, 11, 3, 8, 13, 4, 9, 14];
      const arrangedArray = new Array(16).fill(null);
      
      customArrangement.forEach((word, index) => {
        arrangedArray[positions[index]] = word;
      });
      
      return arrangedArray.filter(word => word !== null);
    }
    
    // Keep existing arrangements for other days
    return customArrangement;
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
