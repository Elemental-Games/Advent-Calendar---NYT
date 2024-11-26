import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DayInfo, formatCountdown } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface CalendarDayProps {
  dayInfo: DayInfo;
  isCompleted?: boolean;
}

const getDayAbbreviation = (day: number): string => {
  const dayIndex = (day - 1) % 7;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex];
};

export function CalendarDay({ dayInfo, isCompleted = false }: CalendarDayProps) {
  const [countdown, setCountdown] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = () => {
      setCountdown(formatCountdown(dayInfo.unlockTime));
    };

    checkStatus();
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [dayInfo.unlockTime]);

  const isAvailable = dayInfo.day <= 4;

  const handleClick = () => {
    if (isAvailable || isCompleted) {
      navigate(`/day/${dayInfo.day}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative aspect-square rounded-xl p-4 cursor-pointer transition-all duration-300",
        "flex flex-col items-center justify-center text-center",
        "border-2",
        isCompleted ? 
          "bg-emerald-600 text-white border-emerald-800" : 
        isAvailable ? 
          "bg-red-600 text-amber-300 border-green-500" :
          "bg-white text-red-600 border-red-200"
      )}
      onClick={handleClick}
    >
      <div className="absolute top-2 w-full text-center">
        <span className={cn(
          "text-xs font-medium",
          isCompleted ? "text-white/90" : 
          isAvailable ? "text-green-300" : 
          "text-red-400"
        )}>
          {getDayAbbreviation(dayInfo.day)}
        </span>
      </div>
      <span className={cn(
        "text-2xl font-bold mb-2",
        isCompleted ? "text-white" : 
        isAvailable ? "text-amber-300" : 
        "text-red-600"
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
          isCompleted ? "text-white/90" : 
          isAvailable ? "text-green-300" : 
          "text-red-600"
        )}>
          {countdown}
        </span>
      )}
    </motion.div>
  );
}