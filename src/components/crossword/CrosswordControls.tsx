/**
 * Contains game control elements including submit button and keyboard.
 * Manages user input methods and game submission.
 * Provides interface for puzzle completion and validation.
 */

import React from 'react';
import { Button } from "@/components/ui/button";
import { CrosswordKeyboard } from "./CrosswordKeyboard";

interface CrosswordControlsProps {
  onSubmit: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onReset: () => void;  // Added this line
}

export function CrosswordControls({ onSubmit, onKeyPress, onBackspace, onReset }: CrosswordControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4 mt-6">
        <Button 
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Submit
        </Button>
        <Button 
          onClick={onReset}
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          Reset
        </Button>
      </div>
      <CrosswordKeyboard onKeyPress={onKeyPress} onBackspace={onBackspace} />
    </div>
  );
}