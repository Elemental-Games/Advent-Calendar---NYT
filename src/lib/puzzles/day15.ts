import { ConnectionsPuzzle } from '../puzzle-types';

export const day15Puzzle: ConnectionsPuzzle = {
  type: "northsort",
  groups: [
    {
      category: "Places we said we met",
      color: "rgb(234 179 8)", // yellow
      words: ["Morgan Wallen", "Beach", "Hinge", "Phillies"]
    },
    {
      category: "Our go-to places in KoP",
      color: "rgb(34 197 94)", // green
      words: ["Wegmans", "Bar", "Restaurant", "Parking Lot"]
    },
    {
      category: "Places we've traveled to",
      color: "rgb(59 130 246)", // blue
      words: ["Hilton Head", "Virginia", "Nashville", "Philadelphia"]
    },
    {
      category: "Events we've been to",
      color: "rgb(239 68 68)", // red
      words: ["Concerts", "Weddings", "Eagles", "76ers"]
    }
  ]
};