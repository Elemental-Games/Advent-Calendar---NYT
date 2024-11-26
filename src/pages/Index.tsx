import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDay } from "@/components/CalendarDay";
import { generateCalendarData } from "@/lib/date-utils";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [days] = useState(generateCalendarData());
  const { toast } = useToast();

  const handleDayClick = (day: number) => {
    toast({
      title: `Day ${day}`,
      description: "This puzzle will be available in the full version!",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Puzzle Advent Calendar
          </h1>
          <p className="text-gray-600">
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
    </div>
  );
};

export default Index;