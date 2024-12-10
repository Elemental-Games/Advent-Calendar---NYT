import { Alert, AlertDescription } from "@/components/ui/alert";

interface NorthSortHeaderProps {
  remainingAttempts: number;
  title?: string;
}

export function NorthSortHeader({ remainingAttempts, title }: NorthSortHeaderProps) {
  return (
    <>
      <h3 className="text-2xl font-bold mb-4 text-center text-red-700">
        {title || "NorthSort"}
      </h3>
      <Alert className="mb-4">
        <AlertDescription>
          Attempts remaining: {remainingAttempts}
        </AlertDescription>
      </Alert>
    </>
  );
}