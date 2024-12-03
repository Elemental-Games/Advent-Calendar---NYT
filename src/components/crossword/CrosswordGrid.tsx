/**
 * Renders the crossword puzzle grid.
 * Manages the layout of cells and their interactions.
 * Handles cell selection, input, and visual feedback.
 */

import { CrosswordCell } from "./CrosswordCell";
import { useGridCalculations } from "@/hooks/useGridCalculations";
import type { CrosswordGridProps } from "./types";

export function CrosswordGrid({
  grid,
  guesses,
  showDown,
  selectedCell,
  isValidCell,
  getClueNumber,
  handleCellClick,
  handleInputChange,
  cellRefs,
  validatedCells = {}
}: CrosswordGridProps) {
  const { calculatePosition } = useGridCalculations();

  const getCellValue = (rowIndex: number, colIndex: number) => {
    console.log(`Getting value for cell ${rowIndex},${colIndex}`);
    if (!isValidCell(rowIndex, colIndex)) {
      console.log(`Invalid cell at ${rowIndex},${colIndex}`);
      return "";
    }

    // Check for down value
    let downValue = '';
    let downClue;
    for (let row = rowIndex; row >= 0; row--) {
      const num = getClueNumber(row, colIndex);
      if (num) {
        downClue = num;
        break;
      }
    }
    if (downClue) {
      let pos = 0;
      for (let row = 0; row < rowIndex; row++) {
        if (isValidCell(row, colIndex)) pos++;
      }
      downValue = guesses[`d${downClue}`]?.[pos] || '';
      console.log(`Down value for clue ${downClue} at position ${pos}: ${downValue}`);
    }

    // Check for across value
    let acrossValue = '';
    let acrossClue;
    for (let col = colIndex; col >= 0; col--) {
      const num = getClueNumber(rowIndex, col);
      if (num) {
        acrossClue = num;
        break;
      }
    }
    if (acrossClue) {
      let pos = 0;
      for (let col = 0; col < colIndex; col++) {
        if (isValidCell(rowIndex, col)) pos++;
      }
      acrossValue = guesses[`a${acrossClue}`]?.[pos] || '';
      console.log(`Across value for clue ${acrossClue} at position ${pos}: ${acrossValue}`);
    }

    // Return based on current direction, preferring non-empty values
    const value = showDown ? (downValue || acrossValue) : (acrossValue || downValue);
    console.log(`Final value for cell ${rowIndex},${colIndex}: ${value}`);
    return value;
  };

  return (
    <div className="grid grid-cols-5 gap-1 w-full max-w-[350px] md:max-w-[450px] mx-auto">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="contents">
          {row.map((letter, colIndex) => (
            <CrosswordCell
              key={`${rowIndex}-${colIndex}`}
              value={getCellValue(rowIndex, colIndex)}
              clueNumber={getClueNumber(rowIndex, colIndex)}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
              isPartOfWord={selectedCell && (
                (showDown && selectedCell.col === colIndex) ||
                (!showDown && selectedCell.row === rowIndex)
              ) && isValidCell(rowIndex, colIndex)}
              isValidCell={isValidCell(rowIndex, colIndex)}
              isValidated={validatedCells[`${rowIndex}-${colIndex}`]}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onChange={(value) => handleInputChange(rowIndex, colIndex, value)}
              ref={el => cellRefs.current[rowIndex][colIndex] = el}
            />
          ))}
        </div>
      ))}
    </div>
  );
}