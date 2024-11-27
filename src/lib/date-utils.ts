import { format, differenceInMilliseconds } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export type PuzzleType = "kringle" | "frostword" | "northsort" | "garland";

interface WordlePuzzle {
  word: string;
}

interface CrosswordPuzzle {
  across: { [key: string]: string };
  down: { [key: string]: string };
  size: { rows: number; cols: number };
  answers?: Record<string, string>;
}

interface ConnectionsGroup {
  category: string;
  color: string;
  words: string[];
}

interface ConnectionsPuzzle {
  groups: ConnectionsGroup[];
}

interface StrandsPuzzle {
  words: string[];
  themeWord: string;
}

export type PuzzleContent = 
  | WordlePuzzle 
  | CrosswordPuzzle 
  | ConnectionsPuzzle 
  | StrandsPuzzle;

export interface DayInfo {
  day: number;
  puzzleType: PuzzleType;
  unlockTime: Date;
  puzzleContent?: PuzzleContent;
}

const UNLOCK_HOUR = 7;
const UNLOCK_MINUTE = 30;
const UNLOCK_TIMEZONE = "America/New_York";

export function createUnlockDate(day: number): Date {
  const date = new Date(2024, 11, day, UNLOCK_HOUR, UNLOCK_MINUTE);
  return fromZonedTime(date, UNLOCK_TIMEZONE);
}

export function getPuzzleType(day: number): PuzzleType {
  const types: PuzzleType[] = ["kringle", "frostword", "northsort", "garland"];
  return types[(day - 1) % 4] as PuzzleType;
}

export function getGameNumber(day: number): number {
  return Math.floor((day - 1) / 4) + 1;
}

export function formatPuzzleTitle(day: number): string {
  const type = getPuzzleType(day);
  const gameNumber = getGameNumber(day);
  
  const typeNames = {
    kringle: "Kringle",
    frostword: "FrostWord",
    northsort: "NorthSort",
    garland: "Garland"
  };
  
  return `Day ${day} - ${typeNames[type]} #${gameNumber}`;
}

export function formatCountdown(unlockTime: Date): string {
  const now = new Date();
  const diff = differenceInMilliseconds(unlockTime, now);

  if (diff <= 0) {
    return "Available now";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

const puzzleData: { [key: number]: PuzzleContent } = {
  1: {
    word: "SNOWY"
  },
  2: {
    across: {
      "1": "Santa's ride through the night sky",
      "3": "Shines bright atop the tree",
      "5": "Wrapped surprise under the tree"
    },
    down: {
      "1": "Children's plaything",
      "2": "Santa's little helper",
      "4": "Color of Rudolph's nose"
    },
    answers: {
      "a1": "SLEIGH",
      "a3": "STAR",
      "a5": "GIFT",
      "d1": "TOY",
      "d2": "ELF",
      "d4": "RED"
    },
    size: {
      rows: 5,
      cols: 5
    }
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
  }
};

export function generateCalendarData(): DayInfo[] {
  return Array.from({ length: 24 }, (_, i) => ({
    day: i + 1,
    puzzleType: getPuzzleType(i + 1),
    unlockTime: createUnlockDate(i + 1),
    puzzleContent: puzzleData[i + 1]
  }));
}