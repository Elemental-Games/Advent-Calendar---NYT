import { PuzzleType } from './puzzle-types';

export function getPuzzleType(day: number): PuzzleType {
  const types: PuzzleType[] = ["kringle", "frostword", "northsort", "garland"];
  return types[(day - 1) % 4] as PuzzleType;
}

export function getGameNumber(day: number): number {
  return Math.floor((day - 1) / 4) + 1;
}

export function formatPuzzleTitle(day: number): string {
  const type = getPuzzleType(day);
  const gameNumber = getGameNumber(day);
  
  const typeNames = {
    kringle: "Kringle",
    frostword: "FrostWord",
    northsort: "NorthSort",
    garland: "Garland"
  };
  
  return `Day ${day} - ${typeNames[type]} #${gameNumber}`;
}