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

const isAdjacent = (cell1: number, cell2: number) => {
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

  const isCellInFoundWord = useCallback((rowIndex: number, colIndex: number) => {
    const cellPos = getPositionNumber(rowIndex, colIndex);
    return foundWords.some(({word}) => {
      const wordPositions = WORD_POSITIONS[word.toLowerCase()];
      return wordPositions?.includes(cellPos);
    });
  }, [foundWords]);

  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    if (isCellInFoundWord(rowIndex, colIndex)) return;
    
    const cellIndex = rowIndex * 6 + colIndex;
    console.log('Cell clicked:', cellIndex);

    setSelectedCells(prev => {
      // If cell is already selected and it's the last one, remove it
      if (prev[prev.length - 1] === cellIndex) {
        const newCells = prev.slice(0, -1);
        setCurrentWord(getCurrentWord(newCells));
        return newCells;
      }
      
      // If cell is already selected somewhere else, trim the selection up to that point
      const existingIndex = prev.indexOf(cellIndex);
      if (existingIndex !== -1) {
        const newCells = prev.slice(0, existingIndex + 1);
        setCurrentWord(getCurrentWord(newCells));
        return newCells;
      }

      // If no cells are selected or the clicked cell is adjacent to the last selected cell
      if (prev.length === 0 || isAdjacent(prev[prev.length - 1], cellIndex)) {
        const newCells = [...prev, cellIndex];
        setCurrentWord(getCurrentWord(newCells));
        return newCells;
      }

      // If clicked cell is not adjacent, start a new selection
      const newCells = [cellIndex];
      setCurrentWord(getCurrentWord(newCells));
      return newCells;
    });
  }, [isCellInFoundWord]);

  const getCurrentWord = (cells: number[]): string => {
    return cells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      return grid[row][col];
    }).join('');
  };

  const handleSubmit = useCallback(() => {
    if (currentWord.length < 3) {
      toast.error("Word must be at least 3 letters long!");
      return;
    }

    const selectedPositions = selectedCells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      return getPositionNumber(row, col);
    });

    const wordEntry = Object.entries(WORD_POSITIONS).find(([word, positions]) => 
      selectedPositions.length === positions.length &&
      selectedPositions.every((pos, index) => pos === positions[index])
    );

    if (wordEntry && !foundWords.some(fw => fw.word.toLowerCase() === wordEntry[0].toLowerCase())) {
      const [word] = wordEntry;
      const wordIndex = words.indexOf(word);
      setFoundWords([...foundWords, { word, index: wordIndex }]);
      
      if (word.toLowerCase() === themeWord.toLowerCase()) {
        toast.success("You found the theme word!");
      } else {
        toast.success(`Found word: ${word}!`);
      }
    } else {
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