import { PuzzleStates } from '@/types/puzzle';

const STORAGE_PREFIX = 'puzzle_';

export function getPuzzleState(day: number): PuzzleStates | null {
  const savedState = localStorage.getItem(`${STORAGE_PREFIX}${day}`);
  return savedState ? JSON.parse(savedState) : null;
}

export function savePuzzleState(day: number, state: PuzzleStates): void {
  localStorage.setItem(`${STORAGE_PREFIX}${day}`, JSON.stringify(state));
}

export function clearPuzzleState(day: number): void {
  localStorage.removeItem(`${STORAGE_PREFIX}${day}`);
}

export function isDayCompleted(day: number): boolean {
  const state = getPuzzleState(day);
  return state?.completed || false;
}

export function markDayComplete(day: number): void {
  savePuzzleState(day, { completed: true });
}

export function markDayIncomplete(day: number): void {
  savePuzzleState(day, { completed: false });
}