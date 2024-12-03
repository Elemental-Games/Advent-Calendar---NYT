export interface PuzzleState {
  completed: boolean;
  completionTime: number;
  guesses?: Record<string, string>;
}

export interface PuzzleStates {
  [puzzleId: string]: PuzzleState;
}