import { differenceInMilliseconds } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { DayInfo } from './puzzle-types';
import { puzzleData } from './puzzle-data';
import { getPuzzleType } from './puzzle-utils';

const UNLOCK_HOUR = 7; // 7:30 AM
const UNLOCK_MINUTE = 30;
const UNLOCK_TIMEZONE = "America/New_York";

export function createUnlockDate(day: number): Date {
  // Make first 5 days available now
  if (day <= 5) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 1);
    return now;
  }
  
  // For remaining days, create unlock date at 7:30 AM EST
  const date = new Date(2024, 11, day, UNLOCK_HOUR, UNLOCK_MINUTE);
  const unlockDate = fromZonedTime(date, UNLOCK_TIMEZONE);
  
  // If the unlock time has passed, make it available
  if (Date.now() >= unlockDate.getTime()) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 1);
    return now;
  }
  
  return unlockDate;
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

export function generateCalendarData(): DayInfo[] {
  return Array.from({ length: 24 }, (_, i) => ({
    day: i + 1,
    puzzleType: getPuzzleType(i + 1),
    unlockTime: createUnlockDate(i + 1),
    puzzleContent: puzzleData[i + 1]
  }));
}