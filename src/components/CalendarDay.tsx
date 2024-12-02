import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DayInfo, formatCountdown } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { isDayCompleted } from "@/lib/game-state";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
    const checkStatus = () => {
      setCountdown(formatCountdown(dayInfo.unlockTime));
      setIsCompleted(propIsCompleted ?? isDayCompleted(dayInfo.day));
    };

    checkStatus();
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [dayInfo.unlockTime, dayInfo.day, propIsCompleted]);

  const isAvailable = dayInfo.day === 1;  // Only day 1 is available

  const handleClick = () => {
    if (isAvailable) {
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
            "bg-red-600/90 border-green-400 backdrop-blur-sm" :
            "bg-white/5 border-red-200/30 backdrop-blur-xl"
        )}
        onClick={handleClick}
      >
        <div className="absolute top-2 left-0 right-0 mx-auto">
          <span className={cn(
            "text-xs font-medium",
            isCompleted ? "text-emerald-100" : 
            isAvailable ? "text-green-400" : 
            "text-red-300"
          )}>
            {getDayAbbreviation(dayInfo.day)}
          </span>
        </div>
        <span className={cn(
          "text-2xl font-bold mt-2",
          isCompleted ? "text-white" : 
          isAvailable ? "text-yellow-200" : 
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
            isAvailable ? "text-green-400" : 
            "text-red-300"
          )}>
            {isAvailable ? "Available" : countdown}
          </span>
        )}
      </motion.div>

      <Dialog open={showCountdown} onOpenChange={setShowCountdown}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4 py-6">
            <h3 className="text-2xl font-bold text-red-600">
              Day {dayInfo.day} unlocks in:
            </h3>
            <p className="text-3xl font-mono text-green-600">
              {countdown}
            </p>
            <p className="text-sm text-gray-500">
              Come back at 7:30 AM EST to solve this puzzle!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}