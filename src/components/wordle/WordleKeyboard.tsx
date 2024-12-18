import React from 'react';
import { Button } from "@/components/ui/button";

interface WordleKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  usedLetters: {
    correct: string[];
    present: string[];
    absent: string[];
  };
}

export function WordleKeyboard({ 
  onKeyPress, 
  onBackspace, 
  onEnter,
  usedLetters = { correct: [], present: [], absent: [] }
}: WordleKeyboardProps) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  const getKeyStyle = (key: string) => {
    if (usedLetters.correct.includes(key)) {
      return "bg-green-500 text-white hover:bg-green-600";
    }
    if (usedLetters.present.includes(key)) {
      return "bg-yellow-500 text-white hover:bg-yellow-600";
    }
    if (usedLetters.absent.includes(key)) {
      return "bg-gray-400 text-white hover:bg-gray-500";
    }
    return "bg-gray-200 hover:bg-gray-300";
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 p-2 rounded-lg">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <Button
              key={key}
              variant="outline"
              className={`${key === 'ENTER' ? 'w-16' : 'w-8'} h-8 p-0 text-sm font-medium ${getKeyStyle(key)}`}
              onClick={() => {
                if (key === '⌫') {
                  onBackspace();
                } else if (key === 'ENTER') {
                  onEnter();
                } else {
                  onKeyPress(key);
                }
              }}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}