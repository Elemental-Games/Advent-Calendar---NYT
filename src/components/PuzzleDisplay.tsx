import React from 'react';
import { PuzzleContent } from '@/lib/date-utils';
import { WordleGame } from './WordleGame';

interface PuzzleDisplayProps {
  type: "wordle" | "crossword" | "connections" | "strands";
  content: PuzzleContent;
}

export function PuzzleDisplay({ type, content }: PuzzleDisplayProps) {
  const renderPuzzle = () => {
    switch (type) {
      case "wordle":
        const wordleContent = content as { word: string };
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-6 text-center">Wordle</h3>
            <WordleGame solution={wordleContent.word} />
          </div>
        );
      
      case "crossword":
        const crosswordContent = content as { across: Record<string, string>, down: Record<string, string> };
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Mini Crossword</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-2">Across</h4>
                {Object.entries(crosswordContent.across).map(([num, clue]) => (
                  <p key={`across-${num}`} className="text-sm mb-1">
                    {num}. {clue}
                  </p>
                ))}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Down</h4>
                {Object.entries(crosswordContent.down).map(([num, clue]) => (
                  <p key={`down-${num}`} className="text-sm mb-1">
                    {num}. {clue}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      
      case "connections":
        const connectionsContent = content as { groups: Array<{ category: string; color: string; words: string[] }> };
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Connections</h3>
            <div className="space-y-4">
              {connectionsContent.groups.map((group, index) => (
                <div key={index} className="p-2 rounded" style={{ backgroundColor: group.color === 'yellow' ? '#fef08a' : 
                                                                                   group.color === 'green' ? '#bbf7d0' :
                                                                                   group.color === 'blue' ? '#bfdbfe' : 
                                                                                   '#fecaca' }}>
                  <h4 className="font-semibold mb-2">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.words.map((word, i) => (
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
        const strandsContent = content as { words: string[]; themeWord: string };
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Strands</h3>
            <p className="mb-4">Theme word: {strandsContent.themeWord}</p>
            <div className="flex flex-wrap gap-2">
              {strandsContent.words.map((word, index) => (
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
