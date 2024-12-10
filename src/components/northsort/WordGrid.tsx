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
    // Create a vertical arrangement by grouping words into columns
    const customArrangement = [...words];
    
    // Specific word placements for vertical arrangement
    const wordOrder = {
      'HAZELNUT': 0,
      'SPRUCE': 4,
      'JACK FROST': 8,
      'COOKIES': 12,
      'FRENCH VANILLA': 1,
      'CYPRESS': 5,
      'KRANKS': 9,
      'BROWNIES': 13,
      'CARAMEL': 2,
      'FIR': 6,
      'ELF': 10,
      'CAKES': 14,
      'PEPPERMINT': 3,
      'PINE': 7,
      'GRINCH': 11,
      'BISCUITS': 15
    };

    // Sort words based on their desired positions
    return customArrangement.sort((a, b) => {
      const posA = wordOrder[a as keyof typeof wordOrder] ?? 0;
      const posB = wordOrder[b as keyof typeof wordOrder] ?? 0;
      return posA - posB;
    });
  }, [words]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {arrangedWords.map(word => {
        const isFound = selectedWords.includes(word);
        return (
          <motion.button
            key={word}
            whileHover={{ scale: isFound ? 1 : 1.02 }}
            whileTap={{ scale: isFound ? 1 : 0.98 }}
            onClick={() => !isFound && onWordClick(word)}
            disabled={disabled || isFound}
            className={`px-3 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors flex items-center justify-center min-h-[60px]
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