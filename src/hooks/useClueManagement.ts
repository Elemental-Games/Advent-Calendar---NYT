import { CellPosition } from "@/components/crossword/types";

export function useClueManagement(
  selectedCell: CellPosition | null,
  showDown: boolean,
  across: Record<string, string>,
  down: Record<string, string>,
  getClueNumber: (row: number, col: number) => string
) {
  const getCurrentClue = () => {
    if (!selectedCell) return null;
    const clueNumber = getClueNumber(selectedCell.row, selectedCell.col);
    if (!clueNumber) return null;
    
    // Only show the clue for the current direction
    if (showDown) {
      const downClue = down[clueNumber];
      return downClue ? { number: clueNumber, clue: downClue, direction: 'Down' } : null;
    } else {
      const acrossClue = across[clueNumber];
      return acrossClue ? { number: clueNumber, clue: acrossClue, direction: 'Across' } : null;
    }
  };

  return { getCurrentClue };
}