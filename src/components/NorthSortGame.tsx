import { useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { NorthSortHeader } from "./northsort/NorthSortHeader";
import { CompletedGroup } from "./northsort/CompletedGroup";
import { WordGrid } from "./northsort/WordGrid";
import { useNorthSortGame } from "@/hooks/useNorthSortGame";

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
    setSelectedWords,
    completedGroups,
    setCompletedGroups,
    showCongrats,
    setShowCongrats,
    remainingAttempts,
    setRemainingAttempts,
    gameOver,
    setGameOver,
    checkNearMatch,
    revealGroups
  } = useNorthSortGame(day, groups, onComplete);

  const allWords = groups.flatMap(group => group.words);
  const remainingWords = allWords.filter(word => 
    !completedGroups.some(cat => 
      groups.find(g => g.category === cat)?.words.includes(word)
    )
  );

  const handleWordClick = (word: string) => {
    if (gameOver) return;
    
    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) {
      toast.error("Please select exactly 4 words");
      return;
    }

    const matchingGroup = groups.find(group =>
      group.words.every(word => selectedWords.includes(word)) &&
      selectedWords.every(word => group.words.includes(word))
    );

    if (matchingGroup) {
      setCompletedGroups(prev => [...prev, matchingGroup.category]);
      setSelectedWords([]);
      
      // Check if this was the last group
      if (completedGroups.length + 1 === groups.length) {
        // Add delay before showing congratulations
        setTimeout(() => {
          setShowCongrats(true);
          onComplete?.();
        }, 2000); // 2 second delay
      } else {
        toast.success("Correct group!");
      }
    } else {
      const isNearMatch = checkNearMatch(selectedWords);
      if (isNearMatch) {
        toast.error("Almost there! You're just one word away from a correct group!");
      } else {
        toast.error("These words don't form a group. Try again!");
      }
      
      setRemainingAttempts(prev => prev - 1);
      if (remainingAttempts <= 1) {
        setGameOver(true);
        revealGroups();
      }
    }
  };

  // Always show completed groups when game is over
  if (gameOver) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <NorthSortHeader remainingAttempts={remainingAttempts} />
        <div className="space-y-6 mt-4">
          {groups.map((group) => (
            <CompletedGroup
              key={group.category}
              category={group.category}
              color={group.color}
              words={group.words}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <NorthSortHeader remainingAttempts={remainingAttempts} />

      <div className="space-y-6 mt-4">
        <div className="space-y-6">
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