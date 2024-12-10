import { PuzzleContent } from './puzzle-types';
import { kringlePuzzles } from './puzzles/kringle-puzzles';
import { frostwordPuzzles } from './puzzles/frostword-puzzles';
import { northsortPuzzles } from './puzzles/northsort-puzzles';
import { garlandPuzzles } from './puzzles/garland-puzzles';

console.log('Loading puzzle data configuration');

export const puzzleData: { [key: number]: PuzzleContent } = {
  ...kringlePuzzles,
  ...frostwordPuzzles,
  ...northsortPuzzles,
  ...garlandPuzzles
};

console.log('Puzzle data loaded successfully');