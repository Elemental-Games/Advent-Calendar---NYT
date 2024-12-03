/**
 * Virtual keyboard component for mobile-friendly input.
 * Provides touch-friendly letter input and backspace functionality.
 * Ensures consistent input experience across devices.
 */

import React from 'react';
import { Button } from "@/components/ui/button";

interface CrosswordKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
}

export function CrosswordKeyboard({ onKeyPress, onBackspace }: CrosswordKeyboardProps) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 bg-gray-100 p-2 rounded-lg">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <Button
              key={key}
              variant="outline"
              className="w-8 h-8 p-0 text-sm font-medium"
              onClick={() => key === '⌫' ? onBackspace() : onKeyPress(key)}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}