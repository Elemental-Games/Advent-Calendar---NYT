import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IncorrectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incorrectCount: number;
}

export function IncorrectDialog({ open, onOpenChange, incorrectCount }: IncorrectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:max-w-md w-[90vw] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-red-700">
            Keep Trying! ❄️
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-lg">
            {incorrectCount} {incorrectCount === 1 ? 'answer is' : 'answers are'} incorrect. Keep trying!
          </p>
          <Button onClick={() => onOpenChange(false)} className="bg-red-600 hover:bg-red-700">
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}