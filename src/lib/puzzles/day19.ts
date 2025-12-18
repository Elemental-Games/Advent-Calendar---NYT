import { ConnectionsPuzzle } from '../puzzle-types';

export const day19Puzzle: ConnectionsPuzzle = {
  type: "northsort",
  groups: [
    {
      category: "Weather Terms",
      color: "rgb(234 179 8)", // yellow
      words: ["Clear", "Bright", "Hazy", "Fair"]
    },
    {
      category: "Types of Wine",
      color: "rgb(34 197 94)", // green
      words: ["Red", "White", "Sparkling", "Rosé"]
    },
    {
      category: "Browsers",
      color: "rgb(59 130 246)", // blue
      words: ["Chrome", "Edge", "Safari", "Brave"]
    },
    {
      category: "Text Styling",
      color: "rgb(239 68 68)", // red
      words: ["Bold", "Italic", "Plain", "Black"]
    }
  ]
};