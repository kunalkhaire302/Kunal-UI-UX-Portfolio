# Techfest — IIT Bombay Landing Page Redesign

A premium, original single-page redesign concept for Techfest, IIT Bombay's 30th edition. The implementation uses a Vite + vanilla JavaScript architecture to keep the page lightweight and dependency-light while still delivering React/Vite-style component separation in the data-driven `src/main.js` render functions.

## Design direction

- Dark graphite foundation with controlled Techfest-inspired acid-lime, cyan, orange and violet accents.
- 2D signal-board / telemetry visual language instead of 3D assets.
- Editorial typography, asymmetric layouts, sharp information hierarchy and generous negative space.
- Motion is intentionally subtle: scroll reveal, counters, orbital lines, magnetic buttons and domain-switching visuals.
- Mobile uses a dedicated layout rather than simply shrinking the desktop composition.

## Research notes

The redesign is informed by the current Techfest / IIT Bombay context available in September 2026:

- Techfest's official site identifies the 30th edition and the 16–18 December 2026 dates.
- Current Techfest messaging describes the festival as Asia's largest science and technology festival, with 300+ events and 1,80,000+ footfall across three days.
- Current programming includes competitions, workshops, exhibitions, summits / talks, robotics, AI and other technology-led formats.
- The history emphasizes Techfest's origins in 1998 and notable chapters including Micromouse robotics, the International Drone Racing League, drone shows and the 2025 Global Humanoid Conclave.
- The speaker section is intentionally labeled around *past featured personalities* rather than implying a current 2026 speaker roster.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## GitHub submission

```bash
git init
git add .
git commit -m "Build Techfest IIT Bombay landing page redesign"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## Demo recording

Record the live page in a browser at desktop width and mobile width. Suggested 60–90 second walkthrough: hero → metrics → event hover states → innovation domain switcher → archive timeline → final registration CTA.
