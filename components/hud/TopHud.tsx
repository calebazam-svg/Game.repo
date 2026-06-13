"use client";

import { usePlayerStore, xpForLevel } from "@/store/playerStore";
import { useGameStore } from "@/store/gameStore";
import { useHasMounted } from "@/components/useHasMounted";
import { CourseConfig } from "@/types";

export function TopHud({ course }: { course: CourseConfig }) {
  const mounted = useHasMounted();
  const progress = usePlayerStore((s) => s.progress);
  const setPaused = useGameStore((s) => s.setPaused);
  const holeIndex = useGameStore((s) => s.holeIndex);
  const strokes = useGameStore((s) => s.strokes);

  const hole = course.holes[holeIndex] ?? course.holes[0];
  const coins = mounted ? progress.coins : 0;
  const level = mounted ? progress.level : 1;
  const xp = mounted ? progress.xp : 0;
  const needed = xpForLevel(level);
  const pct = Math.min(100, Math.round((xp / needed) * 100));

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-3 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        {/* Coins + XP */}
        <div className="pointer-events-auto panel flex items-center gap-3 px-3 py-2">
          <div className="flex items-center gap-1.5 font-bold">
            <span aria-hidden>🪙</span>
            <span className="tabular-nums">{coins.toLocaleString()}</span>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div className="w-28">
            <div className="flex justify-between text-[10px] text-white/60">
              <span>Lv {level}</span>
              <span>
                {xp}/{needed}
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-brand-light to-brand transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Hole info */}
        <div className="pointer-events-auto panel px-3 py-2 text-center">
          <div className="text-[10px] uppercase tracking-wide text-white/50">
            {course.name.replace(" Course", "")}
          </div>
          <div className="text-sm font-bold">
            Hole {holeIndex + 1}/{course.holes.length} · Par {hole.par}
          </div>
        </div>

        {/* Strokes + pause */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="panel px-3 py-2 text-center">
            <div className="text-[10px] uppercase tracking-wide text-white/50">
              Strokes
            </div>
            <div className="text-lg font-bold leading-none tabular-nums">
              {strokes}
            </div>
          </div>
          <button
            onClick={() => setPaused(true)}
            className="panel grid h-12 w-12 place-items-center text-xl hover:bg-white/15"
            aria-label="Pause"
          >
            ⏸
          </button>
        </div>
      </div>
    </div>
  );
}
