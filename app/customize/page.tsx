"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import {
  usePlayerStore,
  SHIRT_COLORS,
  HAT_STYLES,
  BALL_SKINS,
  TRAIL_COLORS,
} from "@/store/playerStore";
import { useHasMounted } from "@/components/useHasMounted";
import { HatStyle } from "@/types";

const GolferPreview = dynamic(
  () => import("@/game/GolferPreview").then((m) => m.GolferPreview),
  { ssr: false }
);

export default function CustomizePage() {
  const mounted = useHasMounted();
  const customization = usePlayerStore((s) => s.customization);
  const setCustomization = usePlayerStore((s) => s.setCustomization);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Customize</h1>
          <p className="mt-1 text-white/60">
            Make your golfer your own. Changes save automatically.
          </p>
        </div>
        <Link href="/" className="btn-secondary">
          ← Home
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Preview */}
        <div className="panel h-[360px] overflow-hidden lg:h-[520px]">
          {mounted ? (
            <GolferPreview
              shirtColor={customization.shirtColor}
              hatStyle={customization.hatStyle}
              ballSkin={customization.ballSkin}
            />
          ) : (
            <div className="grid h-full place-items-center text-white/40">
              Loading preview…
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <Section title="Shirt Color">
            <Swatches
              options={SHIRT_COLORS}
              selected={customization.shirtColor}
              onSelect={(id) => setCustomization({ shirtColor: id })}
            />
          </Section>

          <Section title="Hat Style">
            <div className="flex flex-wrap gap-2">
              {HAT_STYLES.map((h) => (
                <button
                  key={h.id}
                  onClick={() =>
                    setCustomization({ hatStyle: h.id as HatStyle })
                  }
                  className={`rounded-xl px-4 py-2 text-sm font-semibold ring-1 transition ${
                    customization.hatStyle === h.id
                      ? "bg-brand text-slate-950 ring-brand"
                      : "bg-white/10 text-white ring-white/15 hover:bg-white/20"
                  }`}
                >
                  {h.name}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Golf Ball Skin">
            <Swatches
              options={BALL_SKINS}
              selected={customization.ballSkin}
              onSelect={(id) => setCustomization({ ballSkin: id })}
            />
          </Section>

          <Section title="Trail Color">
            <Swatches
              options={TRAIL_COLORS}
              selected={customization.trailColor}
              onSelect={(id) => setCustomization({ trailColor: id })}
            />
          </Section>

          <Link href="/play" className="btn-primary w-full">
            ▶ Test it on the course
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel p-5">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/60">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Swatches({
  options,
  selected,
  onSelect,
}: {
  options: { id: string; name: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onSelect(o.id)}
          title={o.name}
          aria-label={o.name}
          className={`h-11 w-11 rounded-full ring-2 ring-offset-2 ring-offset-slate-900 transition ${
            selected === o.id
              ? "ring-white scale-110"
              : "ring-white/20 hover:ring-white/50"
          }`}
          style={{ backgroundColor: o.id }}
        />
      ))}
    </div>
  );
}
