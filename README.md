# ⛳ Zamotek Golf — Phase 1 MVP

A polished, single-player 3D golf game built with **Next.js 15**, **React Three
Fiber / Three.js**, **TypeScript**, **Tailwind CSS**, and **Zustand**. No
backend, no database, no auth — everything runs client-side and progress is
saved to `localStorage`.

## Features

- **True 3D gameplay** — third-person orbit camera, a visible golfer, ball
  flight physics with bounce + roll, hole detection, and stroke counting.
- **Three handcrafted courses** — Forest (easy), Beach (medium), and Desert
  (hard), each with themed scenery and obstacles.
- **Club selection** — Driver, Iron, Wedge, and Putter, each with its own loft
  and power profile.
- **Charge-and-release power meter** plus aim controls (on-screen buttons,
  arrow keys, and drag-to-orbit).
- **Collectibles** — coins and gems scattered across every hole grant rewards.
- **Progression** — earn coins and XP, level up, and chase hole-in-one bonuses.
- **Customization** — shirt color, hat style, ball skin, and trail color, with a
  live 3D preview.
- **Full HUD** — coin display, XP bar, current club, stroke counter, hole/par
  info, pause menu, and reward toasts.

## Routes

| Route        | Description                              |
| ------------ | ---------------------------------------- |
| `/`          | Home — logo, player stats, navigation    |
| `/courses`   | Course selection with previews           |
| `/play`      | The 3D golf game (`?course=forest|beach|desert`) |
| `/customize` | Golfer & equipment customization         |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

Deploys cleanly to **Vercel** as a static-friendly Next.js app — no environment
variables or external services required.

## Project structure

```
app/          Next.js App Router pages (/, /play, /courses, /customize)
components/    UI + HUD (StatsBar, Logo, TopHud, ShotControls, overlays…)
game/          R3F scene + gameplay (GolfGame, Ball, Golfer, physics, camera…)
courses/       Static course definitions (forest, beach, desert)
store/         Zustand stores (player progression + in-game state)
types/         Shared TypeScript types
public/        Static assets
```

## Controls

- **Hold "Swing"** (or `Space`) to charge power, release to shoot.
- **◀ / ▶ buttons** or **arrow keys** to aim.
- **Drag** to orbit the camera; scroll/pinch to zoom.
- Pick a **club** from the bottom bar.

## Extension points (future phases)

The architecture intentionally leaves room to grow without rework:

- `courses/` — add new `CourseConfig` objects (more holes, undulating terrain).
- `game/physics.ts` — `terrainHeight()` is already a hook for non-flat greens.
- `store/gameStore.ts` / `playerStore.ts` — add tournaments, shops, or unlocks.
- Customization lists in `store/playerStore.ts` are data-driven and easy to extend.

> Phase 1 deliberately ships no multiplayer, tournaments, shops, creators, or
> backend systems.
