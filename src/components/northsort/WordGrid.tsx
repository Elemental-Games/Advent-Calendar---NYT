import { motion } from "framer-motion";

interface WordGridProps {
  words: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
  disabled?: boolean;
}

export function WordGrid({ words, selectedWords, onWordClick, disabled }: WordGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {words.map(word => (
        <motion.button
          key={word}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onWordClick(word)}
          disabled={disabled}
          className={`px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center aspect-[3/1] md:aspect-[2.5/1] w-full
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