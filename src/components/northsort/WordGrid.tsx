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
    
    // Determine which word set we're dealing with based on the words present
    const isDay11 = words.includes('MOGUL');
    
    // Word order mappings for different days
    const wordOrder = isDay11 ? {
      // Day 11 vertical arrangement
      'MOGUL': 0,
      'BAR': 4,
      'SWAN': 8,
      'HOP': 12,
      'LUGE': 1,
      'VAULT': 5,
      'DUCK': 9,
      'SPRING': 13,
      'SLALOM': 2,
      'TANK': 6,
      'CRANE': 10,
      'RISE': 14,
      'SKII': 3,
      'BANK': 7,
      'SWIFT': 11,
      'LEAP': 15
    } : {
      // Day 7 vertical arrangement
      'HAZELNUT': 0,
      'FRENCH VANILLA': 4,
      'CARAMEL': 8,
      'PEPPERMINT': 12,
      'SPRUCE': 1,
      'CYPRESS': 5,
      'FIR': 9,
      'PINE': 13,
      'JACK FROST': 2,
      'KRANKS': 6,
      'ELF': 10,
      'GRINCH': 14,
      'COOKIES': 3,
      'BROWNIES': 7,
      'CAKES': 11,
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