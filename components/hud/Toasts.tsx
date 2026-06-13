"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export function Toasts() {
  const toasts = useGameStore((s) => s.toasts);
  const dismiss = useGameStore((s) => s.dismissToast);

  return (
    <div className="pointer-events-none absolute left-1/2 top-20 z-30 flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          id={t.id}
          message={t.message}
          tone={t.tone}
          onDone={dismiss}
        />
      ))}
    </div>
  );
}

function Toast({
  id,
  message,
  tone,
  onDone,
}: {
  id: number;
  message: string;
  tone: "reward" | "info" | "success";
  onDone: (id: number) => void;
}) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 2200);
    return () => clearTimeout(t);
  }, [id, onDone]);

  const toneClass =
    tone === "success"
      ? "bg-emerald-500 text-slate-950"
      : tone === "reward"
      ? "bg-amber-400 text-slate-950"
      : "bg-white/90 text-slate-900";

  return (
    <div
      className={`animate-pop-in rounded-full px-4 py-2 text-sm font-bold shadow-lg ${toneClass}`}
    >
      {message}
    </div>
  );
}
