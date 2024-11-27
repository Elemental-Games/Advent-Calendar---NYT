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
    const shuffled = [...words];
    // Group words by their group (assuming 4 words per group)
    const groups: string[][] = [];
    for (let i = 0; i < shuffled.length; i += 4) {
      groups.push(shuffled.slice(i, i + 4));
    }
    
    // Interleave words from different groups
    const result: string[] = [];
    const maxLength = Math.max(...groups.map(g => g.length));
    
    for (let i = 0; i < maxLength; i++) {
      groups.forEach(group => {
        if (group[i]) {
          result.push(group[i]);
        }
      });
    }
    
    return result;
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