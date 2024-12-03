import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";

interface CompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  elapsedTime: number;
  day: number;
}

export function CompletionDialog({ open, onOpenChange, elapsedTime, day }: CompletionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-md w-[90vw] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-700">
            Congratulations! 🎄❄️
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-lg">
            You completed Day {day} in {formatTime(elapsedTime)}! 🎅
          </p>
          <p className="text-gray-600">
            Come back tomorrow for a new Christmas-themed challenge! ✨
          </p>
          <Button onClick={() => onOpenChange(false)} className="bg-blue-600 hover:bg-blue-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}