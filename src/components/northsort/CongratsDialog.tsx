import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface CongratsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CongratsDialog({ open, onOpenChange }: CongratsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-red-700">
            Congratulations! 🎄🎁
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-lg">
            You've completed NorthSort #1!
          </p>
          <p className="text-gray-600">
            Come back tomorrow for a new Christmas-themed challenge.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}