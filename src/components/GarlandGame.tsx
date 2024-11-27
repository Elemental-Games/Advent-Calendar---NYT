import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { GridCell } from './garland/GridCell';
import { generateUniqueColors } from '@/lib/garland-constants';
import { useFoundWordDisplay } from '@/hooks/useFoundWordDisplay';
import { useWordSelection } from '@/hooks/useWordSelection';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface GarlandGameProps {
  words?: string[];
  themeWord?: string;
  onComplete?: () => void;
}

export function GarlandGame({ 
  words = ['santa', 'sleigh', 'cookies', 'mistletoe', 'frost', 'rudolph'],
  themeWord = 'christmas',
  onComplete 
}: GarlandGameProps) {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { selectedCells, currentWord, handleCellMouseDown, handleCellMouseEnter, handleMouseUp } = 
    useWordSelection(words, foundWords, setFoundWords, themeWord, () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setCompletionTime(elapsedTime);
      setShowCompletionDialog(true);
      onComplete?.();
    });

  const { isLetterInFoundWord } = useFoundWordDisplay(foundWords, themeWord);
  const uniqueColors = generateUniqueColors();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isStarted) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted]);

  const handleStartGame = () => {
    setIsStarted(true);
    setShowStartDialog(false);
    setElapsedTime(0);
  };

  const grid = [
    ['S', 'L', 'E', 'S', 'F', 'R'],
    ['H', 'G', 'I', 'A', 'S', 'O'],
    ['M', 'I', 'T', 'M', 'T', 'R'],
    ['S', 'T', 'L', 'S', 'O', 'U'],
    ['T', 'E', 'I', 'P', 'L', 'D'],
    ['O', 'E', 'R', 'H', 'E', 'S'],
    ['S', 'A', 'N', 'H', 'K', 'I'],
    ['A', 'T', 'C', 'O', 'O', 'C'],
  ];

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Garland #1</h2>
        <p className="text-sm text-muted-foreground">
          Theme: "Tis the Season"
        </p>
        <div className="text-lg font-mono text-green-600">
          {formatTime(elapsedTime)}
        </div>
      </div>

      <div 
        className="grid gap-2 relative"
        onMouseLeave={handleMouseUp}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((letter, colIndex) => {
              const { found, wordIndex, isThemeWord } = isLetterInFoundWord(rowIndex, colIndex);
              const isSelected = selectedCells.includes(rowIndex * 6 + colIndex);
              const position = (rowIndex + 1) * 10 + (colIndex + 1);
              
              return (
                <GridCell
                  key={`${rowIndex}-${colIndex}`}
                  letter={letter}
                  isSelected={isSelected}
                  isFound={found}
                  foundWordIndex={wordIndex}
                  isThemeWord={isThemeWord}
                  onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                  selectionIndex={selectedCells.indexOf(rowIndex * 6 + colIndex)}
                  uniqueColor={uniqueColors[position]}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="text-sm">
          Found words ({foundWords.length}/{words.length}):
          <div className="flex flex-wrap gap-2 mt-2">
            {foundWords.map((word, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full ${
                  word.toLowerCase() === themeWord.toLowerCase()
                    ? 'bg-green-500 text-white border-2 border-red-500'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-700">
              Ready to Begin? 🎄
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              Click start to begin the Garland word puzzle!
            </p>
            <Button onClick={handleStartGame} className="bg-green-600 hover:bg-green-700">
              Start Timer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-700">
              Congratulations! 🎄
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              You completed the puzzle in:
            </p>
            <p className="text-4xl font-bold text-green-600 font-mono">
              {formatTime(completionTime || 0)}
            </p>
            <p className="text-gray-600">
              Well done! Come back tomorrow for a new challenge.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}