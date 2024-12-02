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