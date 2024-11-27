import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DayInfo, formatCountdown } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { isDayCompleted } from "@/lib/game-state";

interface CalendarDayProps {
  dayInfo: DayInfo;
}

const getDayAbbreviation = (day: number): string => {
  const dayIndex = (day - 1) % 7;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex];
};

export function CalendarDay({ dayInfo }: CalendarDayProps) {
  const [countdown, setCountdown] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = () => {
      setCountdown(formatCountdown(dayInfo.unlockTime));
      setIsCompleted(isDayCompleted(dayInfo.day));
    };

    checkStatus();
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [dayInfo.unlockTime, dayInfo.day]);

  const isAvailable = dayInfo.day <= 4;

  const handleClick = () => {
    if (isAvailable) {
      navigate(`/day/${dayInfo.day}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative aspect-square rounded-lg shadow-md transition-all duration-300",
        "flex flex-col items-center justify-center text-center",
        "border-2",
        isCompleted ? 
          "bg-emerald-600/90 border-emerald-700 backdrop-blur-sm" : 
        isAvailable ? 
          "bg-red-600/90 border-green-600 backdrop-blur-sm" :
          "bg-white/5 border-red-200/30 backdrop-blur-xl"
      )}
      onClick={handleClick}
    >
      <div className="absolute top-2 left-0 right-0 mx-auto">
        <span className={cn(
          "text-xs font-medium",
          isCompleted ? "text-emerald-100" : 
          isAvailable ? "text-amber-200" : 
          "text-red-300"
        )}>
          {getDayAbbreviation(dayInfo.day)}
        </span>
      </div>
      <span className={cn(
        "text-2xl font-bold mt-2",
        isCompleted ? "text-white" : 
        isAvailable ? "text-amber-200" : 
        "text-red-400"
      )}>
        {dayInfo.day}
      </span>
      {isCompleted ? (
        <span className="text-xs font-medium text-emerald-100 mt-1">
          Completed
        </span>
      ) : (
        <span className={cn(
          "text-xs font-medium mt-1",
          isCompleted ? "text-emerald-100" : 
          isAvailable ? "text-green-300" : 
          "text-red-300"
        )}>
          {countdown}
        </span>
      )}
    </motion.div>
  );
}