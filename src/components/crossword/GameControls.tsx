import React from "react";
import { Button } from "@/components/ui/button";
import { CrosswordControls } from "./CrosswordControls";

interface GameControlsProps {
  onSubmit: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onReset: () => void;
  isCompleted: boolean;
  completionTime?: number;
}

export function GameControls({
  onSubmit,
  onKeyPress,
  onBackspace,
  onReset,
  isCompleted,
  completionTime
}: GameControlsProps) {
  if (isCompleted) {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-green-600">Puzzle Completed!</h2>
          {completionTime && <p className="text-lg">Time: {completionTime}</p>}
          <Button 
            onClick={onReset}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Reset Puzzle
          </Button>
        </div>
      </div>
    );
  }

  return (
    <CrosswordControls
      onSubmit={onSubmit}
      onKeyPress={onKeyPress}
      onBackspace={onBackspace}
      onReset={onReset}
    />
  );
}