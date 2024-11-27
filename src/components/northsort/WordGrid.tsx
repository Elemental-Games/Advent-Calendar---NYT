import { motion } from "framer-motion";

interface WordGridProps {
  words: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
  disabled?: boolean;
}

export function WordGrid({ words, selectedWords, onWordClick, disabled }: WordGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {words.map(word => (
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