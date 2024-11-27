import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { NorthSortHeader } from "./northsort/NorthSortHeader";
import { CompletedGroup } from "./northsort/CompletedGroup";
import { WordGrid } from "./northsort/WordGrid";
import { useNorthSortGame } from "./northsort/useNorthSortGame";

interface NorthSortGameProps {
  groups: Array<{
    category: string;
    color: string;
    words: string[];
  }>;
  onComplete?: () => void;
  day: number;
}

export function NorthSortGame({ groups, onComplete, day }: NorthSortGameProps) {
  const {
    selectedWords,
    completedGroups,
    showCongrats,
    setShowCongrats,
    remainingAttempts,
    gameOver,
    remainingWords,
    handleWordClick,
    handleSubmit
  } = useNorthSortGame(day, groups, onComplete);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <NorthSortHeader remainingAttempts={remainingAttempts} />

      <div className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedGroups.map((category) => {
            const group = groups.find(g => g.category === category)!;
            return (
              <CompletedGroup
                key={category}
                category={category}
                color={group.color}
                words={group.words}
              />
            );
          })}
        </div>

        {!gameOver && remainingWords.length > 0 && (
          <div className="mt-6">
            <WordGrid
              words={remainingWords}
              selectedWords={selectedWords}
              onWordClick={handleWordClick}
            />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={selectedWords.length !== 4 || gameOver}
          className="w-full mt-6 bg-red-600 hover:bg-red-700"
        >
          Submit Selection
        </Button>
      </div>

      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-red-700">
              Congratulations! 🎄🎁
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              You've completed NorthSort #1!
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