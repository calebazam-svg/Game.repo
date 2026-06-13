import Link from "next/link";
import { COURSES } from "@/courses";
import { CourseConfig } from "@/types";

const THEME_EMOJI: Record<string, string> = {
  forest: "🌲",
  beach: "🏖️",
  desert: "🌵",
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "text-emerald-300",
  Medium: "text-amber-300",
  Hard: "text-rose-300",
};

export default function CoursesPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Courses</h1>
          <p className="mt-1 text-white/60">Pick a course and tee off.</p>
        </div>
        <Link href="/" className="btn-secondary">
          ← Home
        </Link>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}

function CourseCard({ course }: { course: CourseConfig }) {
  return (
    <div className="panel flex flex-col overflow-hidden">
      {/* Preview */}
      <div
        className={`relative grid h-40 place-items-center bg-gradient-to-br ${course.previewGradient}`}
      >
        <span className="text-6xl drop-shadow-lg" aria-hidden>
          {THEME_EMOJI[course.theme]}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
          {course.difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold">{course.name}</h2>
        <p className="mt-1 flex-1 text-sm text-white/60">
          {course.description}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Spec label="Holes" value={course.holes.length.toString()} />
          <Spec label="Par" value={course.par.toString()} />
          <Spec
            label="Level"
            value={course.difficulty}
            className={DIFFICULTY_COLOR[course.difficulty]}
          />
        </dl>

        <Link
          href={`/play?course=${course.id}`}
          className="btn-primary mt-5 w-full"
        >
          ▶ Play {course.name.replace(" Course", "")}
        </Link>
      </div>
    </div>
  );
}

function Spec({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="rounded-lg bg-white/5 py-2">
      <dd className={`text-base font-bold ${className}`}>{value}</dd>
      <dt className="text-[10px] uppercase tracking-wide text-white/40">
        {label}
      </dt>
    </div>
  );
}
