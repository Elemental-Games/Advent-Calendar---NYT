/**
 * Word positions for each day's Garland puzzle.
 * Each position is calculated as (row + 1) * 10 + (col + 1)
 * For example: row 0, col 0 = position 11
 * 
 * Grid reference for day 12:
 * ['P', 'E', 'C', 'C', 'H', 'I'],  // Row 1
 * ['N', 'N', 'N', 'O', 'N', 'E'],  // Row 2
 * ['E', 'G', 'U', 'C', 'I', 'S'],  // Row 3
 * ['E', 'T', 'T', 'A', 'P', 'E'],  // Row 4
 * ['F', 'S', 'T', 'T', 'Y', 'Z'],  // Row 5
 * ['P', 'A', 'I', 'T', 'I', 'I'],  // Row 6
 * ['L', 'A', 'S', 'A', 'N', 'R'],  // Row 7
 * ['A', 'N', 'G', 'I', 'T', 'O']   // Row 8
 */

export type WordPosition = number[] | number[][];

export interface WordPositions {
  [key: string]: WordPosition;
}

export const WORD_POSITIONS: { [key: number]: WordPositions } = {
  4: {
    'santa': [11, 12, 13, 14, 15],
    'sleigh': [21, 22, 23, 24, 25, 26],
    'rudolph': [31, 32, 33, 34, 35, 36],
    'presents': [41, 42, 43, 44, 45, 46, 47, 48],
    'cookies': [51, 52, 53, 54, 55, 56, 57],
    'stockings': [61, 62, 63, 64, 65, 66, 67, 68],
    'mistletoe': [71, 72, 73, 74, 75, 76, 77, 78],
    'christmas': [11, 21, 31, 41, 51, 61, 71, 81]
  },
  8: {
    'hershey': [11, 12, 13, 14, 15, 16],
    'dark': [21, 22, 23, 24],
    'rich': [31, 32, 33, 34],
    'milky': [41, 42, 43, 44],
    'sweets': [51, 52, 53, 54, 55, 56],
    'truffles': [61, 62, 63, 64, 65, 66, 67, 68],
    'fudgey': [71, 72, 73, 74, 75, 76],
    'chocolate': [81, 82, 83, 84, 85, 86, 87, 88]
  },
  12: {
    'penne': [
      [11, 12, 21, 22, 31],
      [11, 12, 22, 21, 31]
    ],
    'gnocchi': [32, 23, 24, 13, 14, 15, 16],
    'fettucine': [51, 41, 42, 43, 33, 34, 35, 25, 26],
    'lasagna': [71, 72, 73, 74, 83, 82, 81],
    'ziti': [56, 65, 64, 63],
    'rotini': [76, 86, 85, 84, 75, 66],
    'pastatypes': [61, 62, 52, 53, 44, 54, 55, 45, 46, 36]
  }
};