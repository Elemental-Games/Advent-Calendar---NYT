export interface PuzzleStates {
  completed: boolean;
  completedGroups?: string[];
  gameOver?: boolean;
  remainingAttempts?: number;
  showCongrats?: boolean;
}

export interface PuzzleState {
  completed: boolean;
  completionTime?: number;
}