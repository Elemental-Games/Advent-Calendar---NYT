import React from 'react';
import { motion } from 'framer-motion';

interface GarlandWordListProps {
  words: string[];
  foundWords: string[];
}

export function GarlandWordList({ words, foundWords }: GarlandWordListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {words.map((word) => (
        <motion.div
          key={word}
          className={`
            px-3 py-2 rounded-full text-center
            ${foundWords.includes(word) 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-600'}
          `}
          whileHover={{ scale: 1.05 }}
          animate={{
            scale: foundWords.includes(word) ? [1, 1.1, 1] : 1,
            transition: { duration: 0.3 }
          }}
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
}