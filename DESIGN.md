# Kunal's Control Room — Design System

The portfolio uses a studio-control-room metaphor to connect Kunal's UI/UX work with gaming, photography, and video creation. The interface should feel precise and tactile rather than like a generic neon dashboard.

## Tokens

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `--cr-bg` | `#07111f` | `#f4f7fb` | Page background |
| `--cr-panel` | `#0d1b2d` | `#ffffff` | Raised panels |
| `--cr-violet` | `#8b5cf6` | `#6d38d6` | Primary action and focus |
| `--cr-cyan` | `#31d7ff` | `#087da1` | System state and links |
| `--cr-warm` | `#ffb15c` | `#b85b00` | Human/editorial accent |
| `--cr-text` | `#edf6ff` | `#132033` | Primary text |
| `--cr-muted` | `#9aabc0` | `#526176` | Supporting text |
| `--cr-line` | `#22344b` | `#d7e0eb` | Borders and dividers |

Spacing uses an 8px base rhythm. Panels use 20–28px padding, section spacing is 96–144px, and readable text is capped around 65 characters.

## Type

- **Space Grotesk Variable** — headings and large display statements.
- **Manrope Variable** — body copy and interface text.
- **JetBrains Mono Variable** — telemetry labels, metadata, and coordinates.

All fonts are bundled by Vite from local npm packages. No third-party font request is made in production.

## Interaction rules

- Violet is reserved for primary actions and selected states.
- Cyan communicates live/system state; warm orange marks personal notes and photography.
- Focus rings are always visible for keyboard users.
- Meaning is never communicated by color alone.
- Motion supports orientation: entry sequencing, route continuity, scroll progress, and direct manipulation.
- `prefers-reduced-motion: reduce` disables transforms, smooth scrolling, boot animation, parallax, cursor effects, and autoplay previews.

## UI/UX concepts applied

1. **Visual hierarchy** — display type, numbered section labels, and controlled contrast establish reading order.
2. **Consistency** — the same panel, label, action, and status patterns repeat across every room.
3. **Progressive disclosure** — project detail, gallery metadata, and video controls appear when they become relevant.
4. **Feedback and visibility** — XP progress, active navigation, hover/focus states, and slider values expose system state.
5. **Recognition over recall** — each room uses a distinct icon, color cue, and plain-language label.
6. **Accessibility** — semantic landmarks, skip navigation, keyboard-operable controls, focus management, alt text, and reduced motion are built in.
7. **Responsive adaptation** — the desktop console becomes a linear touch-first story instead of a scaled-down dashboard.

## Content integrity

Project facts come from `src/data/projects.ts`. Photography, game, and video entries in `src/data/studio.ts` are explicitly marked placeholders until verified personal media and titles are supplied.
