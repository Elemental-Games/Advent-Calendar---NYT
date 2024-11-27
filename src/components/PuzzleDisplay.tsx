import React from 'react';
import { PuzzleContent, formatPuzzleTitle } from '@/lib/date-utils';
import { WordleGame } from './WordleGame';
import { CrosswordGame } from './CrosswordGame';
import { NorthSortGame } from './NorthSortGame';
import { GarlandGame } from './GarlandGame';

interface PuzzleDisplayProps {
  type: "kringle" | "frostword" | "northsort" | "garland";
  content: PuzzleContent;
  day: number;
  onComplete?: () => void;
}

export function PuzzleDisplay({ type, content, day, onComplete }: PuzzleDisplayProps) {
  const renderPuzzle = () => {
    switch (type) {
      case "kringle":
        const wordleContent = content as { word: string };
        return (
          <div className="p-4">
            <WordleGame solution={wordleContent.word} onComplete={onComplete} />
          </div>
        );
      
      case "frostword":
        const crosswordContent = content as { 
          across: Record<string, string>;
          down: Record<string, string>;
          answers: Record<string, string>;
        };
        return (
          <div className="p-4">
            <CrosswordGame 
              across={crosswordContent.across}
              down={crosswordContent.down}
              answers={crosswordContent.answers}
              onComplete={onComplete}
            />
          </div>
        );
      
      case "northsort":
        const northsortContent = content as { 
          groups: Array<{ category: string; color: string; words: string[] }> 
        };
        return (
          <div className="p-4">
            <NorthSortGame 
              groups={northsortContent.groups} 
              onComplete={onComplete}
              day={day}
            />
          </div>
        );
      
      case "garland":
        const garlandContent = content as { words: string[]; themeWord: string };
        return (
          <div className="p-4">
            <GarlandGame
              words={garlandContent.words}
              themeWord={garlandContent.themeWord}
              onComplete={onComplete}
              day={day}
            />
          </div>
        );
      
      default:
        return <div>Puzzle type not implemented</div>;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-lg">
      {renderPuzzle()}
    </div>
  );
}