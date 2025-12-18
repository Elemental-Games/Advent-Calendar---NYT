/**
 * Garland Game Constants and Utilities
 * Defines core game constants and helper functions including:
 * - Color schemes for the game
 * - Grid cell size
 * - Color generation for different positions
 * Used across all Garland game components for consistent styling and behavior.
 */

// Using specific color codes for better consistency
export const CHRISTMAS_COLORS = [
  'hover:bg-[#ea384c]',  // Red
  'hover:bg-[#0EA5E9]',  // Blue
  'hover:bg-[#22c55e]',  // Green
  'hover:bg-[#eab308]',  // Yellow
  'hover:bg-[#ea384c]',  // Red again
  'hover:bg-[#8B5CF6]',  // Purple
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

// Found word styles
export const FOUND_WORD_STYLES = {
  default: 'bg-green-500 text-red-500 border-2 border-red-500',
  themeWord: 'bg-green-500 text-red-500 border-2 border-red-500'
};