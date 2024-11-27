import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

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
  const [isStarted, setIsStarted] = useState(false);

  const allWords = groups.flatMap(group => group.words);

  const handleWordClick = (word: string) => {
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
      toast.error("These words don't form a group. Try again!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-6 text-center text-red-700">
        NorthSort #1 🎁
      </h3>

      <div className="relative min-h-[600px] rounded-lg p-6 bg-gradient-to-b from-green-50 to-red-50">
        {/* Background decorative presents */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="flex gap-4 animate-slide">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex-none w-20 h-20 bg-red-500 rounded-lg transform rotate-45"
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          {/* Completed groups */}
          {completedGroups.map((category, index) => {
            const group = groups.find(g => g.category === category)!;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg"
                style={{ backgroundColor: group.color }}
              >
                <h4 className="font-semibold mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.words.map(word => (
                    <span
                      key={word}
                      className="px-3 py-1.5 bg-white/90 rounded-full shadow-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Word selection grid */}
          <div className="grid grid-cols-4 gap-2">
            {allWords
              .filter(word => !completedGroups.some(cat => 
                groups.find(g => g.category === cat)?.words.includes(word)
              ))
              .map(word => (
                <motion.button
                  key={word}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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

          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            disabled={selectedWords.length !== 4}
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