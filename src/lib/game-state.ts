const COMPLETION_KEY = 'completed_days';
const PUZZLE_STATE_KEY = 'puzzle_states';

export const markDayComplete = (day: number) => {
  console.log('Marking day as complete:', day);
  const completed = getCompletedDays();
  if (!completed.includes(day)) {
    completed.push(day);
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(completed));
  }
};

export const markDayIncomplete = (day: number) => {
  console.log('Marking day as incomplete:', day);
  const completed = getCompletedDays();
  const filtered = completed.filter(d => d !== day);
  localStorage.setItem(COMPLETION_KEY, JSON.stringify(filtered));
  // Also clear the saved state when marking as incomplete
  clearPuzzleState(day);
};

export const getCompletedDays = (): number[] => {
  // Initialize with days 1-9 completed
  const stored = localStorage.getItem(COMPLETION_KEY);
  if (!stored) {
    const initialCompleted = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(initialCompleted));
    return initialCompleted;
  }
  // Ensure days 1-9 are always marked as completed
  const completedDays = JSON.parse(stored);
  const missingDays = Array.from({length: 9}, (_, i) => i + 1)
    .filter(day => !completedDays.includes(day));
  
  if (missingDays.length > 0) {
    const updatedDays = [...completedDays, ...missingDays];
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(updatedDays));
    return updatedDays;
  }
  
  return completedDays;
};

export const isDayCompleted = (day: number): boolean => {
  return getCompletedDays().includes(day);
};

export const savePuzzleState = (day: number, state: any) => {
  console.log('Saving puzzle state for day:', day, state);
  const states = getPuzzleStates();
  states[day] = state;
  localStorage.setItem(PUZZLE_STATE_KEY, JSON.stringify(states));
};

export const getPuzzleState = (day: number) => {
  const states = getPuzzleStates();
  return states[day];
};

export const clearPuzzleState = (day: number) => {
  console.log('Clearing puzzle state for day:', day);
  const states = getPuzzleStates();
  delete states[day];
  localStorage.setItem(PUZZLE_STATE_KEY, JSON.stringify(states));
  
  // Also clear specific puzzle storage
  localStorage.removeItem(`crossword_${day}`);
  localStorage.removeItem(`kringle_${day}`);
  localStorage.removeItem(`northsort_${day}`);
  localStorage.removeItem(`garland_${day}`);
};

const getPuzzleStates = (): Record<number, any> => {
  const stored = localStorage.getItem(PUZZLE_STATE_KEY);
  return stored ? JSON.parse(stored) : {};
};