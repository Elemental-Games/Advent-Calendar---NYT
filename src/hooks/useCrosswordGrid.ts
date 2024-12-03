import { useRef } from "react";
import type { CellPosition } from "@/components/crossword/types";

// This defines our crossword grid layout
// P E N D _
// O W I E _
// S A N T A
// E N J O Y
// _ _ A X E
export const GRID = [
  ["P", "E", "N", "D", " "],
  ["O", "W", "I", "E", " "],
  ["S", "A", "N", "T", "A"],
  ["E", "N", "J", "O", "Y"],
  [" ", " ", "A", "X", "E"]
];

export function useCrosswordGrid() {
  const cellRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(5).fill(null).map(() => Array(5).fill(null))
  );

  const isValidCell = (row: number, col: number) => {
    if (row < 0 || row >= 5 || col < 0 || col >= 5) return false;
    
    // All cells in SANTA and ENJOY rows are valid
    if (row === 2 || row === 3) return true;
    
    // AXE cells in the last row
    if (row === 4 && col >= 2 && col <= 4) return true;
    
    // Other cells are valid if they're not spaces
    return GRID[row][col] !== " ";
  };

  const getClueNumber = (rowIndex: number, colIndex: number) => {
    if (!isValidCell(rowIndex, colIndex)) return "";

    // Clue numbers for the puzzle
    if (rowIndex === 0 && colIndex === 0) return "1"; // PEND start
    if (rowIndex === 0 && colIndex === 1) return "2"; // Something starting with E
    if (rowIndex === 0 && colIndex === 2) return "3"; // Something starting with N
    if (rowIndex === 0 && colIndex === 3) return "4"; // Something starting with D
    if (rowIndex === 1 && colIndex === 0) return "5"; // OWIE start
    if (rowIndex === 2 && colIndex === 0) return "6"; // SANTA start
    if (rowIndex === 2 && colIndex === 4) return "7"; // Something ending with A
    if (rowIndex === 3 && colIndex === 0) return "8"; // ENJOY start
    if (rowIndex === 4 && colIndex === 2) return "9"; // AXE start
    return "";
  };

  const findNextCell = (
    currentRow: number,
    currentCol: number,
    showDown: boolean
  ): CellPosition | null => {
    if (showDown) {
      // Moving down
      for (let row = currentRow + 1; row < 5; row++) {
        if (isValidCell(row, currentCol)) {
          return { row, col: currentCol };
        }
      }
    } else {
      // Moving right
      for (let col = currentCol + 1; col < 5; col++) {
        if (isValidCell(currentRow, col)) {
          return { row: currentRow, col };
        }
      }
    }
    return null;
  };

  const findPreviousCell = (
    currentRow: number,
    currentCol: number,
    showDown: boolean
  ): CellPosition | null => {
    if (showDown) {
      // Moving up
      for (let row = currentRow - 1; row >= 0; row--) {
        if (isValidCell(row, currentCol)) {
          return { row, col: currentCol };
        }
      }
    } else {
      // Moving left
      for (let col = currentCol - 1; col >= 0; col--) {
        if (isValidCell(currentRow, col)) {
          return { row: currentRow, col };
        }
      }
    }
    return null;
  };

  return {
    GRID,
    cellRefs,
    isValidCell,
    getClueNumber,
    findNextCell,
    findPreviousCell
  };
}
