import React from 'react';
import { PuzzleContent, formatPuzzleTitle } from '@/lib/date-utils';
import { WordleGame } from './WordleGame';
import { CrosswordGame } from './CrosswordGame';
import { NorthSortGame } from './NorthSortGame';

interface PuzzleDisplayProps {
  type: "kringle" | "frostword" | "northsort" | "garland";
  content: PuzzleContent;
  day: number;
}

export function PuzzleDisplay({ type, content, day }: PuzzleDisplayProps) {
  const renderPuzzle = () => {
    switch (type) {
      case "kringle":
        const wordleContent = content as { word: string };
        return (
          <div className="p-4">
            <WordleGame solution={wordleContent.word} />
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
            />
          </div>
        );
      
      case "northsort":
        const northsortContent = content as { 
          groups: Array<{ category: string; color: string; words: string[] }> 
        };
        return (
          <div className="p-4">
            <NorthSortGame groups={northsortContent.groups} />
          </div>
        );
      
      case "garland":
        const garlandContent = content as { words: string[]; themeWord: string };
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">{formatPuzzleTitle(day)}</h3>
            <div className="flex flex-wrap gap-2">
              {garlandContent.words.map((word, index) => (
                <span key={index} className="px-3 py-1 bg-red-100 rounded-full">
                  {word}
                </span>
              ))}
            </div>
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