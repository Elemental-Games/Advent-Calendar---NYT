import { useState, useCallback } from 'react';
import { toast } from 'sonner';

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
      // If hovering over a previously selected cell, remove all cells after it
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

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const word = currentWord;
    
    if (word.length < 3) {
      setSelectedCells([]);
      setCurrentWord('');
      return;
    }

    if (words.includes(word) && !foundWords.includes(word)) {
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
    }
    setSelectedCells([]);
    setCurrentWord('');
  }, [isDragging, currentWord, words, foundWords, themeWord, onComplete]);

  return {
    selectedCells,
    currentWord,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleMouseUp
  };
}