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

    // Find the word this cell belongs to
    let value = '';
    let clueNumber;
    
    if (showDown) {
      // Find the starting clue for this column
      for (let row = rowIndex; row >= 0; row--) {
        const num = getClueNumber(row, colIndex);
        if (num) {
          clueNumber = num;
          break;
        }
      }
      if (clueNumber) {
        let pos = 0;
        for (let row = 0; row < rowIndex; row++) {
          if (isValidCell(row, colIndex)) pos++;
        }
        value = guesses[`d${clueNumber}`]?.[pos] || '';
        console.log(`Down value for clue ${clueNumber} at position ${pos}: ${value}`);
      }
    } else {
      // Find the starting clue for this row
      for (let col = colIndex; col >= 0; col--) {
        const num = getClueNumber(rowIndex, col);
        if (num) {
          clueNumber = num;
          break;
        }
      }
      if (clueNumber) {
        let pos = 0;
        for (let col = 0; col < colIndex; col++) {
          if (isValidCell(rowIndex, col)) pos++;
        }
        value = guesses[`a${clueNumber}`]?.[pos] || '';
        console.log(`Across value for clue ${clueNumber} at position ${pos}: ${value}`);
      }
    }

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