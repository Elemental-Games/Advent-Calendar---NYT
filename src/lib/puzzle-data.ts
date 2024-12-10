import { PuzzleContent } from './puzzle-types';

console.log('Loading puzzle data configuration');

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
  },
  6: {
    type: "frostword",
    across: {
      "1": "Douglass ___",
      "4": "Your boss, maybe spelled different tho lol",
      "5": "2 weddings this day...(also goes with 1 down)",
      "6": "testing of a metal or ore/to determine ingredients",
      "7": "dogs are better pets than these"
    },
    down: {
      "1": "2 weddings this day...(also goes with 5 across)",
      "2": "these people lived in Machu Picchu and had their own civilization thing (lost city)",
      "3": "I don't think this is a word, but it's the name of a horse I've never heard of. I know you'll get this somehow",
      "4": "My dream job",
      "5": "I almost bought this Cyber Monday but I'm cheap"
    },
    answers: {
      "a1": "FIR",
      "a4": "NINA",
      "a5": "MARCH",
      "a6": "ASSAY",
      "a7": "CATS",
      "d1": "FIRST",
      "d2": "INCAS",
      "d3": "RAHY",
      "d4": "NASA",
      "d5": "MAC"
    },
    size: {
      rows: 5,
      cols: 5
    },
    grid: [
      [" ", " ", "F", "I", "R"],
      [" ", "N", "I", "N", "A"],
      ["M", "A", "R", "C", "H"],
      ["A", "S", "S", "A", "Y"],
      ["C", "A", "T", "S", " "]
    ]
  },
  7: {
    type: "northsort",
    groups: [
      {
        category: "Coffee Flavors",
        color: "rgb(234 179 8)", // Yellow
        words: ["HAZELNUT", "FRENCH VANILLA", "CARAMEL", "PEPPERMINT"]
      },
      {
        category: "Christmas Tree Types",
        color: "rgb(34 197 94)", // Green
        words: ["FIR", "SPRUCE", "CYPRESS", "PINE"]
      },
      {
        category: "Christmas Movies",
        color: "rgb(59 130 246)", // Blue
        words: ["ELF", "JACK FROST", "KRANKS", "GRINCH"]
      },
      {
        category: "Baking Snacks",
        color: "rgb(239 68 68)", // Red
        words: ["COOKIES", "BROWNIES", "CAKES", "BISCUITS"]
      }
    ]
  },
  8: {
    type: "garland",
    words: ["HERSHEY", "DARK", "RICH", "MILKY", "SWEETS", "TRUFFLES", "FUDGEY"],
    themeWord: "CHOCOLATE"
  },
  9: {
    word: "MUMMY"
  },
  10: {
    type: "frostword",
    across: {
      "1": "A bird's mouth",
      "5": "Brief____",
      "6": "Me everytime I want McDonalds",
      "8": "____ Mints",
      "9": "A dog's back legs"
    },
    down: {
      "1": "Secretly include on an email",
      "2": "We live on this",
      "3": "Super dry rice beer, Japenese. Sounds like a good bowl",
      "4": "The Home Alone kid",
      "7": "The ___"
    },
    answers: {
      "a1": "BEAK",
      "a5": "CASE",
      "a6": "CRAVE",
      "a8": "THIN",
      "a9": "HIND",
      "d1": "BCC",
      "d2": "EARTH",
      "d3": "ASAHI",
      "d4": "KEVIN",
      "d7": "END"
    },
    size: {
      rows: 5,
      cols: 5
    },
    grid: [
      ["B", "E", "A", "K", " "],
      ["C", "A", "S", "E", " "],
      ["C", "R", "A", "V", "E"],
      [" ", "T", "H", "I", "N"],
      [" ", "H", "I", "N", "D"]
    ]
  },
  11: {
    type: "northsort",
    groups: [
      {
        category: "Snow Sports",
        color: "rgb(234 179 8)", // Yellow
        words: ["SLALOM", "SKII", "MOGUL", "LUGE"]
      },
      {
        category: "Things that store things",
        color: "rgb(34 197 94)", // Green
        words: ["VAULT", "TANK", "BANK", "BAR"]
      },
      {
        category: "Birds with double meanings",
        color: "rgb(59 130 246)", // Blue
        words: ["CRANE", "DUCK", "SWIFT", "SWAN"]
      },
      {
        category: "Words that mean \"to jump\"",
        color: "rgb(239 68 68)", // Red
        words: ["SPRING", "RISE", "LEAP", "HOP"]
      }
    ]
  },
  12: {
    type: "garland",
    words: ["PENNE", "GNOCCHI", "FETTUCINE"],
    themeWord: "PASTA",
    grid: [
      ["P", "E", "C", "C", "H", "I"],
      ["N", "N", "N", "O", "N", "E"],
      ["E", "G", "U", "C", "I", "S"],
      ["E", "T", "T", "A", "P", "E"],
      ["F", "S", "T", "T", "Y", "Z"],
      ["P", "A", "I", "T", "I", "I"],
      ["L", "A", "S", "A", "N", "R"],
      ["A", "N", "G", "I", "T", "O"]
    ]
  }
};

console.log('Puzzle data loaded successfully');
