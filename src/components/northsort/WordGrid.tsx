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
    
    if (day === 15) {
      // Day 15's specific arrangement - fixed positions to ensure all words appear
      const positions = [
        13, // Hinge
        42, // Philadelphia
        20, // Bar
        31, // Nashville
        10, // Morgan Wallen
        43, // 76ers
        22, // Restaurant
        30, // Wegmans
        41, // Virginia
        12, // Beach
        33, // Eagles
        21, // Bar
        40, // Hilton Head
        11, // Beach
        32, // Concerts
        23  // Parking Lot
      ];
      
      // Create array with exact size needed
      const arrangedArray = new Array(words.length).fill(null);
      
      // Map each word to its position, ensuring we don't exceed array bounds
      customArrangement.forEach((word, index) => {
        if (positions[index] !== undefined) {
          const position = index % words.length;
          arrangedArray[position] = word;
        }
      });
      
      return arrangedArray.filter(word => word !== null);
    }
    
    // Keep existing arrangements for other days
    if (customArrangement.includes("SLALOM")) {
      const positions = [0, 5, 10, 15, 2, 7, 12, 1, 6, 11, 3, 8, 13, 4, 9, 14];
      const arrangedArray = new Array(16).fill(null);
      
      customArrangement.forEach((word, index) => {
        arrangedArray[positions[index]] = word;
      });
      
      return arrangedArray.filter(word => word !== null);
    }
    
    return customArrangement;
  }, [words, day]);

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