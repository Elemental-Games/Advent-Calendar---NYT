/**
 * Hook for managing the crossword grid state and operations.
 * Handles grid initialization, cell validation, clue numbering,
 * and navigation between cells.
 * Provides core functionality for the crossword puzzle interface.
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

    // Map each valid cell to a unique clue number 
    const clueMap: Record<string, string> = {
      "0-0": "1", // PEND start
      "0-1": "2",
      "0-2": "3",
      "0-3": "4",
      "1-0": "5", // OWIE start
      "1-1": "6",
      "1-2": "7",
      "1-3": "8",
      "2-0": "9", // SANTA start
      "2-1": "10",
      "2-2": "11",
      "2-3": "12",
      "2-4": "13",
      "3-0": "14", // ENJOY start
      "3-1": "15",
      "3-2": "16",
      "3-3": "17",
      "3-4": "18",
      "4-2": "19", // AXE start
      "4-3": "20",
      "4-4": "21"
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