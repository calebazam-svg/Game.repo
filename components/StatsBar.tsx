"use client";

import { usePlayerStore, xpForLevel } from "@/store/playerStore";
import { useHasMounted } from "./useHasMounted";

export function StatsBar() {
  const mounted = useHasMounted();
  const progress = usePlayerStore((s) => s.progress);

  // Render zeroed defaults until hydrated to avoid SSR mismatch.
  const p = mounted
    ? progress
    : { coins: 0, xp: 0, level: 1, holesCompleted: 0, coursesCompleted: 0, holesInOne: 0 };

  const needed = xpForLevel(p.level);
  const pct = Math.min(100, Math.round((p.xp / needed) * 100));

  return (
    <div className="panel grid w-full grid-cols-3 gap-3 p-4 sm:gap-4">
      <Stat label="Coins" value={p.coins.toLocaleString()} icon="🪙" />
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-white/70">Level {p.level}</span>
          <span className="text-white/50">
            {p.xp}/{needed} XP
          </span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-light to-brand transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <Stat label="Holes" value={p.holesCompleted.toString()} icon="🏌️" />
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-2xl" aria-hidden>
        {icon}
      </div>
      <div className="mt-1 text-lg font-bold leading-none">{value}</div>
      <div className="text-xs uppercase tracking-wide text-white/50">
        {label}
      </div>
    </div>
  );
}
