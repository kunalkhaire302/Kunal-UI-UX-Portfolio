export const profile = {
 name: 'Kunal Khaire', github: 'https://github.com/kunalkhaire302', linkedin: 'https://www.linkedin.com/in/kunal-khaire/', website: 'https://www.kunaluniverse.tech/',
 email: '', resume: '',
};

export const skillGroups = [
 { title: 'Interface & frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Figma'] },
 { title: 'Backend & data', items: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL', 'PostgreSQL'] },
 { title: 'Programming', items: ['Java', 'Python', 'C++', 'SQL', 'Data Structures & Algorithms'] },
 { title: 'Tools & delivery', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render', 'MongoDB Atlas'] },
];
export const designInterests = ['UX research', 'User flows', 'Information architecture', 'Wireframing', 'Prototyping', 'Interaction design', 'Visual design', 'Responsive design', 'Design systems', 'Accessibility', 'Usability testing'];
export const process = [
 ['Research', 'Understand people, requirements, and the problem before choosing a solution.'],
 ['Define', 'Turn the context into a clear problem, priorities, and practical goals.'],
 ['Ideate', 'Explore different flows and compare possible solutions.'],
 ['Design', 'Shape the information, wireframes, and visual interface.'],
 ['Prototype', 'Connect the key interactions to make the experience tangible.'],
 ['Test', 'Evaluate clarity, usability, keyboard access, and responsive behavior.'],
 ['Iterate', 'Refine the experience as evidence and feedback become available.'],
];

/* ── UI/UX Concepts applied in this portfolio ── */
export type UXConcept = {
 id: string;
 name: string;
 category: string;
 description: string;
 appliedAt: string;
 principle: string;
};

export const uxConceptCategories = [
 'Cognitive Psychology',
 'Visual Design',
 'Interaction Design',
 'Information Architecture',
 'Accessibility & Inclusivity',
 'Responsive & Adaptive',
] as const;

export const uxConcepts: UXConcept[] = [
 // ── Cognitive Psychology ──
 { id: 'visual-hierarchy', name: 'Visual Hierarchy', category: 'Cognitive Psychology', description: 'Elements are sized, weighted, and positioned to guide the eye through a deliberate reading order — headline → subtext → CTA.', appliedAt: 'Hero section: 92px headline → 15px body → accent-colored button draws the eye in the correct order.', principle: 'Users process larger, bolder, higher-contrast elements first (Faraday, 2000).' },
 { id: 'f-pattern', name: 'F-Pattern Layout', category: 'Cognitive Psychology', description: 'Content-heavy sections follow the F-shaped scanning pattern: strong top bar, then left-aligned headings that pull the eye downward.', appliedAt: 'Work section & Case studies: eyebrow label at top, heading left, description right — matching natural left-to-right, top-to-bottom scanning.', principle: 'Eye-tracking studies (Nielsen, 2006) show users scan in an F-pattern on text-heavy pages.' },
 { id: 'z-pattern', name: 'Z-Pattern Layout', category: 'Cognitive Psychology', description: 'Sparse-content sections follow a Z-shaped scan path: logo top-left → nav top-right → content bottom-left → CTA bottom-right.', appliedAt: 'Header (logo → nav → theme toggle) and About section (heading left → body copy right).', principle: 'The Z-pattern applies to pages with minimal text and strong visual focal points (Lidwell et al., 2010).' },
 { id: 'fitts-law', name: 'Fitts\'s Law', category: 'Cognitive Psychology', description: 'Interactive targets are large enough and positioned for easy reach. Buttons have generous padding, and nav links have comfortable hit areas.', appliedAt: 'All buttons have 50px+ min-height. Mobile nav links have 44×44px minimum touch targets. The theme toggle is 44px round.', principle: 'The time to reach a target is a function of its distance and size (Fitts, 1954).' },
 { id: 'hicks-law', name: 'Hick\'s Law', category: 'Cognitive Psychology', description: 'Limiting choices per section reduces decision time. Navigation has 6 clear links, and skills are chunked into 4 groups.', appliedAt: 'Main navigation: exactly 6 items. Skills section: 4 groups instead of a flat list of 24+ items.', principle: 'Decision time increases logarithmically with the number of choices (Hick, 1952).' },
 { id: 'millers-law', name: 'Miller\'s Law (Chunking)', category: 'Cognitive Psychology', description: 'Information is grouped into manageable chunks of 5±2 items for easier cognitive processing.', appliedAt: 'Skills grouped into 4 categories of 5–7 items each. Process steps: 7 stages. Design interests: grouped as tags.', principle: 'Working memory can hold 7±2 items at once; chunking aids retention (Miller, 1956).' },
 { id: 'recognition-recall', name: 'Recognition over Recall', category: 'Cognitive Psychology', description: 'Users recognize options rather than recalling them from memory. Visible navigation, labeled icons, and clear section headings minimize memory load.', appliedAt: 'Persistent sticky header with visible nav links. Process steps show titles (not just numbers). Case study sidebar navigation.', principle: 'Recognition memory is vastly superior to recall (Nielsen\'s Usability Heuristic #6).' },

 // ── Visual Design ──
 { id: 'gestalt-proximity', name: 'Gestalt: Proximity', category: 'Visual Design', description: 'Related elements are positioned close together, forming perceived groups without explicit borders.', appliedAt: 'Work cards: visual + title + tags grouped tightly. Skill groups: items clustered within cards. Case study facts row.', principle: 'Objects near each other are perceived as belonging together (Wertheimer, 1923).' },
 { id: 'gestalt-similarity', name: 'Gestalt: Similarity', category: 'Visual Design', description: 'Similar-looking elements are perceived as related. Consistent tag styling, card structure, and section headings create visual unity.', appliedAt: 'All tags share identical styling. All work cards share the same layout. All eyebrow labels share size + tracking.', principle: 'Elements sharing visual traits (color, shape, size) are grouped mentally (Wertheimer, 1923).' },
 { id: 'gestalt-continuity', name: 'Gestalt: Continuity', category: 'Visual Design', description: 'The eye follows smooth lines and paths. Vertical scroll flow, aligned edges, and consistent grid columns guide the reading direction.', appliedAt: 'Left-aligned heading hierarchy. Consistent container width. Grid columns maintain vertical alignment across sections.', principle: 'The eye follows the smoothest path and perceives continuous forms (Wertheimer, 1923).' },
 { id: 'color-theory', name: 'Color Theory & Contrast', category: 'Visual Design', description: 'A curated palette of cobalt accent (#254bdf) on neutral warm backgrounds ensures readability and emotional tone. Dark mode inverts safely.', appliedAt: 'Accent blue used sparingly for CTAs, links, and emphasis. Text-to-background contrast exceeds WCAG AA (4.5:1). Dark mode preserves ratios.', principle: 'Effective color contrast ensures legibility and guides attention (WCAG 2.1 SC 1.4.3).' },
 { id: 'typography-scale', name: 'Typography Scale', category: 'Visual Design', description: 'A modular type scale creates clear hierarchy: 92px → 56px → 42px → 26px → 15px → 12px. Each size serves a distinct role.', appliedAt: 'Hero h1 (92px), Section h2 (42–56px), Card h3 (26px), Body (15px), Labels (12px), Eyebrows (10–11px).', principle: 'A consistent type scale (1.250–1.414 ratio) maintains harmony and hierarchy (Bringhurst, 2004).' },
 { id: 'whitespace', name: 'Whitespace (Negative Space)', category: 'Visual Design', description: 'Generous spacing between sections, within cards, and around text blocks gives content room to breathe and improves scannability.', appliedAt: 'Section padding: 95px. Card internal spacing: 22px gaps. Hero: 52px top padding. About section: 100px padding.', principle: 'White space increases comprehension by ~20% (Chaparro et al., 2004).' },
 { id: 'grid-system', name: 'Grid System (12-Column)', category: 'Visual Design', description: 'A consistent 1240px max-width container with a CSS Grid system ensures visual alignment and predictable layouts.', appliedAt: 'Container: 1240px max-width. Work grid: 2-column. About: 2-column. Skills: 4-column. Case layout: sidebar + content.', principle: 'Grid systems create visual consistency and proportional harmony (Müller-Brockmann, 1961).' },

 // ── Interaction Design ──
 { id: 'affordance', name: 'Affordance & Signifiers', category: 'Interaction Design', description: 'Interactive elements visually communicate their clickability through styling cues: buttons have fills/borders, links have underlines or arrows.', appliedAt: 'Primary buttons: filled blue with arrow icons. Links: arrow-up-right signifier. Hover states: translateY lift. Process steps: ± icon signals expand/collapse.', principle: 'An affordance is a property that indicates how to interact with it (Norman, 1988).' },
 { id: 'feedback', name: 'Feedback & Microinteractions', category: 'Interaction Design', description: 'Every interaction produces visible feedback: hover lifts, color shifts, nav underlines, scroll progress bar, and reveal animations.', appliedAt: 'Button hover: translateY(-2px) lift. Nav links: animated underline on hover. Scroll progress bar at top. Cards: scale + lift on hover.', principle: 'System status should always be visible (Nielsen\'s Heuristic #1: Visibility of System Status).' },
 { id: 'progressive-disclosure', name: 'Progressive Disclosure', category: 'Interaction Design', description: 'Complex information is revealed only when needed. Process steps use accordions; case studies use sectioned navigation.', appliedAt: 'Process section: accordion pattern (only one expanded at a time). Case study: 14 sections navigable via sidebar. Work cards → full case study drill-down.', principle: 'Show only the information needed at each step (Tidwell, 2010).' },
 { id: 'consistency', name: 'Consistency & Standards', category: 'Interaction Design', description: 'Visual patterns, component styling, and interaction behaviors remain consistent throughout — cards look the same, buttons behave the same.', appliedAt: 'All sections follow: eyebrow → heading → content pattern. Buttons share border-radius, padding, and font-weight. Tags are styled identically everywhere.', principle: 'Consistency reduces learning cost (Nielsen\'s Heuristic #4: Consistency and Standards).' },
 { id: 'mental-model', name: 'Mental Models', category: 'Interaction Design', description: 'The portfolio structure mirrors how users expect a professional portfolio to work: home → work samples → about → skills → contact.', appliedAt: 'Navigation order follows the standard portfolio mental model. Case studies follow a research → design → build → outcome narrative.', principle: 'Interfaces should match users\' expectations based on prior experience (Norman, 2013).' },
 { id: 'error-prevention', name: 'Error Prevention & Recovery', category: 'Interaction Design', description: 'The 404 page provides a friendly message and a clear path back. External links open in new tabs to prevent navigation loss.', appliedAt: '404 page: friendly copy + "Back to home" CTA. External links (GitHub, LinkedIn): target="_blank" with rel="noreferrer". Resume: graceful fallback when unavailable.', principle: 'Prevent errors before they occur; when they do, provide easy recovery (Nielsen\'s Heuristic #5 & #9).' },

 // ── Information Architecture ──
 { id: 'info-architecture', name: 'Information Architecture', category: 'Information Architecture', description: 'Content is organized into a clear hierarchy: Home → Work (with individual case studies) → About → Skills → Process → Contact.', appliedAt: 'Single-page structure with logical section ordering. Case studies as separate routes (/work/slug). Numbered sections (01–05).', principle: 'IA organizes content so users find what they need efficiently (Rosenfeld & Morville, 2002).' },
 { id: 'cta-design', name: 'Call-to-Action Design', category: 'Information Architecture', description: 'Primary CTAs stand out with filled backgrounds, high contrast, and directional arrow icons. Secondary actions use outlined styling.', appliedAt: 'Hero: "Explore my work" (primary, filled blue) vs "Resume" (secondary, bordered). Contact: "Connect on LinkedIn" (white on blue, maximum contrast).', principle: 'CTAs should be visually dominant and clearly communicate the expected action (Weinschenk, 2011).' },
 { id: 'above-fold', name: 'Above the Fold', category: 'Information Architecture', description: 'The most critical content appears before any scrolling: name, role, value proposition, and primary CTA are all visible on load.', appliedAt: 'Hero section: name, title, tagline, "Explore my work" CTA, and the interactive studio all appear without scrolling.', principle: 'Content above the fold receives 80% more viewing time (Nielsen Norman Group, 2010).' },

 // ── Accessibility & Inclusivity ──
 { id: 'accessibility', name: 'Accessibility (WCAG 2.1)', category: 'Accessibility & Inclusivity', description: 'Semantic HTML, ARIA labels, keyboard navigation, skip links, focus indicators, and reduced-motion support ensure broad usability.', appliedAt: 'Skip-to-content link. Keyboard-accessible accordion (Escape closes menu). aria-label on icons. aria-expanded on toggle. prefers-reduced-motion media query.', principle: 'Web content should be perceivable, operable, understandable, and robust (WCAG 2.1 POUR principles).' },
 { id: 'dark-mode', name: 'User Preference (Dark/Light)', category: 'Accessibility & Inclusivity', description: 'Respects prefers-color-scheme, provides a manual toggle, and persists choice in localStorage — giving users control over their experience.', appliedAt: 'Theme toggle in header. Auto-detects system preference. Persists to localStorage. CSS custom properties swap entire palette seamlessly.', principle: 'Users should feel in control of the interface (Nielsen\'s Heuristic #3: User Control and Freedom).' },
 { id: 'semantic-html', name: 'Semantic HTML', category: 'Accessibility & Inclusivity', description: 'Proper use of <header>, <main>, <nav>, <section>, <article>, <footer>, headings hierarchy (single h1), and landmark roles.', appliedAt: 'Single <h1> per page. <nav> with aria-label. <article> for work cards. <section> for content blocks. <footer> for site footer.', principle: 'Semantic structure enables assistive technologies and improves SEO (W3C HTML5 Specification).' },

 // ── Responsive & Adaptive ──
 { id: 'responsive-design', name: 'Responsive Design', category: 'Responsive & Adaptive', description: 'Fluid layouts using CSS Grid, clamp(), and 5 breakpoints (1500px, 1150px, 950px, 700px, 390px) adapt to all screen sizes.', appliedAt: 'Hero typography: clamp(59px, 11.7vw, 92px). Grid columns collapse: 4→2→1. Navigation: horizontal → hamburger menu. Studio: tall → wide layout.', principle: 'Content should adapt to the user\'s viewport rather than forcing the user to adapt (Marcotte, 2010).' },
 { id: 'mobile-first', name: 'Mobile-First Thinking', category: 'Responsive & Adaptive', description: 'Touch targets meet 44×44px minimum, hamburger menu appears on smaller screens, and content reflows vertically for thumb-friendly interaction.', appliedAt: 'All interactive elements: min 44px touch targets. Hamburger menu below 950px. Process accordion: large tap areas. Contact links: flex-wrap for small screens.', principle: 'Design for the smallest screen first, then enhance for larger ones (Wroblewski, 2011).' },
 { id: 'scroll-reveal', name: 'Scroll-Based Reveal (Motion Design)', category: 'Responsive & Adaptive', description: 'IntersectionObserver triggers fade-in + slide-up animations as sections enter the viewport, creating a sense of progressive narrative.', appliedAt: 'All section headings, work cards, skill groups, and process steps animate in via .reveal → .in-view class toggle.', principle: 'Motion should support content comprehension and feel purposeful, not decorative (Material Design Motion Principles).' },
];
