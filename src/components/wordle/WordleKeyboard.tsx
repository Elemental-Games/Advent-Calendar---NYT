import React from 'react';
import { Button } from "@/components/ui/button";

interface WordleKeyboardProps {
  usedKeys: Record<string, string>;
  handleClick: (key: string) => void;
}

export function WordleKeyboard({ usedKeys, handleClick }: WordleKeyboardProps) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  const getKeyStyle = (key: string) => {
    if (key === 'ENTER' || key === '⌫') return 'bg-gray-200 hover:bg-gray-300';
    
    switch (usedKeys[key]) {
      case 'correct':
        return 'bg-green-500 text-white hover:bg-green-600';
      case 'present':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'absent':
        return 'bg-gray-400 text-white hover:bg-gray-500';
      default:
        return 'bg-gray-200 hover:bg-gray-300';
    }
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
              onClick={() => handleClick(key)}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}