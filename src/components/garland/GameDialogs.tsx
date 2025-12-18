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
  day?: number;
}

export function GameDialogs({
  showStartDialog,
  setShowStartDialog,
  showCompletionDialog,
  setShowCompletionDialog,
  handleStartGame,
  completionTime,
  day
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
              {day === 24 ? "Merry Christmas Eve! 🎄" : "Congratulations! 🎄"}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            {day === 24 ? (
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Merry Christmas Eve baby, thank you so much for making this by far and already the most special Christmas ever. I cannot wait to see you tomorrow. Thank you for everything you do for me, and always making me the happiest I've ever been each and every day.
                </p>
                <p className="text-lg leading-relaxed">
                  I hope this calendar made you smile just as much as I did making it every day. Thank you so much for my calendar too, I can't wait for you to see it when you get here next ; )
                </p>
                <p className="text-lg font-medium mt-4">
                  Love Always,
                </p>
                <p className="text-lg font-medium">
                  Mark : )
                </p>
              </div>
            ) : (
              <>
                <p className="text-lg">
                  You completed the puzzle in:
                </p>
                <p className="text-4xl font-bold text-green-600 font-mono">
                  {completionTime !== null ? formatTime(completionTime) : "0:00"}
                </p>
                <p className="text-gray-600">
                  Well done! Come back tomorrow for a new challenge.
                </p>
              </>
            )}
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