import { CrosswordPuzzle } from '../puzzle-types';

export const day18Puzzle: CrosswordPuzzle = {
  type: "frostword",
  across: {
    "1": "__ Ray/Radiation, also \"G\" in Greek",
    "6": "Being distant and/or having a standoffish manner",
    "7": "Italicized letters have a __",
    "8": "___ Direction",
    "9": "___ to go!"
  },
  down: {
    "1": "You don't pump this in NJ",
    "2": "I Guess I'll ___ it",
    "3": "Disney movie that JUST released its sequel",
    "4": "What I'm going to send you when you finish this puzzle",
    "5": "Toward the rear of a ship"
  },
  answers: {
    "a1": "GAMMA",
    "a6": "ALOOF",
    "a7": "SLANT",
    "a8": "ONE",
    "a9": "WAY",
    "d1": "GAS",
    "d2": "ALLOW",
    "d3": "MOANA",
    "d4": "MONEY",
    "d5": "AFT"
  },
  size: {
    rows: 5,
    cols: 5
  },
  grid: [
    ["G", "A", "M", "M", "A"],
    ["A", "L", "O", "O", "F"],
    ["S", "L", "A", "N", "T"],
    [" ", "O", "N", "E", " "],
    [" ", "W", "A", "Y", " "]
  ]
};