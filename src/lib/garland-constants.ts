export const CHRISTMAS_COLORS = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FFA500', // Orange
] as const;

export const getRandomChristmasColor = () => {
  const randomIndex = Math.floor(Math.random() * CHRISTMAS_COLORS.length);
  return CHRISTMAS_COLORS[randomIndex];
};

// Generate unique colors for each position in the grid
export const generateUniqueColors = () => {
  const colors: { [key: number]: string } = {};
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 6; col++) {
      const position = row * 10 + col;
      colors[position] = CHRISTMAS_COLORS[(row * 6 + col) % CHRISTMAS_COLORS.length];
    }
  }
  return colors;
};