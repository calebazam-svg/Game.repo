"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getCourse, isCourseId } from "@/courses";
import { useGameStore } from "@/store/gameStore";
import { TopHud } from "@/components/hud/TopHud";
import { ShotControls } from "@/components/hud/ShotControls";
import { PauseMenu } from "@/components/hud/PauseMenu";
import { CompletionOverlay } from "@/components/hud/CompletionOverlay";
import { Toasts } from "@/components/hud/Toasts";

// The R3F scene is client-only; never server-render the WebGL canvas.
const GolfGame = dynamic(
  () => import("@/game/GolfGame").then((m) => m.GolfGame),
  {
    ssr: false,
    loading: () => <SceneLoading />,
  }
);

function PlayInner() {
  const params = useSearchParams();
  const raw = params.get("course");
  const courseId = isCourseId(raw) ? raw : "forest";
  const course = getCourse(courseId);

  const resetRound = useGameStore((s) => s.resetRound);

  // Start a fresh round whenever the selected course changes.
  useEffect(() => {
    resetRound(courseId);
  }, [courseId, resetRound]);

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden no-touch-callout">
      <div className="absolute inset-0">
        <GolfGame course={course} />
      </div>

      <TopHud course={course} />
      <Toasts />
      <ShotControls />
      <CompletionOverlay course={course} />
      <PauseMenu />
    </main>
  );
}

function SceneLoading() {
  return (
    <div className="grid h-[100dvh] w-full place-items-center bg-slate-950 text-center">
      <div>
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-brand" />
        <p className="font-semibold text-white/70">Loading course…</p>
      </div>
    </div>
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={<SceneLoading />}>
      <PlayInner />
    </Suspense>
  );
}
