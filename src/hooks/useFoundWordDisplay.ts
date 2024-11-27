import { useCallback } from 'react';

export function useFoundWordDisplay(foundWords: string[], themeWord: string) {
  const findWordIndexes = useCallback((word: string, startRow: number, startCol: number): number[] => {
    const indexes: number[] = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of directions) {
      let found = true;
      const tempIndexes: number[] = [];
      
      for (let i = 0; i < word.length; i++) {
        const row = startRow + i * dx;
        const col = startCol + i * dy;
        
        if (row < 0 || row >= 8 || col < 0 || col >= 6 ||
            grid[row][col] !== word[i]) {
          found = false;
          break;
        }
        tempIndexes.push(row * 6 + col);
      }
      
      if (found) {
        return tempIndexes;
      }
    }
    
    return [];
  }, []);

  const isLetterInFoundWord = useCallback((rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * 6 + colIndex;
    
    for (let i = 0; i < foundWords.length; i++) {
      const word = foundWords[i];
      const wordIndexes = findWordIndexes(word, rowIndex, colIndex);
      if (wordIndexes.includes(cellIndex)) {
        return { 
          found: true, 
          wordIndex: i, 
          isThemeWord: word.toLowerCase() === themeWord.toLowerCase() 
        };
      }
    }
    
    return { found: false, wordIndex: -1, isThemeWord: false };
  }, [foundWords, themeWord, findWordIndexes]);

  return { isLetterInFoundWord };
}