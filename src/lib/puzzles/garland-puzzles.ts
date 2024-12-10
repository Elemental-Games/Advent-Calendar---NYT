import { StrandsPuzzle } from '../puzzle-types';

export const garlandPuzzles: Record<number, StrandsPuzzle> = {
  8: {
    type: "garland",
    words: ["HERSHEY", "DARK", "RICH", "MILKY", "SWEETS", "TRUFFLES", "FUDGEY"],
    themeWord: "CHOCOLATE"
  },
  12: {
    type: "garland",
    words: ["PENNE", "GNOCCHI", "FETTUCINE", "LASAGNA", "ZITI", "ROTINI"],
    themeWord: "PASTATYPES",
    grid: [
      ["P", "E", "C", "C", "H", "I"],
      ["N", "N", "N", "O", "N", "E"],
      ["E", "G", "U", "C", "I", "S"],
      ["E", "T", "T", "A", "P", "E"],
      ["F", "S", "T", "T", "Y", "Z"],
      ["P", "A", "I", "T", "I", "I"],
      ["L", "A", "S", "A", "N", "R"],
      ["A", "N", "G", "I", "T", "O"]
    ],
    wordPositions: [
      { word: "PENNE", positions: [11, 12, 21, 22, 31] },
      { word: "GNOCCHI", positions: [32, 23, 24, 13, 14, 15, 16] },
      { word: "FETTUCINE", positions: [51, 41, 42, 43, 33, 34, 35, 25, 26] },
      { word: "LASAGNA", positions: [71, 72, 73, 74, 83, 82, 81] },
      { word: "ZITI", positions: [56, 65, 64, 63] },
      { word: "ROTINI", positions: [76, 86, 85, 84, 75, 66] },
      { word: "PASTATYPES", positions: [61, 62, 52, 53, 44, 54, 55, 45, 46, 36] }
    ]
  }
};