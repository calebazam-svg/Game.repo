"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PlayerCustomization, PlayerProgress, HatStyle } from "@/types";

// XP required to reach the *next* level grows linearly.
export const xpForLevel = (level: number): number => 100 + (level - 1) * 75;

export const BALL_SKINS = [
  { id: "#f8fafc", name: "Classic White" },
  { id: "#fde047", name: "Hi-Vis Yellow" },
  { id: "#fb7185", name: "Pink Pop" },
  { id: "#38bdf8", name: "Sky Blue" },
  { id: "#a3e635", name: "Lime" },
];

export const TRAIL_COLORS = [
  { id: "#22c55e", name: "Green" },
  { id: "#f59e0b", name: "Amber" },
  { id: "#3b82f6", name: "Blue" },
  { id: "#ec4899", name: "Magenta" },
  { id: "#ffffff", name: "White" },
];

export const SHIRT_COLORS = [
  { id: "#ef4444", name: "Red" },
  { id: "#3b82f6", name: "Blue" },
  { id: "#22c55e", name: "Green" },
  { id: "#f97316", name: "Orange" },
  { id: "#a855f7", name: "Purple" },
  { id: "#0f172a", name: "Charcoal" },
];

export const HAT_STYLES: { id: HatStyle; name: string }[] = [
  { id: "none", name: "None" },
  { id: "cap", name: "Cap" },
  { id: "bucket", name: "Bucket" },
  { id: "visor", name: "Visor" },
];

interface PlayerState {
  progress: PlayerProgress;
  customization: PlayerCustomization;
  hydrated: boolean;

  setHydrated: () => void;
  setCustomization: (patch: Partial<PlayerCustomization>) => void;

  /** Grant rewards and handle level-ups. Returns levels gained. */
  addRewards: (reward: { coins?: number; xp?: number }) => number;
  recordHoleComplete: (opts: { holeInOne: boolean }) => void;
  recordCourseComplete: () => void;
  resetProgress: () => void;
}

const DEFAULT_PROGRESS: PlayerProgress = {
  coins: 0,
  xp: 0,
  level: 1,
  holesCompleted: 0,
  coursesCompleted: 0,
  holesInOne: 0,
};

const DEFAULT_CUSTOMIZATION: PlayerCustomization = {
  shirtColor: "#ef4444",
  hatStyle: "cap",
  ballSkin: "#f8fafc",
  trailColor: "#22c55e",
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      progress: DEFAULT_PROGRESS,
      customization: DEFAULT_CUSTOMIZATION,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      setCustomization: (patch) =>
        set((s) => ({ customization: { ...s.customization, ...patch } })),

      addRewards: ({ coins = 0, xp = 0 }) => {
        const { progress } = get();
        let newXp = progress.xp + xp;
        let newLevel = progress.level;
        let levelsGained = 0;

        // Roll over XP into levels.
        while (newXp >= xpForLevel(newLevel)) {
          newXp -= xpForLevel(newLevel);
          newLevel += 1;
          levelsGained += 1;
        }

        set({
          progress: {
            ...progress,
            coins: progress.coins + coins,
            xp: newXp,
            level: newLevel,
          },
        });
        return levelsGained;
      },

      recordHoleComplete: ({ holeInOne }) =>
        set((s) => ({
          progress: {
            ...s.progress,
            holesCompleted: s.progress.holesCompleted + 1,
            holesInOne: s.progress.holesInOne + (holeInOne ? 1 : 0),
          },
        })),

      recordCourseComplete: () =>
        set((s) => ({
          progress: {
            ...s.progress,
            coursesCompleted: s.progress.coursesCompleted + 1,
          },
        })),

      resetProgress: () =>
        set({
          progress: DEFAULT_PROGRESS,
          customization: DEFAULT_CUSTOMIZATION,
        }),
    }),
    {
      name: "zamotek-golf-player",
      partialize: (s) => ({
        progress: s.progress,
        customization: s.customization,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
