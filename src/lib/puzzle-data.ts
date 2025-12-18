import { PuzzleContent } from './puzzle-types';
import { day4Puzzle } from './puzzles/day4';
import { day8Puzzle } from './puzzles/day8';
import { day12Puzzle } from './puzzles/day12';
import { day14Puzzle } from './puzzles/day14';
import { day15Puzzle } from './puzzles/day15';
import { day16Puzzle } from './puzzles/day16';
import { day18Puzzle } from './puzzles/day18';
import { day19Puzzle } from './puzzles/day19';
import { day20Puzzle } from './puzzles/day20';
import { day24Puzzle } from './puzzles/day24';

console.log('Loading puzzle data configuration');

export const puzzleData: { [key: number]: PuzzleContent } = {
  1: {
    type: "kringle",
    word: "QUEUE",
    title: "Kringle #1 🎅"
  },
  2: {
    type: "frostword",
    across: {
      "1": ";)",
      "5": "Home to the Browns",
      "6": "Past tense of a farm noise",
      "7": "Pet Adoption Org (not AKC lol)",
      "8": "Yours are rosy"
    },
    down: {
      "1": "Synonym of SHEEESH but like a fast noise",
      "2": "Fingers Crossed",
      "3": "Your sister's daughter",
      "4": "Rapper named after a camera brand",
      "6": "I made this crossword on my ___"
    },
    answers: {
      "a1": "WINK",
      "a5": "OHIO",
      "a6": "MOOED",
      "a7": "ASPCA",
      "a8": "CHEEK",
      "d1": "WOOSH",
      "d2": "IHOPE",
      "d3": "NIECE",
      "d4": "KODAK",
      "d6": "MAC"
    },
    size: {
      rows: 5,
      cols: 5
    },
    grid: [
      [" ", "W", "I", "N", "K"],
      [" ", "O", "H", "I", "O"],
      ["M", "O", "O", "E", "D"],
      ["A", "S", "P", "C", "A"],
      ["C", "H", "E", "E", "K"]
    ]
  },
  3: {
    type: "northsort",
    groups: [
      {
        category: "Apartments",
        color: "rgb(234 179 8)",
        words: ["SKYE", "ARRIVE", "RIVERVIEW", "POINT"]
      },
      {
        category: "Pizza Styles",
        color: "rgb(34 197 94)",
        words: ["ROUND", "PERSONAL", "SICILIAN", "LARGE"]
      },
      {
        category: "What we need for the Apartment",
        color: "rgb(59 130 246)",
        words: ["ENTRYWAY TABLE", "LAMPS", "PICTURES", "PEPPER"]
      },
      {
        category: "Ending Syllables of Popular Stores",
        color: "rgb(239 68 68)",
        words: ["THE MART", "GO GET", "BIG BUCKS", "GO NUTS"]
      }
    ]
  },
  4: day4Puzzle,
  5: {
    type: "kringle",
    word: "FUDGE",
    title: "Kringle #2 🎅"
  },
  8: day8Puzzle,
  9: {
    type: "kringle",
    word: "BARON",
    title: "Kringle #3 🎅"
  },
  12: day12Puzzle,
  13: {
    type: "kringle",
    word: "LOVER",
    title: "Kringle #4 🎅"
  },
  14: day14Puzzle,
  15: day15Puzzle,
  16: day16Puzzle,
  17: {
    type: "kringle",
    word: "OREOS",
    title: "Kringle #5 🎅"
  },
  18: day18Puzzle,
  19: {
    type: "northsort",
    groups: [
      {
        category: "Weather Terms",
        color: "rgb(234 179 8)", // yellow
        words: ["Clear", "Bright", "Hazy", "Fair"]
      },
      {
        category: "Types of Wine",
        color: "rgb(34 197 94)", // green
        words: ["Red", "White", "Sparkling", "Rosé"]
      },
      {
        category: "Browsers",
        color: "rgb(59 130 246)", // blue
        words: ["Chrome", "Edge", "Safari", "Brave"]
      },
      {
        category: "Text Styling",
        color: "rgb(239 68 68)", // red
        words: ["Bold", "Italic", "Plain", "Black"]
      }
    ]
  },
  20: {
    type: "garland",
    words: ["FANTASY", "LADD", "COURTLAND", "LAMAR", "WALKER", "MONTGOMERY", "LAPORTA"],
    themeWord: "FANTASY"
  },
  21: {
    type: "kringle",
    word: "SMART",
    title: "Kringle #6 🎅"
  },
  22: {
    type: "frostword",
    across: {
      "1": "Obi-Wan & Luke Skywalker",
      "5": "What you're going to do tomorrow ___ ___ (5 and 6 across, respectively)",
      "6": "What you're going to do tomorrow ___ ___ (5 and 6 across, respectively)",
      "8": "Center of an Apple",
      "9": "A thing to sit on"
    },
    down: {
      "1": "Not quite a run",
      "2": "CRAZY Stories! Also, a rarity in Elemental Masters ; )",
      "3": "a suffix similar to 're' and then an enemy is a ___",
      "4": "Within/Lead-in",
      "7": "Ready, ___, GO!"
    },
    answers: {
      "a1": "JEDI",
      "a5": "OPEN",
      "a6": "GIFTS",
      "a8": "CORE",
      "a9": "SEAT",
      "d1": "JOG",
      "d2": "EPICS",
      "d3": "DEFOE",
      "d4": "INTRA",
      "d7": "SET"
    },
    size: {
      rows: 5,
      cols: 5
    },
    grid: [
      ["J", "E", "D", "I", " "],
      ["O", "P", "E", "N", " "],
      ["G", "I", "F", "T", "S"],
      [" ", "C", "O", "R", "E"],
      [" ", "S", "E", "A", "T"]
    ],
    title: "Mini FrostWord #6"
  },
  23: {
    type: "northsort",
    groups: [
      {
        category: "Nicknames for each other",
        color: "rgb(234 179 8)", // yellow
        words: ["Baby", "Love", "Slime", "Best Friend"]
      },
      {
        category: "The perfect breakfast doesn't exi...",
        color: "rgb(34 197 94)", // green
        words: ["Sweet", "Savory", "Coffee", "Mimosa"]
      },
      {
        category: "Who you get gifts for",
        color: "rgb(59 130 246)", // blue
        words: ["Family", "Friends", "Boyfriend", "Pet"]
      },
      {
        category: "How I describe you to anyone & everyone",
        color: "rgb(239 68 68)", // red
        words: ["Perfect", "Smart", "Funny", "Beautiful"]
      }
    ]
  },
  24: day24Puzzle
};

console.log('Puzzle data loaded successfully');