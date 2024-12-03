/**
 * Type definitions for the crossword puzzle components.
 * Contains interfaces for game props, cell positions, and guess states.
 * Ensures type safety across the crossword implementation.
 * Includes validation-related types and interfaces.
 */

export interface CrosswordGameProps {
  across: Record<string, string>;
  down: Record<string, string>;
  answers: Record<string, string>;
  onComplete?: () => void;
  day: number;
}

export interface CrosswordGridProps {
  grid: string[][];
  guesses: Record<string, string>;
  showDown: boolean;
  selectedCell: { row: number; col: number } | null;
  isValidCell: (row: number, col: number) => boolean;
  getClueNumber: (row: number, col: number) => string;
  handleCellClick: (row: number, col: number) => void;
  handleInputChange: (row: number, col: number, value: string) => void;
  cellRefs: React.MutableRefObject<(HTMLInputElement | null)[][]>;
  validatedCells?: Record<string, boolean>;
}

export interface CellPosition {
  row: number;
  col: number;
}

export interface GuessState {
  [key: string]: string;
}