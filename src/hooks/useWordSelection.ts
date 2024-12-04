import { useState, useCallback } from 'react';
import { toast } from 'sonner';

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

const WORD_POSITIONS = {
  'santa': [71, 72, 73, 82, 81],
  'cookies': [86, 85, 84, 75, 76, 65, 66],
  'sleigh': [11, 12, 13, 23, 22, 21],
  'mistletoe': [31, 32, 41, 42, 43, 52, 51, 61, 62],
  'frost': [15, 16, 26, 25, 35],
  'rudolph': [36, 46, 56, 45, 55, 54, 64],
  'christmas': [83, 74, 63, 53, 44, 33, 34, 24, 14]
};

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

export function useWordSelection(
  words: string[],
  foundWords: Array<{word: string, index: number}>,
  setFoundWords: (words: Array<{word: string, index: number}>) => void,
  themeWord: string
) {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');

  console.log('useWordSelection - Initial render with words:', words);
  console.log('useWordSelection - Found words:', foundWords);

  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    console.log(`Cell clicked at (${rowIndex},${colIndex})`);
    const cellIndex = rowIndex * 6 + colIndex;

    setSelectedCells(prev => {
      // If this is the first cell or no cells are selected
      if (prev.length === 0) {
        console.log('First cell selected');
        const newWord = grid[rowIndex][colIndex];
        setCurrentWord(newWord);
        return [cellIndex];
      }

      // If clicking an already selected cell
      if (prev.includes(cellIndex)) {
        // If it's the last cell in the selection, remove it
        if (cellIndex === prev[prev.length - 1]) {
          console.log('Removing last selected cell');
          const newCells = prev.slice(0, -1);
          const newWord = newCells.map(cell => {
            const r = Math.floor(cell / 6);
            const c = cell % 6;
            return grid[r][c];
          }).join('');
          setCurrentWord(newWord);
          return newCells;
        }
        // If it's in the middle of the selection, trim back to that point
        const index = prev.indexOf(cellIndex);
        console.log('Trimming back to previously selected cell');
        const newCells = prev.slice(0, index + 1);
        const newWord = newCells.map(cell => {
          const r = Math.floor(cell / 6);
          const c = cell % 6;
          return grid[r][c];
        }).join('');
        setCurrentWord(newWord);
        return newCells;
      }

      // Check if the new cell is adjacent to the last selected cell
      if (isAdjacent(prev[prev.length - 1], cellIndex)) {
        console.log('Adding adjacent cell');
        const newCells = [...prev, cellIndex];
        const newWord = newCells.map(cell => {
          const r = Math.floor(cell / 6);
          const c = cell % 6;
          return grid[r][c];
        }).join('');
        setCurrentWord(newWord);
        return newCells;
      }

      console.log('Cell not adjacent, keeping current selection');
      return prev;
    });
  }, []);

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

    const wordEntry = Object.entries(WORD_POSITIONS).find(([word, positions]) => 
      selectedPositions.length === positions.length &&
      selectedPositions.every((pos, index) => pos === positions[index])
    );

    if (wordEntry) {
      const [word] = wordEntry;
      console.log('Found valid word:', word);
      
      if (!foundWords.some(fw => fw.word.toLowerCase() === word.toLowerCase())) {
        const wordIndex = words.indexOf(word);
        setFoundWords([...foundWords, { word, index: wordIndex }]);
        
        if (word.toLowerCase() === themeWord.toLowerCase()) {
          toast.success("You found the theme word!");
        } else {
          toast.success(`Found word: ${word}!`);
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
  }, [currentWord, selectedCells, words, foundWords, setFoundWords, themeWord]);

  return {
    selectedCells,
    currentWord,
    handleCellClick,
    handleSubmit
  };
}