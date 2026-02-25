# SpectraQuest

A gamified spectroscopy puzzle game. Identify molecules from their vibrational spectra through progressive challenges, peak detective work, and molecular building.

## Game Modes

- **Mystery Mode** — Given an unknown spectrum, identify the molecule. Analyze peaks, match functional groups, eliminate candidates. Harder molecules unlock as you progress.
- **Speed Round** — Rapid-fire peak identification. "Is this peak C=O, O-H, C-H, or N-H?" Beat the clock.
- **Build Mode** — Given a target spectrum, construct the molecule by adding functional groups. Watch the predicted spectrum update live as you build.
- **Campaign** — 30+ levels across 5 difficulty tiers, from simple alcohols to complex natural products.

## Features

- Real-time interactive spectrum viewer (zoom, pan, peak pick)
- Functional group reference library with characteristic frequency ranges
- Scoring: accuracy × speed × streak multiplier
- Achievements and progression system
- Annotated solutions after each round explaining peak assignments
- Works entirely in the browser — no server needed

## Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Charts:** Recharts for interactive spectrum plots
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS 4
- **State:** Zustand for game state management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
