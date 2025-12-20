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
  6: {
    type: "frostword",
    across: {
      "1": "Bust (into), like the Kool-Aid Man",
      "6": "Yours is far too loud",
      "7": "Dish cooked on a skewer",
      "8": "Online invitation",
      "9": "Meal for the Passover Holiday"
    },
    down: {
      "1": "Cooks in the oven",
      "2": "This shit slaps",
      "3": "Foaming out the mouth",
      "4": "Things you walk over in cities that you can fall down apparently",
      "5": "___ Flicker"
    },
    answers: {
      "a1": "BARGE",
      "a6": "ALARM",
      "a7": "KEBAB",
      "a8": "EVITE",
      "a9": "SEDER",
      "d1": "BAKES",
      "d2": "ALEVE",
      "d3": "RABID",
      "d4": "GRATE",
      "d5": "EMBER"
    },
    size: {
      rows: 5,
      cols: 5
    },
    grid: [
      ["B", "A", "R", "G", "E"],
      ["A", "L", "A", "R", "M"],
      ["K", "E", "B", "A", "B"],
      ["E", "V", "I", "T", "E"],
      ["S", "E", "D", "E", "R"]
    ]
  },
  7: {
    type: "northsort",
    groups: [
      {
        category: "Things on our Christmas Tree",
        color: "rgb(234 179 8)",
        words: ["Snowflakes", "Lights", "Ornaments", "Star"]
      },
      {
        category: "Tesla Models",
        color: "rgb(34 197 94)",
        words: ["3", "X", "Y", "Plaid"]
      },
      {
        category: "Elekin Dragon Elements",
        color: "rgb(59 130 246)",
        words: ["Crystal", "Frost", "Sand", "Poison"]
      },
      {
        category: "Amazon",
        color: "rgb(239 68 68)",
        words: ["A-Z", "Lightning Deals", "Prime", "Trucks"]
      }
    ]
  },
  8: day8Puzzle,
  9: {
    type: "kringle",
    word: "BARON",
    title: "Kringle #3 🎅"
  },
  10: {
    type: "frostword",
    across: {
      "1": "Initialism for a remote employee",
      "4": "Rock, paper, scissors, ___!",
      "6": "Hooded winter jacket",
      "7": "Took part in a play",
      "8": "Something hidden in a fake rock"
    },
    down: {
      "1": "Give a sharp slap",
      "2": "Strong suit",
      "3": "Cheesy or corny",
      "4": "Business offering a salt scrub or body wrap",
      "5": "Slightest bit"
    },
    answers: {
      "a1": "WFH",
      "a4": "SHOOT",
      "a6": "PARKA",
      "a7": "ACTED",
      "a8": "KEY",
      "d1": "WHACK",
      "d2": "FORTE",
      "d3": "HOKEY",
      "d4": "SPA",
      "d5": "TAD"
    },
    size: {
      rows: 5,
      cols: 5
    },
    grid: [
      [" ", "W", "F", "H", " "],
      ["S", "H", "O", "O", "T"],
      ["P", "A", "R", "K", "A"],
      ["A", "C", "T", "E", "D"],
      [" ", "K", "E", "Y", " "]
    ]
  },
  11: {
    type: "northsort",
    groups: [
      {
        category: "First Name of Christmas Figures",
        color: "rgb(234 179 8)",
        words: ["Santa", "Heat", "Jack", "Cold"]
      },
      {
        category: "Types of Oil",
        color: "rgb(34 197 94)",
        words: ["Olive", "Avocado", "Motor", "Coconut"]
      },
      {
        category: "Cool Birds",
        color: "rgb(59 130 246)",
        words: ["Eagle", "Hawk", "Owl", "Seagull"]
      },
      {
        category: "Ways to Score in Football",
        color: "rgb(239 68 68)",
        words: ["Safety", "Touchdown", "Extra Point", "2PT Conversion"]
      }
    ]
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
  20: day20Puzzle,
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