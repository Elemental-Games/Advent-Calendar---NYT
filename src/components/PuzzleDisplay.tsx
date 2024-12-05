import React from 'react';
import { PuzzleContent } from '@/lib/date-utils';
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
  console.log('PuzzleDisplay rendering with type:', type);
  console.log('Content:', content);
  console.log('Day:', day);

  const renderPuzzle = () => {
    switch (type) {
      case "kringle":
        const wordleContent = content as { word: string };
        console.log('Rendering WordleGame with word:', wordleContent.word);
        return (
          <div className="p-4">
            <WordleGame 
              solution={wordleContent.word} 
              onComplete={onComplete} 
              day={day}
            />
          </div>
        );
      
      case "frostword":
        console.log('Initializing FrostWord puzzle for day:', day);
        const crosswordContent = content as { 
          across: Record<string, string>;
          down: Record<string, string>;
          answers: Record<string, string>;
        };
        console.log('FrostWord content:', {
          across: crosswordContent.across,
          down: crosswordContent.down,
          answers: crosswordContent.answers
        });
        console.log('Rendering CrosswordGame');
        return (
          <div className="p-4">
            <CrosswordGame 
              across={crosswordContent.across}
              down={crosswordContent.down}
              answers={crosswordContent.answers}
              onComplete={onComplete}
              day={day}
            />
          </div>
        );
      
      case "northsort":
        const northsortContent = content as { 
          groups: Array<{ category: string; color: string; words: string[] }> 
        };
        console.log('Rendering NorthSortGame');
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
        console.log('Rendering GarlandGame with words:', garlandContent.words);
        return (
          <div className="p-4">
            <GarlandGame 
              words={garlandContent.words}
              themeWord={garlandContent.themeWord}
              onComplete={onComplete}
            />
          </div>
        );
      
      default:
        console.log('Unknown puzzle type:', type);
        return <div>Puzzle type not implemented</div>;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-lg shadow-lg">
      {renderPuzzle()}
    </div>
  );
}