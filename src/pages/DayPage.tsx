import { useParams, useNavigate } from "react-router-dom";
import { generateCalendarData } from "@/lib/date-utils";
import { PuzzleDisplay } from "@/components/PuzzleDisplay";
import { Button } from "@/components/ui/button";
import { markDayComplete, markDayIncomplete, isDayCompleted } from "@/lib/game-state";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const DayPage = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayNumber = Number(day);
  const dayInfo = generateCalendarData().find(d => d.day === dayNumber);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (dayNumber) {
      setIsCompleted(isDayCompleted(dayNumber));
    }
  }, [dayNumber]);

  const handleCompletion = () => {
    if (dayNumber) {
      markDayComplete(dayNumber);
      setIsCompleted(true);
      toast.success("Puzzle completed! Well done!");
    }
  };

  const handleReset = () => {
    if (dayNumber) {
      console.log('Resetting day:', dayNumber);
      markDayIncomplete(dayNumber);
      setIsCompleted(false);
      
      // Clear FrostWord puzzle state
      localStorage.removeItem(`crossword_${dayNumber}`);
      
      // Clear NorthSort puzzle state
      localStorage.removeItem(`northsort_${dayNumber}`);
      
      toast.info("Puzzle reset! Try again!");
      window.location.reload();
    }
  };

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
          <Button 
            onClick={handleReset}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Reset Day
          </Button>
        </div>
        
        {dayInfo.puzzleContent && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <PuzzleDisplay 
              type={dayInfo.puzzleType}
              content={dayInfo.puzzleContent}
              day={dayInfo.day}
              onComplete={handleCompletion}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DayPage;