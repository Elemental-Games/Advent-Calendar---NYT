import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CountdownDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  day: number;
  countdown: string;
}

export function CountdownDialog({ isOpen, onOpenChange, day, countdown }: CountdownDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center space-y-4 py-6">
          <h3 className="text-2xl font-bold text-red-600">
            Day {day} unlocks in:
          </h3>
          <p className="text-3xl font-mono text-green-600">
            {countdown}
          </p>
          <p className="text-sm text-gray-500">
            Come back at 8:00 AM EST to solve this puzzle!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}