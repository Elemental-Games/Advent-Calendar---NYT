import { PuzzleContent } from './puzzle-types';
import { day4Puzzle } from './puzzles/day4';
import { day8Puzzle } from './puzzles/day8';
import { day12Puzzle } from './puzzles/day12';
import { day14Puzzle } from './puzzles/day14';
import { day18Puzzle } from './puzzles/day18';

console.log('Loading puzzle data configuration');

export const puzzleData: { [key: number]: PuzzleContent } = {
  1: {
    type: "kringle",
    word: "SNOWY"
  },
  2: {
    type: "frostword",
    across: {
      "1": "Remain unfinished or undecided",
      "5": "A child's way of saying \"ouch!\"",
      "6": "Red hat guy",
      "8": "have a good time",
      "9": "needed to cut a tree"
    },
    down: {
      "1": "strike a ____",
      "2": "Obi Wan actor in Star Wars ____ McGregor",
      "3": "Stealthy Warrior",
      "4": "Cleansing Diet",
      "7": "LETS GO"
    },
    answers: {
      "a1": "PEND",
      "a5": "OWIE",
      "a6": "SANTA",
      "a8": "ENJOY",
      "a9": "AXE",
      "d1": "POSE",
      "d2": "EWAN",
      "d3": "NINJA",
      "d4": "DETOX",
      "d7": "AYE"
    },
    size: {
      rows: 5,
      cols: 5
    },
    grid: [
      ["P", "E", "N", "D", " "],
      ["O", "W", "I", "E", " "],
      ["S", "A", "N", "T", "A"],
      ["E", "N", "J", "O", "Y"],
      [" ", " ", "A", "X", "E"]
    ]
  },
  3: {
    type: "northsort",
    groups: [
      {
        category: "Decorations",
        color: "rgb(234 179 8)",
        words: ["STAR", "GARLAND", "ANGEL", "HOLLY"]
      },
      {
        category: "Santa's Snacks",
        color: "rgb(34 197 94)",
        words: ["COOKIES", "MILK", "CAKE", "MINTS"]
      },
      {
        category: "Gift Wrap",
        color: "rgb(59 130 246)",
        words: ["PAPER", "RIBBON", "STRING", "BOW"]
      },
      {
        category: "Holiday Drinks",
        color: "rgb(239 68 68)",
        words: ["EGGNOG", "WINE", "COFFEE", "BEER"]
      }
    ]
  },
  4: day4Puzzle,
  8: day8Puzzle,
  12: day12Puzzle,
  13: {
    type: "kringle",
    word: "CRISP"
  },
  14: day14Puzzle,
  17: {
    type: "kringle",
    word: "YACHT"
  },
  18: {
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
  }
};

console.log('Puzzle data loaded successfully');
