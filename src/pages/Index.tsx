import { useState } from "react";
import { CalendarDay } from "@/components/CalendarDay";
import { generateCalendarData } from "@/lib/date-utils";

const Index = () => {
  const [days] = useState(generateCalendarData());

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 relative overflow-hidden">
      {/* Christmas lights effect */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-red-500 via-green-500 to-yellow-200 animate-pulse" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-700 mb-4 font-serif">
            KB's Advent Calendar
          </h1>
          <p className="text-green-700">
            A new puzzle unlocks each day at 7:30 AM EST
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {days.map((dayInfo) => (
            <CalendarDay
              key={dayInfo.day}
              dayInfo={dayInfo}
              isCompleted={dayInfo.day === 24}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;