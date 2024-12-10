import { useParams, useNavigate } from "react-router-dom";
import { generateCalendarData } from "@/lib/date-utils";
import { PuzzleDisplay } from "@/components/PuzzleDisplay";
import { Button } from "@/components/ui/button";
import { markDayComplete, markDayIncomplete, isDayCompleted, clearPuzzleState } from "@/lib/game-state";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const DayPage = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayNumber = Number(day);
  console.log('DayPage rendering with day:', dayNumber);
  
  const dayInfo = generateCalendarData().find(d => d.day === dayNumber);
  console.log('Day info:', dayInfo);
  
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
      clearPuzzleState(dayNumber);
      toast.info("Day reset! Try again!");
      window.location.reload();
    }
  };

  const handlePuzzleReset = () => {
    if (dayNumber) {
      console.log('Resetting puzzle state for day:', dayNumber);
      clearPuzzleState(dayNumber);
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
        <div className="mb-8 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button onClick={() => navigate("/")} variant="outline">
              Back to Calendar
            </Button>
            <h1 className="text-2xl font-bold text-red-700 text-center">
              {dayInfo.day === 10 ? "FrostWord #3" : `Day ${dayInfo.day}`}
            </h1>
            <div className="flex gap-2 justify-end">
              {dayNumber === 10 && (
                <Button 
                  onClick={handlePuzzleReset}
                  variant="outline"
                  className="text-orange-600 border-orange-600 hover:bg-orange-50 whitespace-nowrap"
                >
                  Reset Puzzle
                </Button>
              )}
              <Button 
                onClick={handleReset}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50 whitespace-nowrap"
              >
                Reset Day
              </Button>
            </div>
          </div>
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