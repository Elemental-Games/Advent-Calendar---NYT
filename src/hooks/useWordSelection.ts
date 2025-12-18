import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { WORD_POSITIONS } from '@/lib/garland-positions';

export function useWordSelection(
  words: string[],
  foundWords: Array<{word: string, index: number}>,
  setFoundWords: (words: Array<{word: string, index: number}>) => void,
  themeWord: string,
  day: number,
  grid: string[][]
) {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');

  console.log('useWordSelection - Initial render with words:', words);
  console.log('useWordSelection - Found words:', foundWords);
  console.log('useWordSelection - Day:', day);
  console.log('useWordSelection - Grid:', grid);

  const getLetterFromGrid = useCallback((row: number, col: number): string => {
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[row].length) {
      return grid[row][col];
    }
    return '';
  }, [grid]);

  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    console.log(`Cell clicked at (${rowIndex},${colIndex})`);
    const cellIndex = rowIndex * 6 + colIndex;

    setSelectedCells(prev => {
      if (prev.length === 0) {
        console.log('First cell selected');
        const letter = getLetterFromGrid(rowIndex, colIndex);
        setCurrentWord(letter);
        return [cellIndex];
      }

      if (prev.includes(cellIndex)) {
        if (cellIndex === prev[prev.length - 1]) {
          console.log('Removing last selected cell');
          const newCells = prev.slice(0, -1);
          const newWord = newCells.map(cell => {
            const row = Math.floor(cell / 6);
            const col = cell % 6;
            return getLetterFromGrid(row, col);
          }).join('');
          setCurrentWord(newWord);
          return newCells;
        }
        const index = prev.indexOf(cellIndex);
        console.log('Trimming back to previously selected cell');
        const newCells = prev.slice(0, index + 1);
        const newWord = newCells.map(cell => {
          const row = Math.floor(cell / 6);
          const col = cell % 6;
          return getLetterFromGrid(row, col);
        }).join('');
        setCurrentWord(newWord);
        return newCells;
      }

      if (isAdjacent(prev[prev.length - 1], cellIndex)) {
        console.log('Adding adjacent cell');
        const newCells = [...prev, cellIndex];
        const word = newCells.map(cell => {
          const row = Math.floor(cell / 6);
          const col = cell % 6;
          return getLetterFromGrid(row, col);
        }).join('');
        setCurrentWord(word);
        return newCells;
      }

      console.log('Cell not adjacent, keeping current selection');
      return prev;
    });
  }, [getLetterFromGrid]);

  const handleSubmit = useCallback(() => {
    console.log('Submitting word:', currentWord);
    console.log('Current selected cells:', selectedCells);

    if (currentWord.length < 3) {
      console.log('Word too short');
      toast.error("Word must be at least 3 letters long!");
      return;
    }

    const selectedPositions = selectedCells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      return getPositionNumber(row, col);
    });

    console.log('Selected positions:', selectedPositions);

    const dayPositions = WORD_POSITIONS[day];
    if (!dayPositions) {
      console.error(`No word positions found for day ${day}`);
      return;
    }

    const wordEntry = Object.entries(dayPositions).find(([word, positions]) => {
      // Handle both single array and array of arrays (for words with multiple possible paths)
      const posArray = Array.isArray(positions[0]) ? (positions as number[][]) : [positions as number[]];
      return posArray.some(pos => arePositionsEqual(selectedPositions, pos));
    });

    if (wordEntry) {
      const [word] = wordEntry;
      console.log('Found valid word:', word);
      
      if (!foundWords.some(fw => fw.word.toLowerCase() === word.toLowerCase())) {
        // Check if it's the theme word first (theme word might not be in words array)
        let wordIndex = -1;
        if (word.toLowerCase() === themeWord.toLowerCase()) {
          wordIndex = words.length; // Theme word gets the last index
        } else {
          wordIndex = words.findIndex(w => w.toLowerCase() === word.toLowerCase());
        }
                         
        if (wordIndex !== -1) {
          setFoundWords([...foundWords, { word: word.toUpperCase(), index: wordIndex }]);
          
          if (word.toLowerCase() === themeWord.toLowerCase()) {
            toast.success("You found the theme word!");
          } else {
            toast.success(`Found word: ${word.toUpperCase()}!`);
          }
        }
      } else {
        toast.error("You've already found this word!");
      }
    } else {
      console.log('Invalid word pattern');
      toast.error("That's not a valid word pattern!");
    }

    setSelectedCells([]);
    setCurrentWord('');
  }, [currentWord, selectedCells, words, foundWords, setFoundWords, themeWord, day]);

  useEffect(() => {
    setSelectedCells([]);
    setCurrentWord('');
  }, [day]);

  return {
    selectedCells,
    currentWord,
    handleCellClick,
    handleSubmit
  };
}

const getPositionNumber = (row: number, col: number): number => {
  return (row + 1) * 10 + (col + 1);
};

const isAdjacent = (cell1: number, cell2: number): boolean => {
  const row1 = Math.floor(cell1 / 6);
  const col1 = cell1 % 6;
  const row2 = Math.floor(cell2 / 6);
  const col2 = cell2 % 6;
  
  return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
};

const arePositionsEqual = (selected: number[], solution: number[]): boolean => {
  if (selected.length !== solution.length) return false;
  return selected.every((pos, idx) => pos === solution[idx]);
};
