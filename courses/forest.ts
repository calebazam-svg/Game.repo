import { CourseConfig } from "@/types";

// Forest Course — gentle introduction. Trees, grass, small hills.
export const forestCourse: CourseConfig = {
  id: "forest",
  name: "Forest Course",
  theme: "forest",
  difficulty: "Easy",
  description:
    "Rolling green fairways framed by towering pines. A relaxed start for new golfers.",
  par: 9,
  previewGradient: "from-emerald-400 via-green-500 to-green-700",
  groundColor: "#4ade80",
  accentColor: "#15803d",
  holes: [
    {
      index: 0,
      tee: [0, 0, 14],
      hole: [2, 0, -20],
      par: 3,
      collectibles: [
        { id: "f0-c1", kind: "coin", position: [-2, 0.6, 4] },
        { id: "f0-c2", kind: "coin", position: [1, 0.6, -4] },
        { id: "f0-g1", kind: "gem", position: [4, 0.6, -12] },
      ],
    },
    {
      index: 1,
      tee: [0, 0, 16],
      hole: [-6, 0, -22],
      par: 3,
      collectibles: [
        { id: "f1-c1", kind: "coin", position: [3, 0.6, 2] },
        { id: "f1-c2", kind: "coin", position: [-3, 0.6, -8] },
        { id: "f1-g1", kind: "gem", position: [-6, 0.6, -16] },
      ],
    },
    {
      index: 2,
      tee: [0, 0, 18],
      hole: [5, 0, -24],
      par: 3,
      collectibles: [
        { id: "f2-c1", kind: "coin", position: [-4, 0.6, 6] },
        { id: "f2-c2", kind: "coin", position: [2, 0.6, -10] },
        { id: "f2-g1", kind: "gem", position: [5, 0.6, -18] },
      ],
    },
  ],
  decorations: [
    { id: "f-t1", kind: "tree", position: [-10, 0, 6], scale: 1.2 },
    { id: "f-t2", kind: "tree", position: [11, 0, 0], scale: 1 },
    { id: "f-t3", kind: "tree", position: [-12, 0, -10], scale: 1.4 },
    { id: "f-t4", kind: "tree", position: [13, 0, -14], scale: 1.1 },
    { id: "f-t5", kind: "tree", position: [-9, 0, -22], scale: 1.3 },
    { id: "f-t6", kind: "tree", position: [10, 0, -24], scale: 1 },
    { id: "f-t7", kind: "tree", position: [-14, 0, 14], scale: 1.1 },
    { id: "f-t8", kind: "tree", position: [15, 0, 12], scale: 1.2 },
    { id: "f-b1", kind: "bush", position: [-5, 0, 10], scale: 1 },
    { id: "f-b2", kind: "bush", position: [6, 0, -6], scale: 1.1 },
    { id: "f-b3", kind: "bush", position: [-7, 0, -16], scale: 0.9 },
  ],
};
