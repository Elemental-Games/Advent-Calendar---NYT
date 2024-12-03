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
    
    const hollyIndex = customArrangement.findIndex(word => word.toLowerCase() === 'holly');
    const wineIndex = customArrangement.findIndex(word => word.toLowerCase() === 'wine');
    const cookiesIndex = customArrangement.findIndex(word => word.toLowerCase() === 'cookies');
    const garlandIndex = customArrangement.findIndex(word => word.toLowerCase() === 'garland');
    
    if (hollyIndex !== -1 && wineIndex !== -1) {
      [customArrangement[hollyIndex], customArrangement[wineIndex]] = 
      [customArrangement[wineIndex], customArrangement[hollyIndex]];
    }
    
    if (cookiesIndex !== -1 && garlandIndex !== -1) {
      [customArrangement[cookiesIndex], customArrangement[garlandIndex]] = 
      [customArrangement[garlandIndex], customArrangement[cookiesIndex]];
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