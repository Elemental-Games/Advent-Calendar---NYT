import { useEffect } from "react";
import { toast } from "sonner";
import { NorthSortHeader } from "./northsort/NorthSortHeader";
import { CompletedGroup } from "./northsort/CompletedGroup";
import { WordGrid } from "./northsort/WordGrid";
import { GameControls } from "./northsort/GameControls";
import { CongratsDialog } from "./northsort/CongratsDialog";
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

  // Show all groups if game is completed
  useEffect(() => {
    if (completedGroups.length === groups.length) {
      console.log('Game completed, showing all groups');
      setGameOver(true);
    }
  }, [completedGroups.length, groups.length, setGameOver]);

  const handleWordClick = (word: string) => {
    console.log('Word clicked:', word);
    console.log('Current selected words:', selectedWords);
    
    if (gameOver) return;

    // Toggle word selection
    const isSelected = selectedWords.includes(word);
    console.log('Is word currently selected?', isSelected);

    if (isSelected) {
      // Deselect the word
      console.log('Deselecting word:', word);
      const newSelectedWords = selectedWords.filter(w => w !== word);
      console.log('New selected words after deselection:', newSelectedWords);
      setSelectedWords(newSelectedWords);
    } else if (selectedWords.length < 4) {
      // Select the word if we haven't reached the limit
      console.log('Selecting word:', word);
      const newSelectedWords = [...selectedWords, word];
      console.log('New selected words after selection:', newSelectedWords);
      setSelectedWords(newSelectedWords);
    } else {
      console.log('Cannot select more than 4 words');
      toast.error("You can only select 4 words at a time");
    }
  };

  const handleDeselectAll = () => {
    console.log('Deselecting all words');
    setSelectedWords([]);
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
        setTimeout(() => {
          setShowCongrats(true);
          onComplete?.();
        }, 2000);
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

  // Always show completed groups when game is over or all groups are found
  if (gameOver || completedGroups.length === groups.length) {
    console.log('Rendering completed state with all groups');
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <NorthSortHeader remainingAttempts={remainingAttempts} day={day} />
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
      <NorthSortHeader remainingAttempts={remainingAttempts} day={day} />

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
              day={day}
            />
          </div>
        )}

        <GameControls 
          selectedWords={selectedWords}
          onSubmit={handleSubmit}
          onDeselectAll={handleDeselectAll}
          gameOver={gameOver}
        />
      </div>

      <CongratsDialog 
        open={showCongrats} 
        onOpenChange={setShowCongrats}
      />
    </div>
  );
}