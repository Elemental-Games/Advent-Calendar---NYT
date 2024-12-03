/**
 * FoundWordsList Component
 * Displays a list of words that have been successfully found by the player.
 * Shows special styling for the theme word when found.
 * Tracks progress showing X/7 words found.
 */
import React from 'react';

interface FoundWordsListProps {
  foundWords: Array<{word: string, index: number}>;
}

export function FoundWordsList({ foundWords }: FoundWordsListProps) {
  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-4">
      <div className="text-sm">
        Found words ({foundWords.length}/7):
        <div className="flex flex-wrap gap-2 mt-2">
          {foundWords.map(({ word }, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full ${
                word.toLowerCase() === 'christmas'
                  ? 'bg-green-500 text-white border-2 border-red-500'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {capitalizeFirstLetter(word)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}