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

export function useWordSelection(
  words: string[],
  foundWords: Array<{word: string, index: number}>,
  setFoundWords: (words: Array<{word: string, index: number}>) => void,
  themeWord: string
) {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const getCurrentWord = (cells: number[]): string => {
    return cells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      return grid[row][col];
    }).join('');
  };

  const isCellInFoundWord = useCallback((rowIndex: number, colIndex: number) => {
    const cellPos = getPositionNumber(rowIndex, colIndex);
    return foundWords.some(({word}) => {
      const wordPositions = WORD_POSITIONS[word.toLowerCase()];
      return wordPositions?.includes(cellPos);
    });
  }, [foundWords]);

  const handleCellMouseDown = useCallback((rowIndex: number, colIndex: number) => {
    if (isCellInFoundWord(rowIndex, colIndex)) return;
    
    const cellIndex = rowIndex * 6 + colIndex;
    setIsDragging(true);
    setSelectedCells([cellIndex]);
    setCurrentWord(getCurrentWord([cellIndex]));
  }, [isCellInFoundWord]);

  const handleCellMouseEnter = useCallback((rowIndex: number, colIndex: number) => {
    if (!isDragging || isCellInFoundWord(rowIndex, colIndex)) return;

    const newCell = rowIndex * 6 + colIndex;
    const lastCell = selectedCells[selectedCells.length - 1];
    
    if (selectedCells.includes(newCell)) {
      const index = selectedCells.indexOf(newCell);
      setSelectedCells(prev => {
        const newCells = prev.slice(0, index + 1);
        setCurrentWord(getCurrentWord(newCells));
        return newCells;
      });
      return;
    }

    const lastRow = Math.floor(lastCell / 6);
    const lastCol = lastCell % 6;
    const isAdjacent = Math.abs(rowIndex - lastRow) <= 1 && Math.abs(colIndex - lastCol) <= 1;
    
    if (isAdjacent) {
      setSelectedCells(prev => {
        const newCells = [...prev, newCell];
        setCurrentWord(getCurrentWord(newCells));
        return newCells;
      });
    }
  }, [isDragging, selectedCells, isCellInFoundWord]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (currentWord.length < 3) {
      setSelectedCells([]);
      setCurrentWord('');
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
    } else if (currentWord.length >= 3) {
      toast.error("That's not a valid word pattern!");
    }
    
    setSelectedCells([]);
    setCurrentWord('');
  }, [isDragging, currentWord, selectedCells, words, foundWords, setFoundWords, themeWord]);

  return {
    selectedCells,
    currentWord,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleMouseUp
  };
}