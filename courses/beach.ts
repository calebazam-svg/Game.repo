import { CourseConfig } from "@/types";

// Beach Course — medium difficulty. Sand, water hazards, palm trees.
export const beachCourse: CourseConfig = {
  id: "beach",
  name: "Beach Course",
  theme: "beach",
  difficulty: "Medium",
  description:
    "Sun-soaked links along the coast. Mind the water hazards and shifting sand.",
  par: 10,
  previewGradient: "from-amber-300 via-yellow-400 to-sky-500",
  groundColor: "#86efac",
  accentColor: "#0ea5e9",
  holes: [
    {
      index: 0,
      tee: [0, 0, 14],
      hole: [3, 0, -20],
      par: 3,
      collectibles: [
        { id: "b0-c1", kind: "coin", position: [-2, 0.6, 4] },
        { id: "b0-c2", kind: "coin", position: [2, 0.6, -6] },
        { id: "b0-g1", kind: "gem", position: [5, 0.6, -14] },
      ],
    },
    {
      index: 1,
      tee: [0, 0, 16],
      hole: [-5, 0, -22],
      par: 4,
      collectibles: [
        { id: "b1-c1", kind: "coin", position: [4, 0.6, 2] },
        { id: "b1-c2", kind: "coin", position: [-4, 0.6, -10] },
        { id: "b1-g1", kind: "gem", position: [-5, 0.6, -16] },
      ],
    },
    {
      index: 2,
      tee: [0, 0, 18],
      hole: [6, 0, -24],
      par: 3,
      collectibles: [
        { id: "b2-c1", kind: "coin", position: [-3, 0.6, 6] },
        { id: "b2-c2", kind: "coin", position: [3, 0.6, -12] },
        { id: "b2-g1", kind: "gem", position: [6, 0.6, -18] },
      ],
    },
  ],
  decorations: [
    { id: "b-w1", kind: "water", position: [-9, 0, -2], scale: 5 },
    { id: "b-w2", kind: "water", position: [10, 0, -18], scale: 4 },
    { id: "b-p1", kind: "palm", position: [-12, 0, 8], scale: 1.2 },
    { id: "b-p2", kind: "palm", position: [13, 0, 4], scale: 1 },
    { id: "b-p3", kind: "palm", position: [-13, 0, -14], scale: 1.3 },
    { id: "b-p4", kind: "palm", position: [12, 0, -10], scale: 1.1 },
    { id: "b-p5", kind: "palm", position: [-10, 0, -24], scale: 1 },
    { id: "b-r1", kind: "rock", position: [4, 0, 8], scale: 0.8 },
    { id: "b-r2", kind: "rock", position: [-6, 0, -18], scale: 0.7 },
  ],
};
