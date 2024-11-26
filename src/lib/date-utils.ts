import { format, differenceInMilliseconds } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

export type PuzzleType = "wordle" | "crossword" | "connections" | "strands";

export interface DayInfo {
  day: number;
  puzzleType: PuzzleType;
  unlockTime: Date;
  puzzleContent?: any; // We'll type this properly when implementing puzzles
}

const UNLOCK_HOUR = 7;
const UNLOCK_MINUTE = 30;
const UNLOCK_TIMEZONE = "America/New_York";

export function createUnlockDate(day: number): Date {
  const date = new Date(2024, 11, day, UNLOCK_HOUR, UNLOCK_MINUTE);
  return fromZonedTime(date, UNLOCK_TIMEZONE);
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

  // For dialog display, always show full format
  if (targetDate.getTime() === targetDate.getTime()) { // Check if we're formatting for dialog
    return `${days > 0 ? `${days}d ` : ''}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // For card display
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m ${seconds}s`;
}

export function generateCalendarData(): DayInfo[] {
  return Array.from({ length: 24 }, (_, i) => ({
    day: i + 1,
    puzzleType: getPuzzleType(i + 1),
    unlockTime: createUnlockDate(i + 1),
  }));
}