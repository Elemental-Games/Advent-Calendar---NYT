import { Button } from "../ui/button";

interface GameControlsProps {
  selectedWords: string[];
  onSubmit: () => void;
  gameOver: boolean;
}

export function GameControls({ selectedWords, onSubmit, gameOver }: GameControlsProps) {
  return (
    <Button
      onClick={onSubmit}
      disabled={selectedWords.length !== 4 || gameOver}
      className="w-full mt-6 bg-red-600 hover:bg-red-700"
    >
      Submit Selection
    </Button>
  );
}