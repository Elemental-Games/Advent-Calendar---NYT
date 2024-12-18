import { useCallback } from 'react';
import { WORD_POSITIONS } from '@/lib/garland-positions';

export function useFoundWordDisplay(
  foundWords: Array<{word: string, index: number}>,
  themeWord: string
) {
  const isLetterInFoundWord = useCallback((rowIndex: number, colIndex: number) => {
    const pos = (rowIndex + 1) * 10 + (colIndex + 1); // Convert to position format (e.g., 11, 12, etc.)
    console.log(`Checking position ${pos} for found words`);
    
    for (const { word, index } of foundWords) {
      const wordPositions = WORD_POSITIONS[16][word.toLowerCase()];
      console.log(`Checking word ${word} with positions:`, wordPositions);
      
      if (Array.isArray(wordPositions)) {
        // Handle multiple solutions case
        if (Array.isArray(wordPositions[0])) {
          const isInAnySolution = (wordPositions as number[][]).some(solution => 
            solution.includes(pos)
          );
          if (isInAnySolution) {
            console.log(`Found word ${word} at position ${pos}`);
            return {
              found: true,
              wordIndex: index,
              isThemeWord: word.toLowerCase() === themeWord.toLowerCase()
            };
          }
        } else {
          // Single solution case
          if ((wordPositions as number[]).includes(pos)) {
            console.log(`Found word ${word} at position ${pos}`);
            return {
              found: true,
              wordIndex: index,
              isThemeWord: word.toLowerCase() === themeWord.toLowerCase()
            };
          }
        }
      }
    }
    
    return { found: false, wordIndex: -1, isThemeWord: false };
  }, [foundWords, themeWord]);

  return { isLetterInFoundWord };
}