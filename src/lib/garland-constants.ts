/**
 * Garland Game Constants and Utilities
 * Defines core game constants and helper functions including:
 * - Color schemes for the game
 * - Grid cell size
 * - Color generation for different positions
 * Used across all Garland game components for consistent styling and behavior.
 */
export const CHRISTMAS_COLORS = [
  'hover:bg-red-500',    // Red
  'hover:bg-blue-500',   // Blue
  'hover:bg-yellow-500', // Yellow
  'hover:bg-purple-500', // Purple
  'hover:bg-indigo-500', // Indigo
  'hover:bg-pink-500',   // Pink
  'hover:bg-teal-500',   // Teal
  'hover:bg-orange-500', // Orange
] as const;

export const GRID_CELL_SIZE = 40; // pixels

// Generate unique colors for each position in the grid
export const generateUniqueColors = () => {
  const colors = CHRISTMAS_COLORS;
  
  // Create a mapping of positions to colors that remains consistent
  const colorMap: { [key: number]: string } = {};
  for (let i = 0; i < 48; i++) { // 8 rows * 6 columns = 48 positions
    colorMap[i] = colors[i % colors.length];
  }
  
  return colorMap;
};