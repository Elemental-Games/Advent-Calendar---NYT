import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useFoundWordDisplay } from '@/hooks/useFoundWordDisplay';
import { useWordSelection } from '@/hooks/useWordSelection';
import { useGameTimer } from '@/hooks/useGameTimer';
import { GameHeader } from './garland/GameHeader';
import { FoundWordsList } from './garland/FoundWordsList';
import { GameGrid } from './garland/GameGrid';
import { GameDialogs } from './garland/GameDialogs';
import { Button } from './ui/button';

interface GarlandGameProps {
  words?: string[];
  themeWord?: string;
  onComplete?: () => void;
  day: number;
}

export function GarlandGame({ 
  words = ['PENNE', 'GNOCCHI', 'FETTUCINE', 'LASAGNA', 'ZITI', 'ROTINI'],
  themeWord = 'PASTATYPES',
  onComplete,
  day
}: GarlandGameProps) {
  console.log('GarlandGame rendering with words:', words);
  
  const [foundWordsWithIndex, setFoundWordsWithIndex] = useState<Array<{word: string, index: number}>>([]);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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
    themeWord,
    day
  );

  useEffect(() => {
    if (foundWordsWithIndex.length === words.length && !isCompleted) {
      console.log('All words found, completing game');
      setIsCompleted(true);
      completeGame();
      setTimeout(() => {
        setShowCompletionDialog(true);
      }, 500);
    }
  }, [foundWordsWithIndex.length, words.length, completeGame, isCompleted]);

  const handleStartGame = () => {
    console.log('Starting game');
    setIsStarted(true);
    setShowStartDialog(false);
  };

  const handleCompletionDialogClose = () => {
    console.log('Closing completion dialog');
    setShowCompletionDialog(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <GameHeader elapsedTime={elapsedTime} day={day} />

      <GameGrid
        grid={[
          ['P', 'E', 'C', 'C', 'H', 'I'],
          ['N', 'N', 'N', 'O', 'N', 'E'],
          ['E', 'G', 'U', 'C', 'I', 'S'],
          ['E', 'T', 'T', 'A', 'P', 'E'],
          ['F', 'S', 'T', 'T', 'Y', 'Z'],
          ['P', 'A', 'I', 'T', 'I', 'I'],
          ['L', 'A', 'S', 'A', 'N', 'R'],
          ['A', 'N', 'G', 'I', 'T', 'O']
        ]}
        selectedCells={selectedCells}
        foundWordsWithIndex={foundWordsWithIndex}
        themeWord={themeWord}
        onCellClick={handleCellClick}
        isLetterInFoundWord={isLetterInFoundWord}
      />

      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold">
          Current word: {currentWord}
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={currentWord.length < 3 || isCompleted}
          className="w-32"
        >
          Submit
        </Button>
      </div>

      <FoundWordsList foundWords={foundWordsWithIndex} />

      <GameDialogs
        showStartDialog={showStartDialog}
        setShowStartDialog={setShowStartDialog}
        showCompletionDialog={showCompletionDialog}
        setShowCompletionDialog={handleCompletionDialogClose}
        handleStartGame={handleStartGame}
        completionTime={completionTime}
      />
    </div>
  );
}
