import { useRef } from "react";
import type { GuessState, CellPosition } from "@/components/crossword/types";

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
    // Updated valid cell logic to include all cells that should accept input
    if (row < 0 || row >= 5 || col < 0 || col >= 5) return false;
    return GRID[row][col] !== " ";
  };

  const getClueNumber = (rowIndex: number, colIndex: number) => {
    if (!isValidCell(rowIndex, colIndex)) return "";

    // Updated clue number mapping to include all valid positions
    if (rowIndex === 0 && colIndex === 0) return "1";
    if (rowIndex === 0 && colIndex === 1) return "2";
    if (rowIndex === 0 && colIndex === 2) return "3";
    if (rowIndex === 0 && colIndex === 3) return "4";
    if (rowIndex === 1 && colIndex === 0) return "5";
    if (rowIndex === 2 && colIndex === 0) return "6";
    if (rowIndex === 2 && colIndex === 4) return "7";
    if (rowIndex === 3 && colIndex === 0) return "8";
    if (rowIndex === 4 && colIndex === 2) return "9";
    return "";
  };

  const findNextCell = (
    currentRow: number,
    currentCol: number,
    isDown: boolean
  ): CellPosition | null => {
    if (isDown) {
      for (let row = currentRow + 1; row < 5; row++) {
        if (isValidCell(row, currentCol)) {
          return { row, col: currentCol };
        }
      }
    } else {
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
    isDown: boolean
  ): CellPosition | null => {
    if (isDown) {
      for (let row = currentRow - 1; row >= 0; row--) {
        if (isValidCell(row, currentCol)) {
          return { row, col: currentCol };
        }
      }
    } else {
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