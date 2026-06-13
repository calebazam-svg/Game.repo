"use client";

import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

export function PauseMenu() {
  const paused = useGameStore((s) => s.paused);
  const setPaused = useGameStore((s) => s.setPaused);
  const resetHole = useGameStore((s) => s.resetHole);

  if (!paused) return null;

  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
      <div className="panel w-80 max-w-[90vw] animate-pop-in space-y-3 p-6 text-center">
        <h2 className="text-2xl font-extrabold">Paused</h2>
        <button onClick={() => setPaused(false)} className="btn-primary w-full">
          ▶ Resume
        </button>
        <button
          onClick={() => {
            resetHole();
            setPaused(false);
          }}
          className="btn-secondary w-full"
        >
          ↺ Restart Hole
        </button>
        <Link href="/courses" className="btn-secondary w-full">
          🏞 Courses
        </Link>
        <Link href="/" className="btn-secondary w-full">
          🏠 Quit to Home
        </Link>
      </div>
    </div>
  );
}
