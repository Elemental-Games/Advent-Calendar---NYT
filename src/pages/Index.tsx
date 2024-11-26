import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDay } from "@/components/CalendarDay";
import { generateCalendarData } from "@/lib/date-utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCountdown } from "@/lib/date-utils";

const Index = () => {
  const [days] = useState(generateCalendarData());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const selectedDayInfo = days.find(d => d.day === selectedDay);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 relative overflow-hidden">
      {/* Christmas lights effect */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-red-500 via-green-500 to-yellow-200 animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-700 mb-4 font-serif">
            KB's Advent Calendar
          </h1>
          <p className="text-green-700">
            A new puzzle unlocks each day at 7:30 AM EST
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {days.map((dayInfo) => (
            <CalendarDay
              key={dayInfo.day}
              dayInfo={dayInfo}
              onClick={() => handleDayClick(dayInfo.day)}
            />
          ))}
        </div>
      </motion.div>

      <Dialog open={selectedDay !== null} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="bg-white/95 backdrop-blur-sm border-red-200">
          <DialogHeader>
            <DialogTitle className="text-red-700">
              Day {selectedDay} - Countdown
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 text-center">
            <p className="text-2xl font-bold text-green-700">
              {selectedDayInfo && formatCountdown(selectedDayInfo.unlockTime)}
            </p>
            <p className="mt-4 text-gray-600">
              Come back when the timer reaches zero to solve the puzzle!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;