// Self-contained flat ESLint config.
//
// We intentionally do NOT depend on `eslint-config-next` (or ship ESLint as a
// dependency at all). Committing this file stops Next.js from auto-generating
// a config that imports `eslint-config-next`, which fails on clean installs
// (e.g. Vercel) where that package isn't present. Linting is also disabled in
// next.config.js via `eslint.ignoreDuringBuilds`, so this stays a no-op.
export default [];
