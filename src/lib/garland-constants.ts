export const CHRISTMAS_COLORS = [
  'bg-red-500',    // Red
  'bg-green-500',  // Green
  'bg-blue-500',   // Blue
  'bg-yellow-500', // Yellow
  'bg-orange-500', // Orange
] as const;

export const GRID_CELL_SIZE = 40; // pixels

// Generate unique colors for each position in the grid
export const generateUniqueColors = () => {
  const colors: { [key: number]: string } = {};
  let colorIndex = 0;
  
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 6; col++) {
      const position = row * 10 + col;
      colors[position] = CHRISTMAS_COLORS[colorIndex % CHRISTMAS_COLORS.length];
      colorIndex++;
    }
  }
  return colors;
};