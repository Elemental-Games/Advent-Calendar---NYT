import { motion } from "framer-motion";

interface CompletedGroupProps {
  category: string;
  color: string;
  words: string[];
}

export function CompletedGroup({ category, color, words }: CompletedGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-3 rounded-lg"
      style={{ backgroundColor: color }}
    >
      <h4 className="font-semibold mb-2 text-white">{category}</h4>
      <div className="grid grid-cols-4 gap-3">
        {words.map(word => (
          <div
            key={word}
            className="px-2 py-2 bg-white/90 rounded-lg shadow-sm flex items-center justify-center aspect-[3/1] md:aspect-[2.5/1]"
          >
            <span className="text-xs sm:text-sm text-center break-words">
              {word}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}