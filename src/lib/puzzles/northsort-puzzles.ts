import { ConnectionsPuzzle } from '../puzzle-types';

export const northsortPuzzles: Record<number, ConnectionsPuzzle> = {
  3: {
    groups: [
      {
        category: "Decorations",
        color: "rgb(234 179 8)",
        words: ["STAR", "GARLAND", "ANGEL", "HOLLY"]
      },
      {
        category: "Santa's Snacks",
        color: "rgb(34 197 94)",
        words: ["COOKIES", "MILK", "CAKE", "MINTS"]
      },
      {
        category: "Gift Wrap",
        color: "rgb(59 130 246)",
        words: ["PAPER", "RIBBON", "STRING", "BOW"]
      },
      {
        category: "Holiday Drinks",
        color: "rgb(239 68 68)",
        words: ["EGGNOG", "WINE", "COFFEE", "BEER"]
      }
    ]
  },
  7: {
    type: "northsort",
    groups: [
      {
        category: "Coffee Flavors",
        color: "rgb(234 179 8)",
        words: ["HAZELNUT", "FRENCH VANILLA", "CARAMEL", "PEPPERMINT"]
      },
      {
        category: "Christmas Tree Types",
        color: "rgb(34 197 94)",
        words: ["FIR", "SPRUCE", "CYPRESS", "PINE"]
      },
      {
        category: "Christmas Movies",
        color: "rgb(59 130 246)",
        words: ["ELF", "JACK FROST", "KRANKS", "GRINCH"]
      },
      {
        category: "Baking Snacks",
        color: "rgb(239 68 68)",
        words: ["COOKIES", "BROWNIES", "CAKES", "BISCUITS"]
      }
    ]
  },
  11: {
    type: "northsort",
    groups: [
      {
        category: "Snow Sports",
        color: "rgb(234 179 8)",
        words: ["SLALOM", "SKII", "MOGUL", "LUGE"]
      },
      {
        category: "Things that store things",
        color: "rgb(34 197 94)",
        words: ["VAULT", "TANK", "BANK", "BAR"]
      },
      {
        category: "Birds with double meanings",
        color: "rgb(59 130 246)",
        words: ["CRANE", "DUCK", "SWIFT", "SWAN"]
      },
      {
        category: "Words that mean \"to jump\"",
        color: "rgb(239 68 68)",
        words: ["SPRING", "RISE", "LEAP", "HOP"]
      }
    ]
  }
};