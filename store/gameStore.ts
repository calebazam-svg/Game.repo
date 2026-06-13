"use client";

import { create } from "zustand";
import { CourseId } from "@/types";
import { DEFAULT_CLUB_ID } from "@/game/clubs";

export type ShotState = "aiming" | "charging" | "rolling";

export interface Toast {
  id: number;
  message: string;
  tone: "reward" | "info" | "success";
}

interface GameState {
  courseId: CourseId;
  holeIndex: number;
  strokes: number;
  totalStrokes: number;
  clubId: string;
  /** Aim direction in radians around the Y axis. */
  aimAngle: number;
  /** Power 0..1 captured when a shot is taken. */
  shotPower: number;
  shotState: ShotState;
  paused: boolean;
  holeComplete: boolean;
  courseComplete: boolean;
  collected: Record<string, boolean>;
  toasts: Toast[];

  setCourse: (id: CourseId) => void;
  setHoleIndex: (i: number) => void;
  setClub: (id: string) => void;
  setAimAngle: (a: number) => void;
  adjustAim: (delta: number) => void;
  takeShot: (power: number) => void;
  setShotState: (s: ShotState) => void;
  incrementStroke: () => void;
  collect: (id: string) => boolean;
  isCollected: (id: string) => boolean;
  completeHole: () => void;
  completeCourse: () => void;
  nextHole: (holeCount: number) => void;
  setPaused: (p: boolean) => void;
  pushToast: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
  resetHole: () => void;
  resetRound: (id: CourseId) => void;
}

let toastId = 0;

export const useGameStore = create<GameState>((set, get) => ({
  courseId: "forest",
  holeIndex: 0,
  strokes: 0,
  totalStrokes: 0,
  clubId: DEFAULT_CLUB_ID,
  aimAngle: 0,
  shotPower: 0,
  shotState: "aiming",
  paused: false,
  holeComplete: false,
  courseComplete: false,
  collected: {},
  toasts: [],

  setCourse: (id) => set({ courseId: id }),
  setHoleIndex: (i) => set({ holeIndex: i }),
  setClub: (id) => set({ clubId: id }),
  setAimAngle: (a) => set({ aimAngle: a }),
  adjustAim: (delta) => set((s) => ({ aimAngle: s.aimAngle + delta })),

  takeShot: (power) =>
    set((s) => ({
      shotPower: power,
      shotState: "rolling",
      strokes: s.strokes + 1,
      totalStrokes: s.totalStrokes + 1,
    })),

  setShotState: (shotState) => set({ shotState }),
  incrementStroke: () =>
    set((s) => ({
      strokes: s.strokes + 1,
      totalStrokes: s.totalStrokes + 1,
    })),

  collect: (id) => {
    if (get().collected[id]) return false;
    set((s) => ({ collected: { ...s.collected, [id]: true } }));
    return true;
  },
  isCollected: (id) => !!get().collected[id],

  completeHole: () => set({ holeComplete: true, shotState: "aiming" }),
  completeCourse: () => set({ courseComplete: true }),

  nextHole: (holeCount) =>
    set((s) => {
      const next = s.holeIndex + 1;
      if (next >= holeCount) {
        return { courseComplete: true, holeComplete: false };
      }
      return {
        holeIndex: next,
        strokes: 0,
        shotState: "aiming",
        holeComplete: false,
        shotPower: 0,
      };
    }),

  setPaused: (paused) => set({ paused }),

  pushToast: (message, tone = "info") => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts, { id, message, tone }] }));
    return id;
  },
  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  resetHole: () =>
    set({ strokes: 0, shotState: "aiming", shotPower: 0, holeComplete: false }),

  resetRound: (id) =>
    set({
      courseId: id,
      holeIndex: 0,
      strokes: 0,
      totalStrokes: 0,
      shotState: "aiming",
      shotPower: 0,
      paused: false,
      holeComplete: false,
      courseComplete: false,
      collected: {},
      clubId: DEFAULT_CLUB_ID,
      aimAngle: 0,
    }),
}));
