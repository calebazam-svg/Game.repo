// Shared domain types for Zamotek Golf.

export type Vec3 = [number, number, number];

export type CourseId = "forest" | "beach" | "desert";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type TerrainTheme = "forest" | "beach" | "desert";

/** A single hole within a course. */
export interface HoleConfig {
  index: number;
  /** Tee position where the ball starts. */
  tee: Vec3;
  /** Center of the cup. */
  hole: Vec3;
  par: number;
  /** Collectibles scattered on this hole. */
  collectibles: CollectibleSpawn[];
}

export type CollectibleKind = "coin" | "gem";

export interface CollectibleSpawn {
  id: string;
  kind: CollectibleKind;
  position: Vec3;
}

/** A decorative or obstacle prop placed on the course. */
export type DecorationKind =
  | "tree"
  | "palm"
  | "cactus"
  | "rock"
  | "bush"
  | "dune"
  | "water";

export interface Decoration {
  id: string;
  kind: DecorationKind;
  position: Vec3;
  scale?: number;
  rotation?: number;
}

export interface CourseConfig {
  id: CourseId;
  name: string;
  theme: TerrainTheme;
  difficulty: Difficulty;
  description: string;
  /** Total par across all holes. */
  par: number;
  holes: HoleConfig[];
  decorations: Decoration[];
  /** Tailwind gradient classes used for the preview card. */
  previewGradient: string;
  groundColor: string;
  accentColor: string;
}

/** Golf club definitions affect launch angle and power. */
export interface Club {
  id: string;
  name: string;
  /** Launch angle in degrees. */
  loft: number;
  /** Power multiplier applied to the shot. */
  powerFactor: number;
  shortName: string;
}

export interface PlayerCustomization {
  shirtColor: string;
  hatStyle: HatStyle;
  ballSkin: string;
  trailColor: string;
}

export type HatStyle = "none" | "cap" | "bucket" | "visor";

export interface PlayerProgress {
  coins: number;
  xp: number;
  level: number;
  holesCompleted: number;
  coursesCompleted: number;
  holesInOne: number;
}
