import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";

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
  const [revealIndex, setRevealIndex] = useState(0);

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
      
      if (completedGroups.length + 1 === groups.length - 1) {
        setShowCongrats(true);
        onComplete?.();
      }
      toast.success("Correct group!");
    } else {
      setRemainingAttempts(prev => prev - 1);
      toast.error("These words don't form a group. Try again!");
      
      if (remainingAttempts <= 1) {
        setGameOver(true);
        const revealGroups = () => {
          if (revealIndex < groups.length) {
            setCompletedGroups(prev => [...prev, groups[revealIndex].category]);
            setRevealIndex(prev => prev + 1);
            setTimeout(revealGroups, 2000);
          }
        };
        revealGroups();
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4 text-center text-red-700">
        NorthSort #1 🎁
      </h3>

      <div className="relative rounded-lg p-4 bg-white/5 backdrop-blur-sm border border-red-200/30">
        <Alert className="mb-4">
          <AlertDescription>
            Attempts remaining: {remainingAttempts}
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {/* Completed groups */}
          <AnimatePresence>
            {completedGroups.map((category, index) => {
              const group = groups.find(g => g.category === category)!;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: group.color }}
                >
                  <h4 className="font-semibold mb-2 text-white">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.words.map(word => (
                      <span
                        key={word}
                        className="px-2 py-1 text-sm bg-white/90 rounded-full shadow-sm"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Word selection grid */}
          {!gameOver && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {remainingWords.map(word => (
                <motion.button
                  key={word}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleWordClick(word)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${selectedWords.includes(word)
                      ? 'bg-red-600 text-white'
                      : 'bg-white hover:bg-red-50'
                    }`}
                >
                  {word}
                </motion.button>
              ))}
            </div>
          )}

          {/* Submit button */}
          {!gameOver && (
            <Button
              onClick={handleSubmit}
              disabled={selectedWords.length !== 4}
              className="w-full mt-4 bg-red-600 hover:bg-red-700"
            >
              Submit Selection
            </Button>
          )}
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