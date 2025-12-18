/**
 * Displays the current active clue.
 * Shows clue number, direction, and text for the selected cell.
 * Provides visual feedback for the current puzzle focus.
 */

interface CrosswordClueProps {
  number: string;
  direction: string;
  clue: string;
}

export function CrosswordClue({ number, direction, clue }: CrosswordClueProps) {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <p className="text-lg font-semibold text-blue-700">
        {number}. {direction}
      </p>
      <p className="text-gray-600">{clue}</p>
    </div>
  );
}