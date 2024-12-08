import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const WORD_POSITIONS = {
  'hershey': [25, 26, 16, 15, 14, 13, 12],
  'dark': [43, 33, 23, 24],
  'rich': [46, 36, 35, 34],
  'milky': [53, 54, 55, 45, 44],
  'sweets': [73, 63, 64, 65, 66, 56],  // Updated positions for SWEETS
  'truffles': [83, 84, 85, 86, 76, 75, 74, 73],
  'fudgey': [31, 41, 51, 61, 71, 81],
  'chocolate': [11, 21, 22, 32, 42, 52, 62, 72, 82]
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
          setCurrentWord(newCells.map(cell => {
            const row = Math.floor(cell / 6);
            const col = cell % 6;
            return getLetterFromGrid(row, col);
          }).join(''));
          return newCells;
        }
        const index = prev.indexOf(cellIndex);
        console.log('Trimming back to previously selected cell');
        const newCells = prev.slice(0, index + 1);
        setCurrentWord(newCells.map(cell => {
          const row = Math.floor(cell / 6);
          const col = cell % 6;
          return getLetterFromGrid(row, col);
        }).join(''));
        return newCells;
      }

      if (isAdjacent(prev[prev.length - 1], cellIndex)) {
        console.log('Adding adjacent cell');
        const newCells = [...prev, cellIndex];
        setCurrentWord(newCells.map(cell => {
          const row = Math.floor(cell / 6);
          const col = cell % 6;
          return getLetterFromGrid(row, col);
        }).join(''));
        return newCells;
      }

      console.log('Cell not adjacent, keeping current selection');
      return prev;
    });
  }, []);

  const getLetterFromGrid = (row: number, col: number): string => {
    const grid = [
      ['C', 'Y', 'E', 'H', 'S', 'R'],
      ['H', 'O', 'R', 'K', 'H', 'E'],
      ['F', 'C', 'A', 'I', 'C', 'H'],
      ['U', 'O', 'D', 'Y', 'K', 'R'],
      ['D', 'L', 'M', 'I', 'L', 'T'],
      ['G', 'A', 'W', 'E', 'E', ' '],
      ['E', 'T', 'S', 'E', 'L', 'F'],
      ['Y', 'E', 'T', 'R', 'U', 'F']
    ];
    return grid[row][col];
  };

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

    const wordEntry = Object.entries(WORD_POSITIONS).find(([word, positions]) => {
      const positionsMatch = selectedPositions.length === positions.length &&
        selectedPositions.every((pos, index) => pos === positions[index]);
      console.log(`Checking word ${word}:`, positionsMatch);
      return positionsMatch;
    });

    if (wordEntry) {
      const [word] = wordEntry;
      console.log('Found valid word:', word);
      
      if (!foundWords.some(fw => fw.word.toLowerCase() === word.toLowerCase())) {
        const wordIndex = words.findIndex(w => w.toLowerCase() === word.toLowerCase()) || 
                         (word.toLowerCase() === themeWord.toLowerCase() ? words.length : -1);
                         
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
  }, [currentWord, selectedCells, words, foundWords, setFoundWords, themeWord]);

  return {
    selectedCells,
    currentWord,
    handleCellClick,
    handleSubmit
  };
}