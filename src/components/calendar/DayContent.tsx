import { cn } from "@/lib/utils";

interface DayContentProps {
  day: number;
  isCompleted: boolean;
  isAvailable: boolean;
  dayAbbreviation: string;
  countdown: string;
}

export function DayContent({ day, isCompleted, isAvailable, dayAbbreviation, countdown }: DayContentProps) {
  return (
    <>
      <div className="absolute top-2 left-0 right-0 mx-auto">
        <span className={cn(
          "text-xs font-medium",
          isCompleted ? "text-emerald-100" : 
          isAvailable ? "text-green-400" : 
          "text-red-300"
        )}>
          {dayAbbreviation}
        </span>
      </div>
      <span className={cn(
        "text-2xl font-bold mt-2",
        isCompleted ? "text-white" : 
        isAvailable ? "text-yellow-200" : 
        "text-red-400"
      )}>
        {day}
      </span>
      {isCompleted ? (
        <span className="text-xs font-medium text-emerald-100 mt-1">
          Completed
        </span>
      ) : (
        <span className={cn(
          "text-xs font-medium mt-1",
          isCompleted ? "text-emerald-100" : 
          isAvailable ? "text-green-400" : 
          "text-red-300"
        )}>
          {isAvailable ? "Available" : countdown}
        </span>
      )}
    </>
  );
}