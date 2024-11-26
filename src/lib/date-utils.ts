import { format, differenceInMilliseconds } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export type PuzzleType = "wordle" | "crossword" | "connections" | "strands";

export interface DayInfo {
  day: number;
  puzzleType: PuzzleType;
  unlockTime: Date;
}

const UNLOCK_HOUR = 7;
const UNLOCK_MINUTE = 30;
const UNLOCK_TIMEZONE = "America/New_York";

export function createUnlockDate(day: number): Date {
  const date = new Date(2024, 11, day, UNLOCK_HOUR, UNLOCK_MINUTE);
  return zonedTimeToUtc(date, UNLOCK_TIMEZONE);
}

export function getPuzzleType(day: number): PuzzleType {
  const types: PuzzleType[] = ["wordle", "crossword", "connections", "strands"];
  return types[(day - 1) % 4] as PuzzleType;
}

export function formatCountdown(targetDate: Date): string {
  const now = new Date();
  const diff = differenceInMilliseconds(targetDate, now);

  if (diff <= 0) return "Available now";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export function generateCalendarData(): DayInfo[] {
  return Array.from({ length: 24 }, (_, i) => ({
    day: i + 1,
    puzzleType: getPuzzleType(i + 1),
    unlockTime: createUnlockDate(i + 1),
  }));
}