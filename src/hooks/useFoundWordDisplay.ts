import { useCallback } from 'react';

interface FoundWord {
  word: string;
  index: number;
}

const grid = [
  ['S', 'L', 'E', 'S', 'F', 'R'],
  ['H', 'G', 'I', 'A', 'S', 'O'],
  ['M', 'I', 'T', 'M', 'T', 'R'],
  ['S', 'T', 'L', 'S', 'O', 'U'],
  ['T', 'E', 'I', 'P', 'L', 'D'],
  ['O', 'E', 'R', 'H', 'E', 'S'],
  ['S', 'A', 'N', 'H', 'K', 'I'],
  ['A', 'T', 'C', 'O', 'O', 'C'],
];

export function useFoundWordDisplay(foundWords: FoundWord[], themeWord: string) {
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
    
    for (const { word, index } of foundWords) {
      const wordIndexes = findWordIndexes(word, rowIndex, colIndex);
      if (wordIndexes.includes(cellIndex)) {
        console.log(`Found word at cell ${cellIndex}:`, word, 'with index:', index);
        return { 
          found: true, 
          wordIndex: index,
          isThemeWord: word.toLowerCase() === themeWord.toLowerCase() 
        };
      }
    }
    
    return { found: false, wordIndex: -1, isThemeWord: false };
  }, [foundWords, themeWord, findWordIndexes]);

  return { isLetterInFoundWord };
}