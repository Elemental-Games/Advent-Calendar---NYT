/**
 * Displays all crossword clues organized by direction.
 * Shows separate sections for across and down clues.
 * Provides reference for all puzzle clues during gameplay.
 */

interface CrosswordClueListProps {
  across: Record<string, string>;
  down: Record<string, string>;
}

export function CrosswordClueList({ across, down }: CrosswordClueListProps) {
  return (
    <div className="mt-6 space-y-6 text-sm">
      <div>
        <h3 className="font-bold text-blue-700 mb-2">Across</h3>
        <ul className="space-y-2">
          {Object.entries(across).map(([number, clue]) => (
            <li key={`across-${number}`} className="text-gray-600">
              {number}. {clue}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-blue-700 mb-2">Down</h3>
        <ul className="space-y-2">
          {Object.entries(down).map(([number, clue]) => (
            <li key={`down-${number}`} className="text-gray-600">
              {number}. {clue}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}