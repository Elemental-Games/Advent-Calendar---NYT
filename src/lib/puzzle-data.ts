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
    word: "CRISP",
    title: "Kringle #4 🎅"
  },
  14: day14Puzzle,
  15: day15Puzzle,
  16: day16Puzzle,
  17: {
    type: "kringle",
    word: "YACHT",
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
    word: "ANGEL",
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
  }
};

console.log('Puzzle data loaded successfully');
