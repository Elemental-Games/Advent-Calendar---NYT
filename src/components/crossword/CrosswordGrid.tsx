/**
 * Renders the crossword puzzle grid.
 * Manages the layout of cells and their interactions.
 * Handles cell selection, input, and visual feedback.
 */

import { CrosswordCell } from "./CrosswordCell";
import { useGridCalculations } from "@/hooks/useGridCalculations";

interface CrosswordGridProps {
  grid: string[][];
  guesses: Record<string, string>;
  showDown: boolean;
  selectedCell: { row: number; col: number } | null;
  isValidCell: (row: number, col: number) => boolean;
  getClueNumber: (row: number, col: number) => string;
  handleCellClick: (row: number, col: number) => void;
  handleInputChange: (row: number, col: number, value: string) => void;
  cellRefs: React.MutableRefObject<(HTMLInputElement | null)[][]>;
  validatedCells?: Record<string, boolean>;
}

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
    if (!isValidCell(rowIndex, colIndex)) return "";

    const clueNumber = getClueNumber(rowIndex, colIndex);
    if (!clueNumber) return "";

    const { acrossPos, downPos } = calculatePosition(rowIndex, colIndex, isValidCell);
    
    const acrossKey = `a${clueNumber}`;
    const downKey = `d${clueNumber}`;
    
    // Show any available value, prioritizing the active direction
    const acrossValue = guesses[acrossKey]?.[acrossPos] || "";
    const downValue = guesses[downKey]?.[downPos] || "";
    
    console.log(`Cell ${rowIndex},${colIndex} - Across: ${acrossValue}, Down: ${downValue}`);
    
    return acrossValue || downValue || "";
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