import { format } from "date-fns";

export type PuzzleType = "kringle" | "frostword" | "northsort" | "garland";

export interface DayInfo {
  day: number;
  unlockTime: Date;
  puzzleType: PuzzleType;
  puzzleContent: PuzzleContent;
}

export interface PuzzleContent {
  word?: string;
  across?: Record<string, string>;
  down?: Record<string, string>;
  answers?: Record<string, string>;
  groups?: Array<{ category: string; color: string; words: string[] }>;
  words?: string[];
  themeWord?: string;
}

export function formatPuzzleTitle(day: number): string {
  return `${format(new Date(2023, 11, day), "MMMM do")}`;
}

export function formatCountdown(unlockTime: Date): string {
  const now = new Date();
  if (now >= unlockTime) {
    return "Available now";
  }

  const diff = unlockTime.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

export function generateCalendarData(): DayInfo[] {
  const baseDate = new Date(2023, 11, 1, 7, 30); // December 1st, 2023 at 7:30 AM
  
  return [
    {
      day: 1,
      unlockTime: new Date(baseDate.getTime()),
      puzzleType: "kringle",
      puzzleContent: {
        word: "MERRY"
      }
    },
    {
      day: 2,
      unlockTime: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000),
      puzzleType: "frostword",
      puzzleContent: {
        across: {
          "1": "Santa's favorite cookie",
          "3": "Frosty's nose",
          "4": "Christmas tree topper"
        },
        down: {
          "1": "Holiday drink with eggs",
          "2": "Pulls Santa's sleigh"
        },
        answers: {
          "1A": "SUGAR",
          "3A": "CARROT",
          "4A": "STAR",
          "1D": "SNOG",
          "2D": "DEER"
        }
      }
    },
    {
      day: 3,
      unlockTime: new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000),
      puzzleType: "northsort",
      puzzleContent: {
        groups: [
          {
            category: "Christmas Decorations",
            color: "bg-red-100",
            words: ["Garland", "Tinsel", "Lights", "Ornaments"]
          },
          {
            category: "Reindeer Names",
            color: "bg-green-100",
            words: ["Vixen", "Comet", "Dasher", "Cupid"]
          },
          {
            category: "Winter Weather",
            color: "bg-blue-100",
            words: ["Snow", "Frost", "Blizzard", "Sleet"]
          },
          {
            category: "Holiday Treats",
            color: "bg-yellow-100",
            words: ["Fudge", "Cookies", "Eggnog", "Candy"]
          }
        ]
      }
    },
    {
      day: 4,
      unlockTime: new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000),
      puzzleType: "garland",
      puzzleContent: {
        words: ["HOLLY", "JOLLY", "FOLLY", "FULLY", "FUNNY"],
        themeWord: "HOLLY"
      }
    }
  ];
}