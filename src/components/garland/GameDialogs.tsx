import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { formatTime } from '@/lib/utils';

interface GameDialogsProps {
  showStartDialog: boolean;
  setShowStartDialog: (show: boolean) => void;
  showCompletionDialog: boolean;
  setShowCompletionDialog: (show: boolean) => void;
  handleStartGame: () => void;
  completionTime: number | null;
}

export function GameDialogs({
  showStartDialog,
  setShowStartDialog,
  showCompletionDialog,
  setShowCompletionDialog,
  handleStartGame,
  completionTime
}: GameDialogsProps) {
  return (
    <>
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

      <Dialog 
        open={showCompletionDialog} 
        onOpenChange={setShowCompletionDialog}
      >
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
              {completionTime !== null ? formatTime(completionTime) : '0:00'}
            </p>
            <p className="text-gray-600">
              Well done! Come back tomorrow for a new challenge.
            </p>
            <Button 
              onClick={() => setShowCompletionDialog(false)}
              className="bg-green-600 hover:bg-green-700"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}