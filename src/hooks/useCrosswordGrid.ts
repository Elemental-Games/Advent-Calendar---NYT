/**
 * Hook for managing the crossword grid state and operations.
 * Handles grid initialization, cell validation, clue numbering,
 * and navigation between cells.
 */

import { useRef } from "react";
import type { CellPosition } from "@/components/crossword/types";

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
    return GRID[row][col] !== " ";
  };

  const getClueNumber = (rowIndex: number, colIndex: number) => {
    if (!isValidCell(rowIndex, colIndex)) return "";

    // Only return numbers for cells that begin words
    const clueMap: Record<string, string> = {
      "0-0": "1", // Start of 1 across and 1 down
      "0-1": "2", // Start of 2 down
      "0-2": "3", // Start of 3 down
      "0-3": "4", // Start of 4 down
      "1-0": "5", // Start of 5 across
      "2-0": "6", // Start of 6 across
      "2-4": "7", // Start of 7 down
      "3-0": "8", // Start of 8 across
      "4-2": "9", // Start of 9 across (AXE)
    };

    return clueMap[`${rowIndex}-${colIndex}`] || "";
  };

  const findNextCell = (currentRow: number, currentCol: number, showDown: boolean): CellPosition | null => {
    if (showDown) {
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

  const findPreviousCell = (currentRow: number, currentCol: number, showDown: boolean): CellPosition | null => {
    if (showDown) {
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