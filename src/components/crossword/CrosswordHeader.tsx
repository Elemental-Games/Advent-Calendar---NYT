import { formatTime } from "@/lib/utils";

interface CrosswordHeaderProps {
  elapsedTime: number;
  title?: string;
  day?: number;
}

const getFrostWordNumber = (day: number | undefined): number => {
  if (!day) return 1;
  
  // Map days to FrostWord numbers
  const frostWordDays = {
    2: 1,
    6: 2,
    10: 3,
    14: 4,
    18: 5,
    22: 6
  };
  
  return frostWordDays[day as keyof typeof frostWordDays] || 1;
};

export function CrosswordHeader({ elapsedTime, title, day }: CrosswordHeaderProps) {
  const frostWordNumber = getFrostWordNumber(day);
  const defaultTitle = `Mini FrostWord #${frostWordNumber} ❄️`;

  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
        {title || defaultTitle}
      </h3>
      <div className="text-center mb-4 text-lg font-mono text-blue-600">
        {formatTime(elapsedTime)}
      </div>
    </>
  );
}