import { formatTime } from "@/lib/utils";

interface CrosswordHeaderProps {
  elapsedTime: number;
  day: number;
}

export function CrosswordHeader({ elapsedTime, day }: CrosswordHeaderProps) {
  const puzzleNumber = day === 14 ? 4 : 5; // Day 14 is #4, Day 18 is #5

  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Mini FrostWord #{puzzleNumber} ❄️
      </h3>
      <div className="text-center mb-4 text-lg font-mono text-blue-600">
        {formatTime(elapsedTime)}
      </div>
    </>
  );
}