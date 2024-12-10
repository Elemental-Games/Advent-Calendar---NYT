import React from 'react';
import { PuzzleContent } from '@/lib/date-utils';
import { WordleGame } from './WordleGame';
import { CrosswordGame } from './CrosswordGame';
import { NorthSortGame } from './NorthSortGame';
import { GarlandGame } from './GarlandGame';
import { getPuzzleState } from '@/lib/game-state';

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

  // Get the current puzzle state to check completion
  const puzzleState = getPuzzleState(day);
  console.log('Current puzzle state:', puzzleState);

  const renderPuzzle = () => {
    switch (type) {
      case "kringle":
        if ('word' in content) {
          console.log('Rendering WordleGame with word:', content.word);
          return (
            <div className="p-4">
              <WordleGame 
                solution={content.word} 
                onComplete={onComplete} 
                day={day}
              />
            </div>
          );
        }
        console.error('Invalid content for Kringle puzzle');
        return <div>Error: Invalid puzzle configuration</div>;
      
      case "frostword":
        if ('across' in content && 'down' in content && 'answers' in content) {
          console.log('Initializing FrostWord puzzle for day:', day);
          return (
            <div className="p-4">
              <CrosswordGame 
                across={content.across}
                down={content.down}
                answers={content.answers}
                onComplete={onComplete}
                day={day}
                isCompleted={puzzleState?.completed || false}
              />
            </div>
          );
        }
        console.error('Invalid content for FrostWord puzzle');
        return <div>Error: Invalid puzzle configuration</div>;
      
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
