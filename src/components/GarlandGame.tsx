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
  words = ['MUSICIANS', 'WALLEN', 'MALONE', 'ERNEST', 'MTJOY', 'SAMFENDER', 'SABRINA'],
  themeWord = 'MUSICIANS',
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

  const titleColors = [
    'text-red-500',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-purple-500',
    'text-orange-500',
    'text-pink-500',
    'text-indigo-500',
    'text-emerald-500',
    'text-amber-500'
  ];

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <h2 className="text-2xl font-bold text-center">
        {'Garland #4 🎄'.split('').map((char, i) => (
          <span key={i} className={titleColors[i % titleColors.length]}>
            {char}
          </span>
        ))}
      </h2>

      <GameHeader elapsedTime={elapsedTime} />

      <GameGrid
        grid={[
          ['S', 'W', 'A', 'L', 'M', 'A'],
          ['A', 'N', 'A', 'L', 'E', 'L'],
          ['S', 'M', 'F', 'I', 'N', 'O'],
          ['E', 'E', 'C', 'T', 'S', 'N'],
          ['R', 'D', 'N', 'I', 'E', 'E'],
          ['N', 'A', 'S', 'N', 'R', 'E'],
          ['I', 'R', 'B', 'U', 'O', 'Y'],
          ['S', 'A', 'M', 'J', 'T', 'M']
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