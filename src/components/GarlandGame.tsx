/**
 * GarlandGame Component
 * A word-finding puzzle game where players search for Christmas-themed words in a grid.
 * Players can click letters to form words, with special handling for the theme word.
 * The game tracks found words, completion state, and elapsed time.
 */
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useFoundWordDisplay } from '@/hooks/useFoundWordDisplay';
import { useWordSelection } from '@/hooks/useWordSelection';
import { useDebugLogs } from '@/hooks/useDebugLogs';
import { useGameTimer } from '@/hooks/useGameTimer';
import { GameHeader } from './garland/GameHeader';
import { FoundWordsList } from './garland/FoundWordsList';
import { GameGrid } from './garland/GameGrid';
import { DebugPanel } from './garland/DebugPanel';
import { GameDialogs } from './garland/GameDialogs';

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

  const { debugLogs, addLog } = useDebugLogs();
  const { isLetterInFoundWord } = useFoundWordDisplay(foundWordsWithIndex, themeWord);
  const { elapsedTime, completionTime, completeGame } = useGameTimer(isStarted, onComplete);

  const { 
    selectedCells, 
    currentWord,
    handleCellClick,
    handleSubmit
  } = useWordSelection(
    words, 
    foundWordsWithIndex,
    setFoundWordsWithIndex,
    themeWord
  );

  useEffect(() => {
    if (foundWordsWithIndex.length === words.length) {
      completeGame();
      setShowCompletionDialog(true);
    }
  }, [foundWordsWithIndex.length, words.length, completeGame]);

  const handleStartGame = () => {
    setIsStarted(true);
    setShowStartDialog(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <GameHeader elapsedTime={elapsedTime} />

      <GameGrid
        grid={[
          ['S', 'L', 'E', 'S', 'F', 'R'],
          ['H', 'G', 'I', 'A', 'S', 'O'],
          ['M', 'I', 'T', 'M', 'T', 'R'],
          ['S', 'T', 'L', 'S', 'O', 'U'],
          ['T', 'E', 'I', 'P', 'L', 'D'],
          ['O', 'E', 'R', 'H', 'E', 'S'],
          ['S', 'A', 'N', 'H', 'K', 'I'],
          ['A', 'T', 'C', 'O', 'O', 'C'],
        ]}
        selectedCells={selectedCells}
        foundWordsWithIndex={foundWordsWithIndex}
        themeWord={themeWord}
        handleCellClick={handleCellClick}
        handleSubmit={handleSubmit}
        isLetterInFoundWord={isLetterInFoundWord}
      />

      <FoundWordsList foundWords={foundWordsWithIndex} />

      <GameDialogs
        showStartDialog={showStartDialog}
        setShowStartDialog={setShowStartDialog}
        showCompletionDialog={showCompletionDialog}
        setShowCompletionDialog={setShowCompletionDialog}
        handleStartGame={handleStartGame}
        completionTime={completionTime}
      />

      {process.env.NODE_ENV === 'development' && (
        <div className="relative z-50">
          <DebugPanel logs={debugLogs} />
        </div>
      )}
    </div>
  );
}