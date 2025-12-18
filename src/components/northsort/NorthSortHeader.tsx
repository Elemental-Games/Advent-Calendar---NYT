import { Alert, AlertDescription } from "@/components/ui/alert";

interface NorthSortHeaderProps {
  remainingAttempts: number;
  day: number;
}

export function NorthSortHeader({ remainingAttempts, day }: NorthSortHeaderProps) {
  // Calculate puzzle number based on day
  const puzzleNumber = Math.floor((day - 3) / 4) + 1;

  return (
    <>
      <h3 className="text-2xl font-bold mb-4 text-center text-red-700">
        NorthSort #{puzzleNumber} 🎁
      </h3>
      <Alert className="mb-4">
        <AlertDescription>
          Attempts remaining: {remainingAttempts}
        </AlertDescription>
      </Alert>
    </>
  );
}