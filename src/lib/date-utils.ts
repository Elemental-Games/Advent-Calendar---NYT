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

  for (let day = 1; day <= 24; day++) {
    let unlockTime: Date;
    
    // All days unlock on specific dates in December 2025 at 8:00 AM EST
    // 8:00 AM EST = 1:00 PM UTC (13:00 UTC)
    let unlockDate: number;
    let unlockMonth: number = 11; // December (0-indexed)
    let unlockYear: number = 2025;
    
    if (day <= 4) {
      unlockDate = 18; // Days 1-4 unlock on December 18, 2025
    } else {
      if (day >= 5 && day <= 8) {
        unlockDate = 19;
      } else if (day >= 9 && day <= 12) {
        unlockDate = 20;
      } else if (day >= 13 && day <= 16) {
        unlockDate = 21;
      } else if (day >= 17 && day <= 20) {
        unlockDate = 22;
      } else if (day >= 21 && day <= 23) {
        unlockDate = 23;
      } else { // day 24
        unlockDate = 24;
      }
    }
    
    unlockTime = new Date(Date.UTC(unlockYear, unlockMonth, unlockDate, 13, 0, 0, 0));

    const puzzleType = getPuzzleType(day);
    const puzzleContent = puzzleData[day];

    days.push({
      day,
      puzzleType,
      unlockTime,
      puzzleContent
    });
  }

  return days;
}

function getPuzzleType(day: number): PuzzleType {
  const types: PuzzleType[] = ["kringle", "frostword", "northsort", "garland"];
  return types[(day - 1) % 4] as PuzzleType;
}