# Orbital Architect

A gamified quantum chemistry puzzle game. Build atoms by filling electron orbitals following real quantum mechanical rules — aufbau principle, Pauli exclusion, Hund's rule. Watch 3D orbitals materialize as you place electrons.

## Game Modes

- **Campaign** — Build elements from hydrogen to krypton. Each level is a target element; fill orbitals correctly to complete it.
- **Challenge Mode** — Timed rounds: build the electron configuration as fast as possible.
- **Sandbox** — Free exploration. Place electrons anywhere, break rules, see what happens.

## Features

- Interactive 3D orbital visualizations (s, p, d shapes)
- Drag-and-drop electron placement
- Real-time energy level diagram
- Quantum number display (n, l, ml, ms) for each electron
- Rule violation feedback with explanations
- Scoring, streaks, and achievements
- Periodic table integration

## Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **3D:** Three.js / React Three Fiber for orbital rendering
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS 4
- **State:** Zustand

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
