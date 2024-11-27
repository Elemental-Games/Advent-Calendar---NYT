import { useState } from "react";
import { CalendarDay } from "@/components/CalendarDay";
import { generateCalendarData } from "@/lib/date-utils";

const Index = () => {
  const [days] = useState(generateCalendarData());

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-6 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-20" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4 font-serif">
            KB's Advent Calendar
          </h1>
          <p className="text-green-700 text-sm md:text-base">
            A new puzzle unlocks each day at 7:30 AM EST
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4">
          {days.map((dayInfo) => (
            <CalendarDay
              key={dayInfo.day}
              dayInfo={dayInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;