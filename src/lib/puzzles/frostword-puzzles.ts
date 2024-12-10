import { CrosswordPuzzle } from '../puzzle-types';

export const frostwordPuzzles: Record<number, CrosswordPuzzle> = {
  1: {
    type: "frostword",
    across: {},
    down: {},
    size: { rows: 5, cols: 5 },
    answers: {},
    grid: []
  },
  5: {
    type: "frostword",
    across: {},
    down: {},
    size: { rows: 5, cols: 5 },
    answers: {},
    grid: []
  },
  9: {
    type: "frostword",
    across: {},
    down: {},
    size: { rows: 5, cols: 5 },
    answers: {},
    grid: []
  },
  13: {
    type: "frostword",
    across: {},
    down: {},
    size: { rows: 5, cols: 5 },
    answers: {},
    grid: []
  },
  14: {
    type: "frostword",
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
    size: { rows: 5, cols: 5 },
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
    grid: [
      ["R", "E", "D", " ", " "],
      ["A", "D", "O", "P", "T"],
      ["M", "I", "N", "E", "R"],
      ["S", "T", "O", "R", "E"],
      [" ", " ", "R", "U", "E"]
    ]
  }
};