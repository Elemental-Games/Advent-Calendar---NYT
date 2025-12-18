import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface StartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: () => void;
}

export function StartDialog({ open, onOpenChange, onStart }: StartDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-700">
            Ready to Begin? ❄️
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-lg">
            Click start to begin the Mini FrostWord puzzle!
          </p>
          <Button onClick={onStart} className="bg-blue-600 hover:bg-blue-700">
            Start Timer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}