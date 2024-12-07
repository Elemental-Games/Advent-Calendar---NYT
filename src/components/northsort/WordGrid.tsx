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
    
    // Find indices of specific words we want to move
    const hazelnutIndex = customArrangement.findIndex(word => word === 'HAZELNUT');
    const pineIndex = customArrangement.findIndex(word => word === 'PINE');
    const grinchIndex = customArrangement.findIndex(word => word === 'GRINCH');
    const browniesIndex = customArrangement.findIndex(word => word === 'BROWNIES');
    
    // Swap positions to create a more mixed arrangement
    if (hazelnutIndex !== -1 && pineIndex !== -1) {
      [customArrangement[hazelnutIndex], customArrangement[pineIndex]] = 
      [customArrangement[pineIndex], customArrangement[hazelnutIndex]];
    }
    
    if (grinchIndex !== -1 && browniesIndex !== -1) {
      [customArrangement[grinchIndex], customArrangement[browniesIndex]] = 
      [customArrangement[browniesIndex], customArrangement[grinchIndex]];
    }
    
    return customArrangement;
  }, [words]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {arrangedWords.map(word => {
        const isFound = selectedWords.includes(word);
        return (
          <motion.button
            key={word}
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