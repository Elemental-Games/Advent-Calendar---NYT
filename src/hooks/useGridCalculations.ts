/**
 * Utility hook for calculating positions and validating cells in the crossword grid.
 * Provides functions to determine cell positions for both across and down directions,
 * helping maintain consistency between different views of the same cell.
 * Essential for proper input handling and validation in the crossword puzzle.
 */

export const useGridCalculations = () => {
  const calculatePosition = (rowIndex: number, colIndex: number, isValidCell: (row: number, col: number) => boolean) => {
    let acrossPos = 0;
    let downPos = 0;

    // Calculate across position by counting valid cells in the row up to current column
    for (let col = 0; col <= colIndex; col++) {
      if (isValidCell(rowIndex, col)) {
        if (col === colIndex) break;
        acrossPos++;
      }
    }

    // Calculate down position by counting valid cells in the column up to current row
    for (let row = 0; row <= rowIndex; row++) {
      if (isValidCell(row, colIndex)) {
        if (row === rowIndex) break;
        downPos++;
      }
    }

    return { acrossPos, downPos };
  };

  return { calculatePosition };
};
