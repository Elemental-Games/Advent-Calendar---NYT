import { cn } from "@/lib/utils";

interface DayContentProps {
  day: number;
  isCompleted: boolean;
  isAvailable: boolean;
  dayAbbreviation: string;
  countdown: string;
}

interface StatusTextProps {
  isCompleted: boolean;
  isAvailable: boolean;
  countdown: string;
}

const DayNumber = ({ day, isCompleted, isAvailable }: { day: number; isCompleted: boolean; isAvailable: boolean }) => (
  <span className={cn(
    "text-2xl font-bold mt-2",
    isCompleted ? "text-white" : 
    isAvailable ? "text-yellow-200" : 
    "text-red-400"
  )}>
    {day}
  </span>
);

const DayAbbreviation = ({ dayAbbr, isCompleted, isAvailable }: { dayAbbr: string; isCompleted: boolean; isAvailable: boolean }) => (
  <div className="absolute top-2 left-0 right-0 mx-auto">
    <span className={cn(
      "text-xs font-medium",
      isCompleted ? "text-emerald-100" : 
      isAvailable ? "text-green-300" : 
      "text-red-300"
    )}>
      {dayAbbr}
    </span>
  </div>
);

const StatusText = ({ isCompleted, isAvailable, countdown }: StatusTextProps) => (
  <span className={cn(
    "text-xs font-medium mt-1",
    isCompleted ? "text-emerald-100" : 
    isAvailable ? "text-green-300" : 
    "text-red-300"
  )}>
    {isCompleted ? "Completed" : isAvailable ? "Available" : countdown}
  </span>
);

export function DayContent({ day, isCompleted, isAvailable, dayAbbreviation, countdown }: DayContentProps) {
  return (
    <>
      <DayAbbreviation 
        dayAbbr={dayAbbreviation} 
        isCompleted={isCompleted} 
        isAvailable={isAvailable} 
      />
      <DayNumber 
        day={day} 
        isCompleted={isCompleted} 
        isAvailable={isAvailable} 
      />
      <StatusText 
        isCompleted={isCompleted} 
        isAvailable={isAvailable} 
        countdown={countdown} 
      />
    </>
  );
}