"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { usePlayerStore } from "@/store/playerStore";
import { CourseConfig } from "@/types";

export function CompletionOverlay({ course }: { course: CourseConfig }) {
  const holeComplete = useGameStore((s) => s.holeComplete);
  const courseComplete = useGameStore((s) => s.courseComplete);
  const holeIndex = useGameStore((s) => s.holeIndex);
  const strokes = useGameStore((s) => s.strokes);
  const totalStrokes = useGameStore((s) => s.totalStrokes);
  const nextHole = useGameStore((s) => s.nextHole);

  const hole = course.holes[holeIndex] ?? course.holes[0];
  const isLastHole = holeIndex >= course.holes.length - 1;

  if (courseComplete) {
    return (
      <CourseCompleteCard
        course={course}
        totalStrokes={totalStrokes}
      />
    );
  }

  if (!holeComplete) return null;

  const diff = strokes - hole.par;
  const verdict = scoreVerdict(strokes, hole.par);

  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
      <div className="panel w-80 max-w-[90vw] animate-pop-in space-y-4 p-6 text-center">
        <div className="text-5xl" aria-hidden>
          {strokes === 1 ? "🏆" : "⛳"}
        </div>
        <h2 className="text-2xl font-extrabold">{verdict}</h2>
        <p className="text-white/70">
          Hole {holeIndex + 1} · {strokes} stroke{strokes === 1 ? "" : "s"} (
          {diff === 0 ? "par" : diff > 0 ? `+${diff}` : diff})
        </p>
        <button
          onClick={() => nextHole(course.holes.length)}
          className="btn-primary w-full text-lg"
        >
          {isLastHole ? "🏁 Finish Course" : "➡ Next Hole"}
        </button>
      </div>
    </div>
  );
}

function CourseCompleteCard({
  course,
  totalStrokes,
}: {
  course: CourseConfig;
  totalStrokes: number;
}) {
  const addRewards = usePlayerStore((s) => s.addRewards);
  const recordCourseComplete = usePlayerStore((s) => s.recordCourseComplete);
  const pushToast = useGameStore((s) => s.pushToast);
  const awarded = useRef(false);

  // Award the course-completion bonus exactly once.
  useEffect(() => {
    if (awarded.current) return;
    awarded.current = true;
    const underPar = Math.max(0, course.par - totalStrokes);
    const coins = 150 + underPar * 25;
    const xp = 200 + underPar * 30;
    addRewards({ coins, xp });
    recordCourseComplete();
    pushToast(`Course cleared! +${coins} 🪙 +${xp} XP`, "success");
  }, [addRewards, recordCourseComplete, pushToast, course.par, totalStrokes]);

  const diff = totalStrokes - course.par;

  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-slate-950/80 backdrop-blur-sm">
      <div className="panel w-80 max-w-[90vw] animate-pop-in space-y-4 p-6 text-center">
        <div className="text-6xl animate-float" aria-hidden>
          🏆
        </div>
        <h2 className="text-2xl font-extrabold">Course Complete!</h2>
        <p className="text-white/70">{course.name}</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/5 py-3">
            <div className="text-xl font-bold">{totalStrokes}</div>
            <div className="text-[10px] uppercase text-white/50">
              Total Strokes
            </div>
          </div>
          <div className="rounded-lg bg-white/5 py-3">
            <div className="text-xl font-bold">
              {diff === 0 ? "E" : diff > 0 ? `+${diff}` : diff}
            </div>
            <div className="text-[10px] uppercase text-white/50">To Par</div>
          </div>
        </div>
        <Link href="/courses" className="btn-primary w-full">
          🏞 More Courses
        </Link>
        <Link href="/" className="btn-secondary w-full">
          🏠 Home
        </Link>
      </div>
    </div>
  );
}

function scoreVerdict(strokes: number, par: number): string {
  if (strokes === 1) return "Hole in One!";
  const d = strokes - par;
  if (d <= -3) return "Albatross!";
  if (d === -2) return "Eagle!";
  if (d === -1) return "Birdie!";
  if (d === 0) return "Par";
  if (d === 1) return "Bogey";
  if (d === 2) return "Double Bogey";
  return "Hole Complete";
}
