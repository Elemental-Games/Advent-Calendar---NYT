import { CrosswordPuzzle } from '../puzzle-types';

export const frostwordPuzzles: Record<number, CrosswordPuzzle> = {
  1: {
    word: "SNOWY"
  },
  5: {
    word: "QUILT"
  },
  9: {
    word: "MUMMY"
  },
  13: {
    word: "OCEAN"
  },
  14: {
    across: {
      "1": "Color of a Heart",
      "4": "I want to do this for every dog",
      "7": "People that earn their own BitCoin",
      "8": "Where I bought all of your Christmas gifts ; )",
      "9": "To wish something hadn't happen/Regret something"
    },
    down: {
      "1": "LA Football Team",
      "2": "Modify something",
      "3": "An organ _____",
      "5": "Machu Picchu location",
      "6": "Christmas ____"
    },
    answers: {
      "a1": "RED",
      "a4": "ADOPT",
      "a7": "MINER",
      "a8": "STORE",
      "a9": "RUE",
      "d1": "RAMS",
      "d2": "EDIT",
      "d3": "DONOR",
      "d5": "PERU",
      "d6": "TREE"
    },
    size: {
      rows: 5,
      cols: 5
    },
    grid: [
      ["R", "E", "D", " ", " "],
      ["A", "D", "O", "P", "T"],
      ["M", "I", "N", "E", "R"],
      ["S", "T", "O", "R", "E"],
      [" ", " ", "R", "U", "E"]
    ]
  }
};
