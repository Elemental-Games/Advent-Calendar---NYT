import { Button } from "../ui/button";

interface GameControlsProps {
  selectedWords: string[];
  onSubmit: () => void;
  onDeselectAll: () => void;
  gameOver: boolean;
}

export function GameControls({ selectedWords, onSubmit, onDeselectAll, gameOver }: GameControlsProps) {
  return (
    <div className="space-y-4">
      <Button
        onClick={onSubmit}
        disabled={selectedWords.length !== 4 || gameOver}
        className="w-full bg-red-600 hover:bg-red-700"
      >
        Submit Selection
      </Button>
      
      {selectedWords.length > 0 && !gameOver && (
        <Button
          onClick={onDeselectAll}
          variant="outline"
          className="w-full border-red-600 text-red-600 hover:bg-red-50"
        >
          Deselect All
        </Button>
      )}
    </div>
  );
}