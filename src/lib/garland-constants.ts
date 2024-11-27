export const CHRISTMAS_COLORS = [
  'bg-red-500',    // Red
  'bg-green-500',  // Green
  'bg-blue-500',   // Blue
  'bg-yellow-500', // Yellow
  'bg-yellow-500', // Yellow (duplicated to increase frequency)
  'bg-yellow-500', // Yellow (duplicated to increase frequency)
] as const;

export const GRID_CELL_SIZE = 40; // pixels

// Generate unique colors for each position in the grid
export const generateUniqueColors = () => {
  const colors: { [key: number]: string } = {};
  const pattern = [
    [0, 3, 2, 1, 4, 0],  // Row 1
    [4, 2, 1, 3, 0, 4],  // Row 2
    [2, 1, 0, 4, 3, 2],  // Row 3
    [3, 4, 2, 0, 1, 3],  // Row 4
    [0, 3, 4, 2, 1, 0],  // Row 5
    [4, 2, 1, 3, 0, 4],  // Row 6
    [2, 1, 0, 4, 3, 2],  // Row 7
    [3, 4, 2, 0, 1, 3],  // Row 8
  ];
  
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 6; col++) {
      const position = row * 10 + col;
      const colorIndex = pattern[row - 1][col - 1];
      colors[position] = CHRISTMAS_COLORS[colorIndex];
      console.log(`Assigning color for position ${position}:`, CHRISTMAS_COLORS[colorIndex]);
    }
  }
  
  return colors;
};