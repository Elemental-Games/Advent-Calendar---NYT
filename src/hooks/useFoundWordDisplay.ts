import { useCallback } from 'react';
import { WORD_POSITIONS } from '@/lib/garland-positions';

export function useFoundWordDisplay(
  foundWords: Array<{word: string, index: number}>,
  themeWord: string,
  day: number
) {
  const isLetterInFoundWord = useCallback((rowIndex: number, colIndex: number) => {
    const pos = (rowIndex + 1) * 10 + (colIndex + 1);
    console.log(`Checking position ${pos} for found words`);
    
    const dayPositions = WORD_POSITIONS[day];
    if (!dayPositions) {
      return { found: false, wordIndex: -1, isThemeWord: false, wordName: '' };
    }
    
    for (const { word, index } of foundWords) {
      const wordPositions = dayPositions[word.toLowerCase()];
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
            isThemeWord: word.toLowerCase() === themeWord.toLowerCase(),
            wordName: word
          };
        }
      }
    }
    
    return { found: false, wordIndex: -1, isThemeWord: false, wordName: '' };
  }, [foundWords, themeWord, day]);

  return { isLetterInFoundWord };
}