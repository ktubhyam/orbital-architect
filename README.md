# Spectral Playground

Interactive browser-based spectrum preprocessing sandbox. Upload a spectrum, apply transformations in real time, and see the results instantly.

## Features

- **Drag-and-drop spectrum upload** (JCAMP-DX, CSV, SPC)
- **Real-time preprocessing chain:**
  - Baseline correction (ALS, SNIP, polynomial)
  - Smoothing (Savitzky-Golay, Whittaker)
  - Normalization (SNV, min-max, area, vector)
  - Derivative (1st, 2nd order Savitzky-Golay)
- **Visual diff** — before/after overlay with highlighting
- **Pipeline builder** — drag and reorder preprocessing steps
- **Export** — download processed spectrum as CSV or copy pipeline code (Python/SpectraKit)
- **Preloaded examples** — benzaldehyde IR, ethanol Raman, aspirin UV-Vis

## Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Charts:** D3.js for interactive spectrum plots
- **Processing:** Web Workers for non-blocking computation
- **Styling:** Tailwind CSS 4

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

All preprocessing runs client-side in Web Workers — no server needed. The pipeline builder generates equivalent Python code using SpectraKit, so you can reproduce results in your research workflow.

## License

MIT
