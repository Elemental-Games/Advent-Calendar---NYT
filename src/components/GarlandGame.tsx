/**
 * GarlandGame Component
 * A word-finding puzzle game where players search for Christmas-themed words in a grid.
 * Players can drag across letters to form words, with special handling for the theme word.
 * The game tracks found words, completion state, and elapsed time.
 */
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { generateUniqueColors } from '@/lib/garland-constants';
import { useFoundWordDisplay } from '@/hooks/useFoundWordDisplay';
import { useWordSelection } from '@/hooks/useWordSelection';
import { useDebugLogs } from '@/hooks/useDebugLogs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { GameHeader } from './garland/GameHeader';
import { FoundWordsList } from './garland/FoundWordsList';
import { GameGrid } from './garland/GameGrid';
import { DebugPanel } from './garland/DebugPanel';

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
  const [foundWordsWithIndex, setFoundWordsWithIndex] = useState<Array<{word: string, index: number}>>([]);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { debugLogs, addLog } = useDebugLogs();

  const { 
    selectedCells, 
    currentWord, 
    handleCellMouseDown: baseHandleCellMouseDown, 
    handleCellMouseEnter: baseHandleCellMouseEnter, 
    handleMouseUp: baseHandleMouseUp 
  } = useWordSelection(
    words, 
    foundWordsWithIndex,
    setFoundWordsWithIndex,
    themeWord
  );

  const handleCellMouseDown = (rowIndex: number, colIndex: number) => {
    addLog(`Touch Start: ${rowIndex},${colIndex}`);
    baseHandleCellMouseDown(rowIndex, colIndex);
  };

  const handleCellMouseEnter = (rowIndex: number, colIndex: number) => {
    addLog(`Touch Move: ${rowIndex},${colIndex}`);
    baseHandleCellMouseEnter(rowIndex, colIndex);
  };

  const handleMouseUp = () => {
    addLog(`Touch End: ${currentWord}`);
    baseHandleMouseUp();
  };

  const { isLetterInFoundWord } = useFoundWordDisplay(foundWordsWithIndex, themeWord);

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

  useEffect(() => {
    if (foundWordsWithIndex.length === words.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setCompletionTime(elapsedTime);
      setShowCompletionDialog(true);
      onComplete?.();
    }
  }, [foundWordsWithIndex, words.length, elapsedTime, onComplete]);

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

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <GameHeader elapsedTime={elapsedTime} />

      <GameGrid
        grid={grid}
        selectedCells={selectedCells}
        foundWordsWithIndex={foundWordsWithIndex}
        themeWord={themeWord}
        handleCellMouseDown={handleCellMouseDown}
        handleCellMouseEnter={handleCellMouseEnter}
        handleMouseUp={handleMouseUp}
        isLetterInFoundWord={isLetterInFoundWord}
      />

      <FoundWordsList foundWords={foundWordsWithIndex} />

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
              {completionTime !== null ? `${Math.floor(completionTime / 60)}:${(completionTime % 60).toString().padStart(2, '0')}` : '0:00'}
            </p>
            <p className="text-gray-600">
              Well done! Come back tomorrow for a new challenge.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {process.env.NODE_ENV === 'development' && <DebugPanel logs={debugLogs} />}
    </div>
  );
}