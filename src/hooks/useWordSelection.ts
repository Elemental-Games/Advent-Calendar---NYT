import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// Word position mappings
const WORD_POSITIONS = {
  'santa': [71, 72, 73, 82, 81],
  'cookies': [86, 85, 84, 75, 76, 65, 66],  // Updated positions
  'sleigh': [11, 12, 13, 23, 22, 21],
  'mistletoe': [31, 32, 41, 42, 43, 52, 51, 61, 62],
  'frost': [15, 16, 26, 25, 35],
  'rudolph': [36, 46, 56, 45, 55, 54, 64],  // Updated positions
  'christmas': [83, 74, 63, 53, 44, 33, 34, 24, 14]
};

// Convert grid position (row, col) to position number
const getPositionNumber = (row: number, col: number): number => {
  return (row + 1) * 10 + (col + 1);
};

// Convert position number to grid position
const getGridPosition = (pos: number): [number, number] => {
  const row = Math.floor(pos / 10) - 1;
  const col = (pos % 10) - 1;
  return [row, col];
};

export function useWordSelection(
  words: string[],
  foundWords: string[],
  setFoundWords: (words: string[]) => void,
  themeWord: string,
  onComplete?: () => void
) {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const isWordFound = (word: string) => foundWords.includes(word);

  const getCurrentWord = (cells: number[]): string => {
    return cells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      return grid[row][col];
    }).join('');
  };

  const handleCellMouseDown = useCallback((rowIndex: number, colIndex: number) => {
    console.log('Mouse down on cell:', rowIndex, colIndex, 'Position:', getPositionNumber(rowIndex, colIndex));
    if (!isWordFound(getCurrentWord([rowIndex * 6 + colIndex]))) {
      setIsDragging(true);
      setSelectedCells([rowIndex * 6 + colIndex]);
      setCurrentWord(getCurrentWord([rowIndex * 6 + colIndex]));
    }
  }, []);

  const handleCellMouseEnter = useCallback((rowIndex: number, colIndex: number) => {
    if (!isDragging) return;

    const newCell = rowIndex * 6 + colIndex;
    const lastCell = selectedCells[selectedCells.length - 1];
    
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
  }, [isDragging, selectedCells]);

  const checkWordValidity = useCallback(() => {
    if (!isDragging || currentWord.length < 3) return false;
    
    // Check if the selected cells match any word's position pattern
    const selectedPositions = selectedCells.map(cell => {
      const row = Math.floor(cell / 6);
      const col = cell % 6;
      const pos = getPositionNumber(row, col);
      console.log('Selected position:', pos, 'for cell:', row, col);
      return pos;
    });

    console.log('Checking word:', currentWord, 'positions:', selectedPositions);
    console.log('Valid positions:', WORD_POSITIONS);

    const isValidWord = Object.entries(WORD_POSITIONS).some(([validWord, positions]) => {
      console.log('Comparing with:', validWord, positions);
      if (selectedPositions.length === positions.length) {
        const matches = selectedPositions.every((pos, index) => pos === positions[index]);
        console.log('Positions match?', matches);
        return matches;
      }
      return false;
    });

    return isValidWord && !foundWords.includes(currentWord);
  }, [isDragging, currentWord, selectedCells, foundWords]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const word = currentWord;
    
    if (word.length < 3) {
      setSelectedCells([]);
      setCurrentWord('');
      return;
    }

    if (checkWordValidity()) {
      setFoundWords([...foundWords, word]);
      if (word.toLowerCase() === themeWord.toLowerCase()) {
        toast.success("Congratulations! You found the theme word!");
      } else {
        toast.success(`Found word: ${word}!`);
      }

      if (foundWords.length + 1 === words.length) {
        toast.success('Congratulations! You found all the words!');
        onComplete?.();
      }
    } else if (word.length >= 3) {
      toast.error("That's not a valid word pattern!");
    }
    
    setSelectedCells([]);
    setCurrentWord('');
  }, [isDragging, currentWord, words, foundWords, themeWord, onComplete, checkWordValidity]);

  return {
    selectedCells,
    currentWord,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleMouseUp
  };
}

// Define the grid as a constant since it's static
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