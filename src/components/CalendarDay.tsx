import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DayInfo, formatCountdown } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

interface CalendarDayProps {
  dayInfo: DayInfo;
  onClick: () => void;
  isCompleted?: boolean;
}

const getDayAbbreviation = (day: number): string => {
  // December 2024: 1st is Sunday
  const dayIndex = (day - 1) % 7;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex];
};

export function CalendarDay({ dayInfo, onClick, isCompleted = false }: CalendarDayProps) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const checkStatus = () => {
      setCountdown(formatCountdown(dayInfo.unlockTime));
    };

    checkStatus();
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [dayInfo.unlockTime]);

  const isAvailable = dayInfo.day <= 4;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative aspect-square rounded-xl p-4 cursor-pointer transition-all duration-300",
        "flex flex-col items-center justify-center text-center",
        "border-2",
        isCompleted ? 
          "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-emerald-800" : 
        isAvailable ? 
          "bg-gradient-to-br from-red-500 via-amber-500 to-green-500 text-white border-red-400" :
          "bg-gradient-to-br from-white to-red-50 border-red-200"
      )}
      onClick={onClick}
    >
      <div className="absolute top-2 right-2">
        <span className="text-xs font-medium opacity-75">
          {getDayAbbreviation(dayInfo.day)}
        </span>
      </div>
      <span className={cn(
        "text-2xl font-bold mb-2",
        isCompleted || isAvailable ? "text-white" : "text-red-700"
      )}>
        {dayInfo.day}
      </span>
      {isCompleted ? (
        <span className="text-xs font-medium text-white/90">
          Completed
        </span>
      ) : (
        <span className={cn(
          "text-xs font-medium",
          isCompleted || isAvailable ? "text-white/75" : "text-green-700"
        )}>
          {countdown}
        </span>
      )}
    </motion.div>
  );
}