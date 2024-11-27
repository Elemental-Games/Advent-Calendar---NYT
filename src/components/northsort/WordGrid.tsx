import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import { Shuffle } from "lucide-react";

interface WordGridProps {
  words: string[];
  selectedWords: string[];
  onWordClick: (word: string) => void;
  disabled?: boolean;
}

export function WordGrid({ words, selectedWords, onWordClick, disabled }: WordGridProps) {
  const [displayedWords, setDisplayedWords] = useState<string[]>(words);

  const shuffleWords = () => {
    const shuffled = [...displayedWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDisplayedWords(shuffled);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {displayedWords.map((word) => (
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

      <div className="flex justify-center">
        <Button
          onClick={shuffleWords}
          variant="outline"
          size="sm"
          className="w-32 sm:hidden mt-2"
          disabled={disabled}
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Shuffle
        </Button>
      </div>

      <div className="hidden sm:flex sm:justify-end">
        <Button
          onClick={shuffleWords}
          variant="outline"
          size="sm"
          className="mb-2"
          disabled={disabled}
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Shuffle Words
        </Button>
      </div>
    </div>
  );
}