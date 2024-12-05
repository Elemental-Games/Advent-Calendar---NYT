import { PuzzleContent } from './puzzle-types';

export const puzzleData: { [key: number]: PuzzleContent } = {
  1: {
    word: "SNOWY"
  },
  2: {
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
  4: {
    words: ["SANTA", "SLEIGH", "RUDOLPH", "PRESENTS", "COOKIES", "STOCKINGS", "MISTLETOE"],
    themeWord: "CHRISTMAS"
  },
  5: {
    word: "QUILT"
  }
};