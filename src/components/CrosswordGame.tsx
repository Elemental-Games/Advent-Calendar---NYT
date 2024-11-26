import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface CrosswordGameProps {
  across: Record<string, string>;
  down: Record<string, string>;
  answers: Record<string, string>;
  onComplete?: () => void;
}

export function CrosswordGame({ across, down, answers, onComplete }: CrosswordGameProps) {
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [showCongrats, setShowCongrats] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (clueNumber: string, value: string) => {
    const newGuesses = { ...guesses, [clueNumber]: value.toUpperCase() };
    setGuesses(newGuesses);

    // Check if all answers are correct
    const allCorrect = Object.entries(answers).every(
      ([num, answer]) => newGuesses[num]?.toUpperCase() === answer.toUpperCase()
    );

    if (allCorrect && !isComplete) {
      setIsComplete(true);
      setShowCongrats(true);
      onComplete?.();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Mini Crossword ❄️
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-semibold text-lg text-blue-600">Across</h4>
          {Object.entries(across).map(([num, clue]) => (
            <div key={`across-${num}`} className="space-y-2">
              <label className="text-sm text-gray-600">
                {num}. {clue}
              </label>
              <Input
                maxLength={5}
                value={guesses[`a${num}`] || ""}
                onChange={(e) => handleInputChange(`a${num}`, e.target.value)}
                className="uppercase"
                disabled={isComplete}
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg text-blue-600">Down</h4>
          {Object.entries(down).map(([num, clue]) => (
            <div key={`down-${num}`} className="space-y-2">
              <label className="text-sm text-gray-600">
                {num}. {clue}
              </label>
              <Input
                maxLength={5}
                value={guesses[`d${num}`] || ""}
                onChange={(e) => handleInputChange(`d${num}`, e.target.value)}
                className="uppercase"
                disabled={isComplete}
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-blue-700">
              Congratulations! 🎉❄️
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              You've completed Day 2's Mini Crossword puzzle!
            </p>
            <p className="text-gray-600">
              Come back tomorrow for a new Christmas-themed challenge.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}