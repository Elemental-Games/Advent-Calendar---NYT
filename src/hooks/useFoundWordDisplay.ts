import { useCallback } from 'react';
import { WORD_POSITIONS } from '@/lib/garland-positions';

export function useFoundWordDisplay(
  foundWords: Array<{word: string, index: number}>,
  themeWord: string
) {
  const isLetterInFoundWord = useCallback((rowIndex: number, colIndex: number) => {
    const pos = (rowIndex + 1) * 10 + (colIndex + 1);
    console.log(`Checking position ${pos} for found words`);
    
    for (const { word, index } of foundWords) {
      const wordPositions = WORD_POSITIONS[20][word.toLowerCase()];
      console.log(`Checking word ${word} with positions:`, wordPositions);
      
      if (wordPositions) {
        // Handle both single array and array of arrays cases
        const positions = Array.isArray(wordPositions[0]) 
          ? (wordPositions as number[][]).flat() 
          : wordPositions as number[];
          
        if (positions.includes(pos)) {
          console.log(`Found word ${word} at position ${pos}`);
          return {
            found: true,
            wordIndex: index,
            isThemeWord: word.toLowerCase() === themeWord.toLowerCase()
          };
        }
      }
    }
    
    return { found: false, wordIndex: -1, isThemeWord: false };
  }, [foundWords, themeWord]);

  return { isLetterInFoundWord };
}