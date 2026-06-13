export function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const big = size === "lg";
  return (
    <div className="flex items-center gap-3 no-touch-callout">
      <div
        className={`grid place-items-center rounded-2xl bg-gradient-to-br from-brand-light to-brand-dark shadow-glow ${
          big ? "h-16 w-16" : "h-10 w-10"
        }`}
      >
        <span className={big ? "text-3xl" : "text-xl"} aria-hidden>
          ⛳
        </span>
      </div>
      <div className="leading-none">
        <div
          className={`font-extrabold tracking-tight ${
            big ? "text-4xl sm:text-5xl" : "text-xl"
          }`}
        >
          <span className="text-brand-light">Zamotek</span>{" "}
          <span className="text-white">Golf</span>
        </div>
        {big && (
          <div className="mt-1 text-sm font-medium text-white/60">
            3D Golf • Phase 1
          </div>
        )}
      </div>
    </div>
  );
}
