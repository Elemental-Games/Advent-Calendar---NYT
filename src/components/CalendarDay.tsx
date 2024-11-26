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
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const isAvailable = now >= dayInfo.unlockTime;
      setIsUnlocked(isAvailable);
      if (!isAvailable) {
        setCountdown(formatCountdown(dayInfo.unlockTime));
      }
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
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      className={cn(
        "relative aspect-square rounded-xl p-4 cursor-pointer transition-all duration-300",
        "flex flex-col items-center justify-center text-center",
        "border border-gray-200 bg-white/50 backdrop-blur-sm",
        isUnlocked
          ? "hover:shadow-lg hover:border-gray-300"
          : "opacity-75 cursor-not-allowed"
      )}
      onClick={isUnlocked ? onClick : undefined}
    >
      <span className="text-xs font-medium text-gray-500 mb-1">
        {puzzleIcons[dayInfo.puzzleType]}
      </span>
      <span className="text-2xl font-bold text-gray-800 mb-2">
        {dayInfo.day}
      </span>
      {!isUnlocked && (
        <span className="text-xs font-medium text-gray-500">{countdown}</span>
      )}
    </motion.div>
  );
}