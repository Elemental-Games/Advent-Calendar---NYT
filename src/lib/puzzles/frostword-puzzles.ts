import { CrosswordPuzzle } from '../puzzle-types';

export const frostwordPuzzles: Record<number, CrosswordPuzzle> = {
  2: {
    type: "frostword",
    across: {
      "1": "Winter precipitation",
      "3": "Hot chocolate topping",
      "5": "Frozen water",
      "7": "Winter sport equipment",
      "8": "Cold season"
    },
    down: {
      "1": "Snowman's nose",
      "2": "Winter outerwear",
      "4": "Frozen rain",
      "6": "Winter vehicle"
    },
    size: { rows: 5, cols: 5 },
    answers: {
      "a1": "SNOW",
      "a3": "WHIP",
      "a5": "ICE",
      "a7": "SLED",
      "a8": "WINTER",
      "d1": "SNOW",
      "d2": "WRAP",
      "d4": "HAIL",
      "d6": "SLED"
    },
    grid: [
      ["S", "N", "O", "W", " "],
      ["L", " ", " ", "H", " "],
      ["E", " ", "I", "I", " "],
      ["D", " ", "C", "P", " "],
      [" ", " ", "E", " ", " "]
    ]
  },
  6: {
    type: "frostword",
    across: {
      "1": "Warm blanket",
      "4": "Holiday drink",
      "6": "Winter accessory",
      "7": "Frozen dessert",
      "8": "Snow structure"
    },
    down: {
      "1": "Quiet",
      "2": "Winter sport",
      "3": "Light source",
      "5": "Frozen water"
    },
    size: { rows: 5, cols: 5 },
    answers: {
      "a1": "QUILT",
      "a4": "COCOA",
      "a6": "SCARF",
      "a7": "ICE",
      "a8": "IGLOO",
      "d1": "QUIET",
      "d2": "SKI",
      "d3": "LAMP",
      "d5": "ICE"
    },
    grid: [
      ["Q", "U", "I", "L", "T"],
      [" ", " ", " ", "A", " "],
      ["S", "C", "A", "R", "F"],
      ["I", "C", "E", " ", " "],
      ["I", "G", "L", "O", "O"]
    ]
  },
  10: {
    type: "frostword",
    across: {
      "1": "Halloween costume",
      "4": "Spooky sound",
      "6": "Halloween treat",
      "8": "Trick or ___",
      "9": "Ghost sound"
    },
    down: {
      "1": "Scary",
      "2": "Halloween month",
      "3": "Black Halloween animal",
      "5": "Halloween light",
      "7": "Spooky"
    },
    size: { rows: 5, cols: 5 },
    answers: {
      "a1": "MUMMY",
      "a4": "HOWL",
      "a6": "CANDY",
      "a8": "TREAT",
      "a9": "BOO",
      "d1": "MAD",
      "d2": "OCT",
      "d3": "BAT",
      "d5": "LED",
      "d7": "BOO"
    },
    grid: [
      ["M", "U", "M", "M", "Y"],
      ["A", " ", " ", " ", " "],
      ["D", " ", "C", "A", "N"],
      ["T", "R", "E", "A", "T"],
      ["B", "O", "O", " ", " "]
    ]
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