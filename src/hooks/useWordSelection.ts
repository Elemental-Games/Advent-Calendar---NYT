import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface WordValidityResult {
  valid: boolean;
  word?: string;
  index?: number;
}

export function useWordSelection(
  words: string[],
  foundWords: string[],
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

  const handleCellMouseDown = useCallback((rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * 6 + colIndex;
    const word = getCurrentWord([cellIndex]);
    
    // Check if the cell is part of an already found word
    const isPartOfFoundWord = foundWords.some(foundWord => {
      const wordPositions = WORD_POSITIONS[foundWord.toLowerCase()];
      if (!wordPositions) return false;
      
      const pos = getPositionNumber(rowIndex, colIndex);
      return wordPositions.includes(pos);
    });

    if (!isPartOfFoundWord) {
      setIsDragging(true);
      setSelectedCells([cellIndex]);
      setCurrentWord(word);
    }
  }, [foundWords]);

  const handleCellMouseEnter = useCallback((rowIndex: number, colIndex: number) => {
    if (!isDragging) return;

    const newCell = rowIndex * 6 + colIndex;
    const lastCell = selectedCells[selectedCells.length - 1];
    
    // Check if the cell is part of an already found word
    const isPartOfFoundWord = foundWords.some(foundWord => {
      const wordPositions = WORD_POSITIONS[foundWord.toLowerCase()];
      if (!wordPositions) return false;
      
      const pos = getPositionNumber(rowIndex, colIndex);
      return wordPositions.includes(pos);
    });

    if (isPartOfFoundWord) return;

    if (selectedCells.includes(newCell)) {
      const index = selectedCells.indexOf(newCell);
      const newSelectedCells = selectedCells.slice(0, index + 1);
      setSelectedCells(newSelectedCells);
      setCurrentWord(getCurrentWord(newSelectedCells));
      return;
    }

    const lastRow = Math.floor(lastCell / 6);
    const lastCol = lastCell % 6;
    const isAdjacent = Math.abs(rowIndex - lastRow) <= 1 && Math.abs(colIndex - lastCol) <= 1;
    
    if (isAdjacent) {
      const newSelectedCells = [...selectedCells, newCell];
      setSelectedCells(newSelectedCells);
      setCurrentWord(getCurrentWord(newSelectedCells));
    }
  }, [isDragging, selectedCells, foundWords]);

  const checkWordValidity = useCallback((): WordValidityResult => {
    if (!isDragging || currentWord.length < 3) {
      return { valid: false };
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

    if (wordEntry && !foundWords.includes(wordEntry[0])) {
      return { 
        valid: true, 
        word: wordEntry[0], 
        index: words.indexOf(wordEntry[0]) 
      };
    }

    return { valid: false };
  }, [isDragging, currentWord, selectedCells, foundWords, words]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (currentWord.length < 3) {
      setSelectedCells([]);
      setCurrentWord('');
      return;
    }

    const result = checkWordValidity();
    if (result.valid && typeof result.index === 'number' && result.word) {
      setFoundWords([...foundWords.map(w => typeof w === 'string' ? { word: w, index: words.indexOf(w) } : w), { word: result.word, index: result.index }]);
    } else if (currentWord.length >= 3) {
      toast.error("That's not a valid word pattern!");
    }
    
    setSelectedCells([]);
    setCurrentWord('');
  }, [isDragging, currentWord, words, foundWords, setFoundWords, checkWordValidity]);

  return {
    selectedCells,
    currentWord,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleMouseUp
  };
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