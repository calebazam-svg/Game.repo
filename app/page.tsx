import Link from "next/link";
import { Logo } from "@/components/Logo";
import { StatsBar } from "@/components/StatsBar";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/30 via-slate-950 to-slate-950" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-pop-in space-y-8">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" />
          <p className="mt-4 max-w-sm text-balance text-white/70">
            Tee off across three handcrafted 3D courses. Sink putts, grab coins
            and gems, level up, and make your golfer your own.
          </p>
        </div>

        <StatsBar />

        <nav className="grid gap-3">
          <Link href="/play" className="btn-primary text-lg">
            ▶ Play
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/courses" className="btn-secondary">
              🏞 Courses
            </Link>
            <Link href="/customize" className="btn-secondary">
              🎨 Customize
            </Link>
          </div>
        </nav>

        <p className="text-center text-xs text-white/40">
          Progress saves automatically in your browser.
        </p>
      </div>
    </main>
  );
}
