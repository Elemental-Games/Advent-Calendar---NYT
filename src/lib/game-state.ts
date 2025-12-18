import { PuzzleStates, PuzzleState } from '@/types/puzzle';

const STORAGE_PREFIX = 'puzzle_';

export function getPuzzleState(day: number): PuzzleState | null {
  const savedState = localStorage.getItem(`${STORAGE_PREFIX}${day}`);
  return savedState ? JSON.parse(savedState) : null;
}

export function savePuzzleState(day: number, state: PuzzleState): void {
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

export function clearAllPuzzleStates(): void {
  // Clear all puzzle states from localStorage
  for (let day = 1; day <= 24; day++) {
    localStorage.removeItem(`${STORAGE_PREFIX}${day}`);
    localStorage.removeItem(`kringle_${day}`);
    localStorage.removeItem(`crossword_${day}`);
    // Clear any other puzzle-specific states
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes(`_${day}`) || key.startsWith(`puzzle_${day}`))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
  console.log('All puzzle states cleared!');
}

export function clearDays5to8(): void {
  // Specifically clear days 5-8 for reset
  for (let day = 5; day <= 8; day++) {
    localStorage.removeItem(`${STORAGE_PREFIX}${day}`);
    localStorage.removeItem(`kringle_${day}`);
    localStorage.removeItem(`crossword_${day}`);
    // Clear any other puzzle-specific states for these days
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes(`_${day}`) || key.startsWith(`puzzle_${day}`))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
  console.log('Days 5-8 puzzle states cleared!');
}