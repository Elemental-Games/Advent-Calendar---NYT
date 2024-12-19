import { PuzzleType } from './puzzle-types';
import { puzzleData } from './puzzle-data';

export interface DayInfo {
  day: number;
  puzzleType: PuzzleType;
  unlockTime: Date;
  puzzleContent?: any;
}

export interface PuzzleContent {
  type?: PuzzleType;
  [key: string]: any;
}

export function formatCountdown(unlockTime: Date): string {
  const now = new Date();
  const diff = unlockTime.getTime() - now.getTime();
  
  if (diff <= 0) return "Available";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function generateCalendarData(): DayInfo[] {
  const days: DayInfo[] = [];
  const baseDate = new Date('2024-12-01T12:30:00.000Z'); // 7:30 AM EST

  for (let day = 1; day <= 24; day++) {
    const unlockTime = new Date(baseDate);
    unlockTime.setDate(unlockTime.getDate() + (day - 1));

    // Make first 19 days and days 21-23 available immediately for testing
    if (day <= 19 || (day >= 21 && day <= 23)) {
      unlockTime.setFullYear(2020);
    }

    const puzzleType = getPuzzleType(day);
    days.push({
      day,
      puzzleType,
      unlockTime,
      puzzleContent: puzzleData[day]
    });
  }

  return days;
}

function getPuzzleType(day: number): PuzzleType {
  const types: PuzzleType[] = ["kringle", "frostword", "northsort", "garland"];
  return types[(day - 1) % 4] as PuzzleType;
}