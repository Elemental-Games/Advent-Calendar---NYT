export type PuzzleType = "kringle" | "frostword" | "northsort" | "garland";

export interface WordlePuzzle {
  type?: "kringle";
  word: string;
}

export interface CrosswordPuzzle {
  type?: "frostword";
  across: { [key: string]: string };
  down: { [key: string]: string };
  size: { rows: number; cols: number };
  answers?: Record<string, string>;
  grid?: string[][];
}

export interface ConnectionsGroup {
  category: string;
  color: string;
  words: string[];
}

export interface ConnectionsPuzzle {
  type?: "northsort";
  groups: ConnectionsGroup[];
}

export interface StrandsPuzzle {
  type?: "garland";
  words: string[];
  themeWord: string;
}

export type PuzzleContent = 
  | WordlePuzzle 
  | CrosswordPuzzle 
  | ConnectionsPuzzle 
  | StrandsPuzzle;

export interface DayInfo {
  day: number;
  puzzleType: PuzzleType;
  unlockTime: Date;
  puzzleContent?: PuzzleContent;
}