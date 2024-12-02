import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DayInfo, formatCountdown } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { isDayCompleted, markDayIncomplete } from "@/lib/game-state";
import { CountdownDialog } from "./calendar/CountdownDialog";
import { DayContent } from "./calendar/DayContent";

interface CalendarDayProps {
  dayInfo: DayInfo;
  isCompleted?: boolean;
}

const getDayAbbreviation = (day: number): string => {
  const dayIndex = (day - 1) % 7;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex];
};

export function CalendarDay({ dayInfo, isCompleted: propIsCompleted }: CalendarDayProps) {
  const [countdown, setCountdown] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset day 3 on component mount
    if (dayInfo.day === 3) {
      console.log('Resetting day 3 completion status');
      markDayIncomplete(3);
    }

    const checkStatus = () => {
      setCountdown(formatCountdown(dayInfo.unlockTime));
      setIsCompleted(propIsCompleted ?? isDayCompleted(dayInfo.day));
    };

    checkStatus();
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [dayInfo.unlockTime, dayInfo.day, propIsCompleted]);

  const isAvailable = dayInfo.day <= 2;  // Make days 1 and 2 available

  const handleClick = () => {
    if (isAvailable || isCompleted) {
      navigate(`/day/${dayInfo.day}`);
    } else {
      setShowCountdown(true);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative aspect-square rounded-lg shadow-md transition-all duration-300 cursor-pointer",
          "flex flex-col items-center justify-center text-center",
          "border-2",
          isCompleted ? 
            "bg-emerald-600/90 border-emerald-700 backdrop-blur-sm" : 
          isAvailable ? 
            "bg-red-600/90 border-red-400 backdrop-blur-sm" :
            "bg-white/5 border-red-200/30 backdrop-blur-xl"
        )}
        onClick={handleClick}
      >
        <DayContent 
          day={dayInfo.day}
          isCompleted={isCompleted}
          isAvailable={isAvailable}
          dayAbbreviation={getDayAbbreviation(dayInfo.day)}
          countdown={countdown}
        />
      </motion.div>

      <CountdownDialog 
        isOpen={showCountdown}
        onOpenChange={setShowCountdown}
        day={dayInfo.day}
        countdown={countdown}
      />
    </>
  );
}