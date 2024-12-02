import { formatTime } from "@/lib/utils";

interface CrosswordHeaderProps {
  elapsedTime: number;
}

export function CrosswordHeader({ elapsedTime }: CrosswordHeaderProps) {
  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Mini FrostWord ❄️
      </h3>
      <div className="text-center mb-4 text-lg font-mono text-blue-600">
        {formatTime(elapsedTime)}
      </div>
    </>
  );
}