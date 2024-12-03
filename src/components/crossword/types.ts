/**
 * Type definitions for the crossword puzzle components.
 * Contains interfaces for game props, cell positions, and guess states.
 * Ensures type safety across the crossword implementation.
 */

export interface CrosswordGameProps {
  across: Record<string, string>;
  down: Record<string, string>;
  answers: Record<string, string>;
  onComplete?: () => void;
}

export interface CellPosition {
  row: number;
  col: number;
}

export interface GuessState {
  [key: string]: string;
}