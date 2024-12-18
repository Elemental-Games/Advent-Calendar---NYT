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
      // Day 15's specific arrangement to match the image layout
      const positions = [
        0,  // Eagles
        1,  // Nashville
        2,  // Hinge
        3,  // Philadelphia
        4,  // Restaurant
        5,  // 76ers
        6,  // Concerts
        7,  // Hilton Head
        8,  // Wegmans
        9,  // Weddings
        10, // Virginia
        11, // Morgan Wallen
        12, // Parking Lot
        13, // Phillies
        14, // Bar
        15  // Beach
      ];
      
      const arrangedArray = new Array(16).fill(null);
      customArrangement.forEach((word, index) => {
        if (positions[index] !== undefined) {
          arrangedArray[positions[index]] = word;
        }
      });
      
      return arrangedArray.filter(word => word !== null);
    }
    
    // Keep existing arrangements for other days
    if (customArrangement.includes("SLALOM")) {
      // Day 11's arrangement
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
