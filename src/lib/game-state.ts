import { PuzzleStates } from '@/types/puzzle';
import { getPuzzleState } from '@/lib/puzzle-data';

const completedDays = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

export function isDayCompleted(day: number): boolean {
  return completedDays.has(day);
}

export function markDayComplete(day: number): void {
  completedDays.add(day);
}

export function markDayIncomplete(day: number): void {
  completedDays.delete(day);
}

export function clearPuzzleState(day: number): void {
  localStorage.removeItem(`puzzle_${day}`);
}

export function getPuzzleState(day: number): PuzzleStates | null {
  const savedState = localStorage.getItem(`puzzle_${day}`);
  return savedState ? JSON.parse(savedState) : null;
}
