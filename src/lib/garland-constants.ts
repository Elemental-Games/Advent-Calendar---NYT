export const CHRISTMAS_COLORS = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FFA500', // Orange
] as const;

export const GRID_CELL_SIZE = 40; // pixels

export const getRandomChristmasColor = () => {
  const randomIndex = Math.floor(Math.random() * CHRISTMAS_COLORS.length);
  return CHRISTMAS_COLORS[randomIndex];
};