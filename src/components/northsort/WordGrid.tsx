import { motion } from "framer-motion";
import { useMemo } from "react";

interface WordGridProps {
  words: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
  disabled?: boolean;
}

export function WordGrid({ words, selectedWords, onWordClick, disabled }: WordGridProps) {
  // Arrange words so related ones are separated
  const arrangedWords = useMemo(() => {
    // Create a custom arrangement by swapping specific words
    const customArrangement = [...words];
    
    // Find indices of words to swap
    const hollyIndex = customArrangement.findIndex(word => word.toLowerCase() === 'holly');
    const wineIndex = customArrangement.findIndex(word => word.toLowerCase() === 'wine');
    const cookiesIndex = customArrangement.findIndex(word => word.toLowerCase() === 'cookies');
    const garlandIndex = customArrangement.findIndex(word => word.toLowerCase() === 'garland');
    
    // Swap holly and wine
    if (hollyIndex !== -1 && wineIndex !== -1) {
      [customArrangement[hollyIndex], customArrangement[wineIndex]] = 
      [customArrangement[wineIndex], customArrangement[hollyIndex]];
    }
    
    // Swap cookies and garland
    if (cookiesIndex !== -1 && garlandIndex !== -1) {
      [customArrangement[cookiesIndex], customArrangement[garlandIndex]] = 
      [customArrangement[garlandIndex], customArrangement[cookiesIndex]];
    }
    
    return customArrangement;
  }, [words]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {arrangedWords.map(word => (
        <motion.button
          key={word}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onWordClick(word)}
          disabled={disabled}
          className={`px-3 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center justify-center
            ${selectedWords.includes(word)
              ? 'bg-red-600 text-white'
              : 'bg-white hover:bg-red-50'
            }`}
        >
          <span className="break-words text-center">
            {word}
          </span>
        </motion.button>
      ))}
    </div>
  );
}