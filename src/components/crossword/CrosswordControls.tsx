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
}

export function CrosswordControls({ onSubmit, onKeyPress, onBackspace }: CrosswordControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center mt-6">
        <Button 
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Submit
        </Button>
      </div>
      <CrosswordKeyboard onKeyPress={onKeyPress} onBackspace={onBackspace} />
    </div>
  );
}