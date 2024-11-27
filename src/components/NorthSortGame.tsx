import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { NorthSortHeader } from "./northsort/NorthSortHeader";
import { CompletedGroup } from "./northsort/CompletedGroup";
import { WordGrid } from "./northsort/WordGrid";

interface NorthSortGameProps {
  groups: Array<{
    category: string;
    color: string;
    words: string[];
  }>;
  onComplete?: () => void;
}

export function NorthSortGame({ groups, onComplete }: NorthSortGameProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [completedGroups, setCompletedGroups] = useState<string[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(4);
  const [gameOver, setGameOver] = useState(false);

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

  const checkNearMatch = (selectedWords: string[]) => {
    for (const group of groups) {
      const matchingWords = selectedWords.filter(word => 
        group.words.includes(word)
      );
      if (matchingWords.length === 3) {
        return true;
      }
    }
    return false;
  };

  const revealGroups = () => {
    let currentIndex = 0;
    const revealNextGroup = () => {
      if (currentIndex < groups.length) {
        const nextGroup = groups[currentIndex];
        if (!completedGroups.includes(nextGroup.category)) {
          setCompletedGroups(prev => [...prev, nextGroup.category]);
        }
        currentIndex++;
        if (currentIndex < groups.length) {
          setTimeout(revealNextGroup, 2000);
        }
      }
    };
    revealNextGroup();
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
      
      if (completedGroups.length + 1 === groups.length) {
        setShowCongrats(true);
        onComplete?.();
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

  return (
    <div className="container px-2 sm:px-4">
      <NorthSortHeader remainingAttempts={remainingAttempts} />

      <div className="relative rounded-lg p-4 bg-white/5 backdrop-blur-sm border border-red-200/30">
        <div className="space-y-4">
          <div className="space-y-3">
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
            <WordGrid
              words={remainingWords}
              selectedWords={selectedWords}
              onWordClick={handleWordClick}
            />
          )}

          <Button
            onClick={handleSubmit}
            disabled={selectedWords.length !== 4 || gameOver}
            className="w-full mt-4 bg-red-600 hover:bg-red-700"
          >
            Submit Selection
          </Button>
        </div>
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