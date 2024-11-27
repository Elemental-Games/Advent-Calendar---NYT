import { format } from "date-fns";

export type PuzzleType = "kringle" | "frostword" | "northsort" | "garland";

export interface PuzzleContent {
  word?: string;
  across?: Record<string, string>;
  down?: Record<string, string>;
  answers?: Record<string, string>;
  groups?: Array<{ category: string; color: string; words: string[] }>;
  words?: string[];
  themeWord?: string;
}

export interface CalendarDay {
  day: number;
  puzzleType: PuzzleType;
  puzzleContent: PuzzleContent;
}

export function formatPuzzleTitle(day: number): string {
  return `${format(new Date(2023, 11, day), "MMMM do")}`;
}

export function generateCalendarData(): CalendarDay[] {
  return [
    {
      day: 1,
      puzzleType: "kringle",
      puzzleContent: {
        word: "MERRY"
      }
    },
    {
      day: 2,
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
      puzzleType: "northsort",
      puzzleContent: {
        groups: [
          {
            category: "Christmas Decorations",
            color: "bg-red-100",
            words: ["Tinsel", "Ornaments", "Garland", "Lights"]
          },
          {
            category: "Reindeer Names",
            color: "bg-green-100",
            words: ["Comet", "Cupid", "Dasher", "Vixen"]
          },
          {
            category: "Winter Weather",
            color: "bg-blue-100",
            words: ["Frost", "Blizzard", "Sleet", "Snow"]
          },
          {
            category: "Holiday Treats",
            color: "bg-yellow-100",
            words: ["Eggnog", "Cookies", "Candy", "Fudge"]
          }
        ]
      }
    },
    {
      day: 4,
      puzzleType: "garland",
      puzzleContent: {
        words: ["HOLLY", "JOLLY", "FOLLY", "FULLY", "FUNNY"],
        themeWord: "HOLLY"
      }
    }
  ];
}