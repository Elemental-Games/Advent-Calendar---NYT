interface NorthSortHeaderProps {
  remainingAttempts: number;
}

export function NorthSortHeader({ remainingAttempts }: NorthSortHeaderProps) {
  return (
    <>
      <h3 className="text-2xl font-bold mb-4 text-center text-red-700">
        NorthSort #1 🎁
      </h3>
      <Alert className="mb-4">
        <AlertDescription>
          Attempts remaining: {remainingAttempts}
        </AlertDescription>
      </Alert>
    </>
  );
}