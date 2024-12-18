import { CrosswordPuzzle } from '../puzzle-types';

export const day14Puzzle: CrosswordPuzzle = {
  type: "frostword",
  across: {
    "1": "What you do after counting sheep",
    "6": "Ups and Downs",
    "7": "You get WAYYY too many of these each work day",
    "8": "Same Here!",
    "9": "Typical high school student age"
  },
  down: {
    "1": "Holds tools in a backyard",
    "2": "Tells you the maximum of something",
    "3": "How you make me feel (soooo happy)",
    "4": "Top of the class, in the 1%",
    "5": "What you reach for, when scoring a TD (unless I put a bet on it)"
  },
  answers: {
    "a1": "SLEEP",
    "a6": "HILLY",
    "a7": "EMAIL",
    "a8": "DITTO",
    "a9": "TEEN",
    "d1": "SHED",
    "d2": "LIMIT",
    "d3": "ELATE",
    "d4": "ELITE",
    "d5": "PYLON"
  },
  size: {
    rows: 5,
    cols: 5
  },
  grid: [
    ["S", "L", "E", "E", "P"],
    ["H", "I", "L", "L", "Y"],
    ["E", "M", "A", "I", "L"],
    ["D", "I", "T", "T", "O"],
    [" ", "T", "E", "E", "N"]
  ]
};