const COMPLETION_KEY = 'completed_days';

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
};

export const getCompletedDays = (): number[] => {
  const stored = localStorage.getItem(COMPLETION_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isDayCompleted = (day: number): boolean => {
  return getCompletedDays().includes(day);
};