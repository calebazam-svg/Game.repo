"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { CLUBS } from "@/game/clubs";

export function ShotControls() {
  const shotState = useGameStore((s) => s.shotState);
  const paused = useGameStore((s) => s.paused);
  const holeComplete = useGameStore((s) => s.holeComplete);
  const clubId = useGameStore((s) => s.clubId);
  const setClub = useGameStore((s) => s.setClub);
  const adjustAim = useGameStore((s) => s.adjustAim);
  const takeShot = useGameStore((s) => s.takeShot);

  const [power, setPower] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const charging = useRef(false);
  const raf = useRef<number>(0);
  const dir = useRef(1);

  const canShoot = shotState === "aiming" && !paused && !holeComplete;

  const stopLoop = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = 0;
  };

  // Ping-pong the power meter while charging.
  const startCharge = () => {
    if (!canShoot || charging.current) return;
    charging.current = true;
    setIsCharging(true);
    dir.current = 1;
    let p = 0;
    const tick = () => {
      p += dir.current * 0.018;
      if (p >= 1) {
        p = 1;
        dir.current = -1;
      } else if (p <= 0) {
        p = 0;
        dir.current = 1;
      }
      setPower(p);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const release = () => {
    if (!charging.current) return;
    charging.current = false;
    setIsCharging(false);
    stopLoop();
    const finalPower = Math.max(0.08, power);
    setPower(0);
    takeShot(finalPower);
  };

  // Keyboard controls: arrows to aim, space to charge/release.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === "ArrowLeft") adjustAim(-0.06);
      else if (e.key === "ArrowRight") adjustAim(0.06);
      else if (e.key === " ") {
        e.preventDefault();
        startCharge();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        release();
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canShoot, power]);

  useEffect(() => stopLoop, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4">
      {/* Club selector */}
      <div className="pointer-events-auto mx-auto mb-3 flex max-w-md justify-center gap-2">
        {CLUBS.map((club) => (
          <button
            key={club.id}
            onClick={() => setClub(club.id)}
            className={`flex flex-1 flex-col items-center rounded-xl px-2 py-2 text-xs font-bold ring-1 transition ${
              clubId === club.id
                ? "bg-brand text-slate-950 ring-brand"
                : "bg-white/10 text-white ring-white/15 hover:bg-white/20"
            }`}
          >
            <span className="text-base">{club.shortName}</span>
            <span className="opacity-80">{club.name}</span>
          </button>
        ))}
      </div>

      <div className="mx-auto flex max-w-md items-end justify-between gap-3">
        {/* Aim left */}
        <button
          onClick={() => adjustAim(-0.1)}
          disabled={!canShoot}
          className="pointer-events-auto panel grid h-16 w-16 place-items-center text-2xl disabled:opacity-40"
          aria-label="Aim left"
        >
          ◀
        </button>

        {/* Power meter + shoot */}
        <div className="pointer-events-auto flex flex-1 flex-col items-center gap-2">
          <div className="h-4 w-full overflow-hidden rounded-full bg-white/15 ring-1 ring-white/20">
            <div
              className="h-full rounded-full transition-[width] duration-75"
              style={{
                width: `${power * 100}%`,
                background:
                  "linear-gradient(90deg,#22c55e,#eab308 60%,#ef4444)",
              }}
            />
          </div>
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              startCharge();
            }}
            onPointerUp={release}
            onPointerLeave={release}
            onPointerCancel={release}
            disabled={!canShoot}
            className="btn-primary w-full select-none text-lg disabled:opacity-50"
          >
            {shotState === "rolling"
              ? "Ball in motion…"
              : isCharging
              ? "Release!"
              : "Hold to Swing"}
          </button>
        </div>

        {/* Aim right */}
        <button
          onClick={() => adjustAim(0.1)}
          disabled={!canShoot}
          className="pointer-events-auto panel grid h-16 w-16 place-items-center text-2xl disabled:opacity-40"
          aria-label="Aim right"
        >
          ▶
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-white/50">
        Hold Swing to charge power · ◀ ▶ or arrow keys to aim · drag to orbit
      </p>
    </div>
  );
}
