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
      className="p-4 rounded-lg"
      style={{ backgroundColor: color }}
    >
      <h4 className="font-semibold mb-4 text-white text-lg">{category}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {words.map(word => (
          <div
            key={word}
            className="px-3 py-3 bg-white/90 rounded-lg shadow-sm flex items-center justify-center"
          >
            <span className="text-sm sm:text-base text-center break-words">
              {word}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}