import { useParams, useNavigate } from "react-router-dom";
import { generateCalendarData } from "@/lib/date-utils";
import { PuzzleDisplay } from "@/components/PuzzleDisplay";
import { Button } from "@/components/ui/button";

const DayPage = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayInfo = generateCalendarData().find(d => d.day === Number(day));

  if (!dayInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Day not found</h1>
          <Button onClick={() => navigate("/")}>Back to Calendar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Calendar
          </Button>
          <h1 className="text-2xl font-bold text-red-700">
            Day {dayInfo.day}
          </h1>
        </div>
        
        {dayInfo.puzzleContent && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <PuzzleDisplay 
              type={dayInfo.puzzleType}
              content={dayInfo.puzzleContent}
              day={dayInfo.day}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DayPage;