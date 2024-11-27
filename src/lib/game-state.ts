const COMPLETION_KEY = 'completed_days';
const PUZZLE_STATE_KEY = 'puzzle_states';

export const markDayComplete = (day: number) => {
  const completed = getCompletedDays();
  if (!completed.includes(day)) {
    completed.push(day);
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(completed));
  }
};

export const markDayIncomplete = (day: number) => {
  const completed = getCompletedDays();
  const filtered = completed.filter(d => d !== day);
  localStorage.setItem(COMPLETION_KEY, JSON.stringify(filtered));
  // Also clear the saved state when marking as incomplete
  clearPuzzleState(day);
};

export const getCompletedDays = (): number[] => {
  const stored = localStorage.getItem(COMPLETION_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isDayCompleted = (day: number): boolean => {
  return getCompletedDays().includes(day);
};

// New functions to handle puzzle state
export const savePuzzleState = (day: number, state: any) => {
  const states = getPuzzleStates();
  states[day] = state;
  localStorage.setItem(PUZZLE_STATE_KEY, JSON.stringify(states));
};

export const getPuzzleState = (day: number) => {
  const states = getPuzzleStates();
  return states[day];
};

export const clearPuzzleState = (day: number) => {
  const states = getPuzzleStates();
  delete states[day];
  localStorage.setItem(PUZZLE_STATE_KEY, JSON.stringify(states));
};

const getPuzzleStates = (): Record<number, any> => {
  const stored = localStorage.getItem(PUZZLE_STATE_KEY);
  return stored ? JSON.parse(stored) : {};
};