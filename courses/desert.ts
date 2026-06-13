import { CourseConfig } from "@/types";

// Desert Course — hard difficulty. Rocks, sand dunes, cactus obstacles.
export const desertCourse: CourseConfig = {
  id: "desert",
  name: "Desert Course",
  theme: "desert",
  difficulty: "Hard",
  description:
    "A scorching test of nerve. Navigate dunes, rocks, and unforgiving cacti.",
  par: 11,
  previewGradient: "from-orange-300 via-amber-500 to-red-600",
  groundColor: "#fcd34d",
  accentColor: "#b45309",
  holes: [
    {
      index: 0,
      tee: [0, 0, 14],
      hole: [4, 0, -20],
      par: 4,
      collectibles: [
        { id: "d0-c1", kind: "coin", position: [-3, 0.6, 4] },
        { id: "d0-c2", kind: "coin", position: [2, 0.6, -8] },
        { id: "d0-g1", kind: "gem", position: [4, 0.6, -14] },
      ],
    },
    {
      index: 1,
      tee: [0, 0, 16],
      hole: [-6, 0, -24],
      par: 4,
      collectibles: [
        { id: "d1-c1", kind: "coin", position: [5, 0.6, 2] },
        { id: "d1-c2", kind: "coin", position: [-4, 0.6, -12] },
        { id: "d1-g1", kind: "gem", position: [-6, 0.6, -18] },
      ],
    },
    {
      index: 2,
      tee: [0, 0, 18],
      hole: [7, 0, -26],
      par: 3,
      collectibles: [
        { id: "d2-c1", kind: "coin", position: [-4, 0.6, 6] },
        { id: "d2-c2", kind: "coin", position: [3, 0.6, -14] },
        { id: "d2-g1", kind: "gem", position: [7, 0.6, -20] },
      ],
    },
  ],
  decorations: [
    { id: "d-d1", kind: "dune", position: [-12, 0, 4], scale: 1.6 },
    { id: "d-d2", kind: "dune", position: [13, 0, -8], scale: 1.4 },
    { id: "d-d3", kind: "dune", position: [-11, 0, -20], scale: 1.5 },
    { id: "d-c1", kind: "cactus", position: [-6, 0, 8], scale: 1.1 },
    { id: "d-c2", kind: "cactus", position: [7, 0, 2], scale: 1 },
    { id: "d-c3", kind: "cactus", position: [-8, 0, -12], scale: 1.3 },
    { id: "d-c4", kind: "cactus", position: [9, 0, -16], scale: 1 },
    { id: "d-c5", kind: "cactus", position: [-5, 0, -24], scale: 1.2 },
    { id: "d-r1", kind: "rock", position: [5, 0, 10], scale: 1.2 },
    { id: "d-r2", kind: "rock", position: [-9, 0, -6], scale: 1 },
    { id: "d-r3", kind: "rock", position: [11, 0, -22], scale: 1.4 },
  ],
};
