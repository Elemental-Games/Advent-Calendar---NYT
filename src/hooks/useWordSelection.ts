import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface WordValidityResult {
  valid: boolean;
  word?: string;
  index?: number;
}

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

  const handleCellMouseDown = useCallback((rowIndex: number, colIndex: number) => {
    const cellIndex = rowIndex * 6 + colIndex;
    const pos = getPositionNumber(rowIndex, colIndex);
    
    const isPartOfFoundWord = foundWords.some(({word}) => {
      const wordPositions = WORD_POSITIONS[word.toLowerCase()];
      return wordPositions?.includes(pos);
    });

    if (!isPartOfFoundWord) {
      setIsDragging(true);
      setSelectedCells([cellIndex]);
      setCurrentWord(getCurrentWord([cellIndex]));
    }
  }, [foundWords]);

  const handleCellMouseEnter = useCallback((rowIndex: number, colIndex: number) => {
    if (!isDragging) return;

    const newCell = rowIndex * 6 + colIndex;
    const pos = getPositionNumber(rowIndex, colIndex);
    
    const isPartOfFoundWord = foundWords.some(({word}) => {
      const wordPositions = WORD_POSITIONS[word.toLowerCase()];
      return wordPositions?.includes(pos);
    });

    if (isPartOfFoundWord) return;

    if (selectedCells.includes(newCell)) {
      const index = selectedCells.indexOf(newCell);
      setSelectedCells(prev => {
        const newCells = prev.slice(0, index + 1);
        setCurrentWord(getCurrentWord(newCells));
        return newCells;
      });
      return;
    }

    const lastCell = selectedCells[selectedCells.length - 1];
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
  }, [isDragging, selectedCells]);

  const checkWordValidity = useCallback((): WordValidityResult => {
    if (!isDragging || currentWord.length < 3) return { valid: false };
    
    const selectedPositions = selectedCells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      return getPositionNumber(row, col);
    });

    const wordEntry = Object.entries(WORD_POSITIONS).find(([word, positions]) => 
      selectedPositions.length === positions.length &&
      selectedPositions.every((pos, index) => pos === positions[index])
    );

    if (!wordEntry) return { valid: false };
    
    const [word] = wordEntry;
    const foundWord = foundWords.find(fw => fw.word.toLowerCase() === word.toLowerCase());
    
    if (!foundWord) {
      return {
        valid: true,
        word,
        index: words.indexOf(word)
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
    if (result.valid && result.word && typeof result.index === 'number') {
      setFoundWords([...foundWords, { word: result.word, index: result.index }]);
      
      if (result.word.toLowerCase() === themeWord.toLowerCase()) {
        toast.success("You found the theme word!");
      } else {
        toast.success(`Found word: ${result.word}!`);
      }
    } else if (currentWord.length >= 3) {
      toast.error("That's not a valid word pattern!");
    }
    
    setSelectedCells([]);
    setCurrentWord('');
  }, [isDragging, currentWord, foundWords, setFoundWords, themeWord]);

  return { selectedCells, currentWord, handleCellMouseDown, handleCellMouseEnter, handleMouseUp };
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