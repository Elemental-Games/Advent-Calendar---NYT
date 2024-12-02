import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  elapsedTime: number;
}

export function CompletionDialog({ open, onOpenChange, elapsedTime }: CompletionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-md w-[90vw] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-700">
            Congratulations! 🎄
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-lg">
            You completed the Mini FrostWord in {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}!
          </p>
          <Button onClick={() => onOpenChange(false)} className="bg-green-600 hover:bg-green-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}