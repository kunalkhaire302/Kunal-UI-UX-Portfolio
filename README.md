# Kunal's Control Room

A UI/UX-focused portfolio that connects Kunal Khaire's product work with the visual and interaction lessons found in gaming, photography, and video editing.

> I don't just design screens, I design experiences — and my hobbies taught me how.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4 (existing build integration)
- Framer Motion for component and route transitions
- GSAP + ScrollTrigger connected to Lenis smooth scrolling
- Space Grotesk, Manrope, and JetBrains Mono bundled locally
- Static prerendering for the homepage and every `/work/:slug` route
- Vercel SPA rewrite for direct case-study URLs

## Run locally

Node.js 20.19+ or 22.12+ is recommended.

```sh
npm ci
npm run dev
```

Production check:

```sh
npm run build
npm run preview
```

The build creates prerendered HTML, route metadata, `sitemap.xml`, and `robots.txt` in `dist/`.

## Page structure

1. Session-only boot sequence
2. Control-room hero with Play, Capture, Create, and Quests navigation
3. Player Profile and portfolio-emphasis bars
4. Three featured UI/UX Quests plus two supporting product explorations
5. Structured case studies: Research → Wireframe → Prototype → Test
6. Capture photography gallery with keyboard lightbox
7. Create editing timeline with keyboard-operable playhead
8. Play cards connecting game patterns to UX lessons
9. Player 2 contact finale

## Where the content lives

- `src/data/projects.ts` — verified project descriptions plus clearly labeled proposed interface directions.
- `src/data/studio.ts` — photography, videos, games, and profile emphasis. Unverified details are explicitly marked as unavailable.
- `public/photos/` — optimized portfolio photography used by the Capture gallery.
- `public/games/` — locally hosted game artwork used by the Play Room cards.
- `public/videos/` — optimized project videos, generated poster frames, and the sample VTT structure for future captions.
- `src/components/ProjectVisual.tsx` — illustrative UI concepts, not original product screenshots.
- `DESIGN.md` — visual tokens, type, interaction rules, UI/UX concepts, and content-integrity rules.

## Content still required

- Add the real portrait and update the Player Profile visual.
- Add verified camera/settings metadata for the Capture photographs when available.
- Add accurate caption tracks for the three project videos when transcripts are available.
- Add the original resume at `public/resume.pdf`, then set `profile.resume` to `/resume.pdf`.
- Add the verified email address to `profile.email`.
- Replace illustrative project visuals with original screenshots only when permission and source files are available.
- Add measured outcomes or testing results only when evidence is available.

The interface deliberately avoids inventing personal facts, user-research findings, performance metrics, or project outcomes.

## Accessibility and performance

- Semantic landmarks and a skip link
- Visible focus states and 44px+ primary touch targets
- Escape-to-close mobile navigation and lightbox
- Lightbox focus loop plus arrow-key navigation
- Native range controls for comparison and video timeline
- `prefers-reduced-motion` disables animation, parallax, custom cursor, and smooth scrolling
- Lazy-loaded photography and video posters
- No remote font calls, analytics, or tracking libraries

Run a final Lighthouse and real-device pass after changing media because asset dimensions and encoding can materially change performance.

## Deployment

The production repository is connected to Vercel. `vercel.json` rewrites application routes to `index.html`; prerendered route folders still provide metadata and no-JavaScript content. The canonical origin is configured in `scripts/prerender.mjs`.
