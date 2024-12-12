import { useCallback } from 'react';
import { WORD_POSITIONS } from '@/lib/garland-positions';

export function useFoundWordDisplay(
  foundWords: Array<{word: string, index: number}>,
  themeWord: string
) {
  const isLetterInFoundWord = useCallback((rowIndex: number, colIndex: number) => {
    const pos = (rowIndex + 1) * 10 + (colIndex + 1); // Convert to position format (e.g., 11, 12, etc.)
    
    for (const { word, index } of foundWords) {
      const wordPositions = WORD_POSITIONS[12][word.toLowerCase()];
      
      // Check if this cell's position is in the found word's positions
      if (wordPositions?.includes(pos)) {
        console.log(`Found word ${word} at position ${pos}`);
        return {
          found: true,
          wordIndex: index,
          isThemeWord: word.toLowerCase() === themeWord.toLowerCase()
        };
      }
    }
    
    return { found: false, wordIndex: -1, isThemeWord: false };
  }, [foundWords, themeWord]);

  return { isLetterInFoundWord };
}