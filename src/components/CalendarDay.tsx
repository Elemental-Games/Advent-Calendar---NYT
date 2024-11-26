import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DayInfo, formatCountdown } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

interface CalendarDayProps {
  dayInfo: DayInfo;
  onClick: () => void;
}

export function CalendarDay({ dayInfo, onClick }: CalendarDayProps) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const checkStatus = () => {
      setCountdown(formatCountdown(dayInfo.unlockTime));
    };

    checkStatus();
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [dayInfo.unlockTime]);

  const puzzleIcons = {
    wordle: "W",
    crossword: "C",
    connections: "O",
    strands: "S",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative aspect-square rounded-xl p-4 cursor-pointer transition-all duration-300",
        "flex flex-col items-center justify-center text-center",
        "border-2 backdrop-blur-sm",
        "hover:shadow-lg hover:border-red-300",
        "bg-gradient-to-br from-white to-red-50",
        "border-red-200"
      )}
      onClick={onClick}
    >
      <div className="absolute top-2 right-2">
        <span className="text-xs font-medium text-green-600">
          {puzzleIcons[dayInfo.puzzleType]}
        </span>
      </div>
      <span className="text-2xl font-bold text-red-700 mb-2">
        {dayInfo.day}
      </span>
      <span className="text-xs font-medium text-green-700">{countdown}</span>
    </motion.div>
  );
}