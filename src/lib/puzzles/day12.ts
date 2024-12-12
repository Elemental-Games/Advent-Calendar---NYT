export const day12Puzzle = {
  type: "garland" as const,
  words: ["PENNE", "GNOCCHI", "FETTUCINE", "LASAGNA", "ZITI", "ROTINI"],
  themeWord: "PASTATYPES",
  grid: [
    ['P', 'A', 'S', 'T', 'A', 'T'],
    ['E', 'N', 'N', 'E', 'G', 'Y'],
    ['N', 'O', 'C', 'C', 'H', 'P'],
    ['F', 'E', 'T', 'T', 'U', 'E'],
    ['C', 'I', 'N', 'E', 'Z', 'S'],
    ['R', 'O', 'T', 'I', 'N', 'I'],
    ['L', 'A', 'S', 'A', 'G', 'N'],
    ['A', 'Z', 'I', 'T', 'I', 'I']
  ],
  wordPositions: {
    'penne': [11, 12, 21, 22, 31],
    'gnocchi': [32, 23, 24, 13, 14, 15, 16],
    'fettucine': [51, 41, 42, 43, 33, 34, 35, 25, 26],
    'lasagna': [71, 72, 73, 74, 83, 82, 81],
    'ziti': [56, 65, 64, 63],
    'rotini': [76, 86, 85, 84, 75, 66],
    'pastatypes': [61, 62, 52, 53, 44, 54, 55, 45, 46, 36]
  }
};