import { CrosswordCell } from "./CrosswordCell";

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
  return (
    <div className="grid grid-cols-5 gap-1 w-full max-w-[350px] md:max-w-[450px] mx-auto">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="contents">
          {row.map((letter, colIndex) => (
            <CrosswordCell
              key={`${rowIndex}-${colIndex}`}
              value={guesses[`${showDown ? 'd' : 'a'}${getClueNumber(rowIndex, colIndex)}`]?.[colIndex] || ""}
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