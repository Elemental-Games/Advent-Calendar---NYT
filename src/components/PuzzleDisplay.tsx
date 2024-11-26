import React from 'react';
import { PuzzleContent } from '@/lib/date-utils';

interface PuzzleDisplayProps {
  type: "wordle" | "crossword" | "connections" | "strands";
  content: PuzzleContent;
}

export function PuzzleDisplay({ type, content }: PuzzleDisplayProps) {
  const renderPuzzle = () => {
    switch (type) {
      case "wordle":
        return (
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold mb-4">Wordle Puzzle</h3>
            <p className="text-gray-600">Try to guess: {(content as any).word}</p>
          </div>
        );
      
      case "crossword":
        const { across, down } = content as any;
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Mini Crossword</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-2">Across</h4>
                {Object.entries(across).map(([num, clue]) => (
                  <p key={`across-${num}`} className="text-sm mb-1">
                    {num}. {clue}
                  </p>
                ))}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Down</h4>
                {Object.entries(down).map(([num, clue]) => (
                  <p key={`down-${num}`} className="text-sm mb-1">
                    {num}. {clue}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      
      case "connections":
        const { groups } = content as any;
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Connections</h3>
            <div className="space-y-4">
              {groups.map((group: any, index: number) => (
                <div key={index} className="p-2 rounded" style={{ backgroundColor: group.color === 'yellow' ? '#fef08a' : 
                                                                                   group.color === 'green' ? '#bbf7d0' :
                                                                                   group.color === 'blue' ? '#bfdbfe' : 
                                                                                   '#fecaca' }}>
                  <h4 className="font-semibold mb-2">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.words.map((word: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-white rounded shadow-sm">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "strands":
        const { words, themeWord } = content as any;
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Strands</h3>
            <p className="mb-4">Theme word: {themeWord}</p>
            <div className="flex flex-wrap gap-2">
              {words.map((word: string, index: number) => (
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
    <div className="bg-white rounded-lg shadow-lg">
      {renderPuzzle()}
    </div>
  );
}