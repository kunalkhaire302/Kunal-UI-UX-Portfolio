# Kunal Khaire — Portfolio

A responsive React, TypeScript, Vite, and Tailwind CSS portfolio with three project case studies, light/dark themes, mobile navigation, and static HTML output for search engines. Manrope is served locally under its included open font license.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the `dist` directory to a static host. Each case study has its own generated HTML entry point under `work/`. Configure the host to serve directory index files and use `/index.html` as the SPA fallback for unknown URLs if a custom client-side 404 is desired. Update the origin in `scripts/prerender.mjs` when deploying to a different domain.

## Content

- `src/data/profile.ts`: professional links, experience, education, skills, and process.
- `src/data/projects.ts`: documented project facts and explicitly labeled proposed interface directions.
- `src/components/ProjectVisual.tsx`: illustrative interface concepts, not original application screenshots.

The supplied brief is the factual source. It did not include the original resume PDF, UI/UX report, email address, project screenshots, project repositories, or measured outcomes. Professional GitHub and LinkedIn links were provided separately.

### Complete the missing information

1. Add the original resume PDF to `public/resume.pdf`, then set `profile.resume` to `/resume.pdf`. Existing resume links become download links automatically.
2. Set `profile.email` to the verified email address to enable the email link.
3. Review project role boundaries, original screenshots, and project-specific learnings before replacing the clearly marked conceptual content.

No contact form or backend is required: LinkedIn and GitHub links are live. Resume links currently navigate to an explicit availability notice. No resume has been generated.

## Accessibility and performance

Semantic landmarks, a skip link, visible focus rings, keyboard-operated mobile navigation and accordions, Escape-to-close navigation, reduced-motion support, responsive layouts, and persistent themes are included. Interface concepts have descriptive accessible labels; their decorative detail is hidden from assistive technology. No analytics or tracking libraries are installed.

Audit results are summarized in `QUALITY.md`.

# Kunal-UI-UX-Portfolio
