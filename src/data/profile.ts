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

export type UXConcept = {
 id: string;
 name: string;
 category: string;
 description: string;
 appliedAt: string;
 principle: string;
};

export const uxConceptCategories = [
 'Visual Design',
 'Interaction Design',
 'Accessibility',
 'Responsive Design',
] as const;

export const uxConcepts: UXConcept[] = [
 { id: 'visual-hierarchy', name: 'Visual Hierarchy', category: 'Visual Design', description: 'Size, weight, and color guide people from the headline to supporting text and actions.', appliedAt: 'Hero headline, section headings, project titles, and primary buttons.', principle: 'Important content should be noticed first.' },
 { id: 'color-contrast', name: 'Color & Contrast', category: 'Visual Design', description: 'A limited color palette keeps the interface clear and text easy to read.', appliedAt: 'Cobalt buttons and links stand out against neutral light and dark backgrounds.', principle: 'Strong contrast improves readability and focus.' },
 { id: 'whitespace', name: 'Whitespace', category: 'Visual Design', description: 'Comfortable spacing separates content and makes each section easier to scan.', appliedAt: 'Spacing around sections, cards, headings, and text blocks.', principle: 'Space helps people understand which elements belong together.' },
 { id: 'cta-design', name: 'Clear Actions', category: 'Interaction Design', description: 'Primary and secondary buttons clearly show what people can do next.', appliedAt: 'Explore my work, Resume, View study, and Connect on LinkedIn buttons.', principle: 'Actions should be visible and easy to understand.' },
 { id: 'consistency', name: 'Consistency', category: 'Interaction Design', description: 'Cards, buttons, tags, and headings use the same patterns throughout the portfolio.', appliedAt: 'Repeated project cards, section labels, buttons, and skill tags.', principle: 'Consistent patterns make an interface easier to learn.' },
 { id: 'progressive-disclosure', name: 'Progressive Disclosure', category: 'Interaction Design', description: 'Detailed information appears only when it is useful.', appliedAt: 'Expandable process steps and project cards that open full case studies.', principle: 'Show the essentials first, then reveal more detail.' },
 { id: 'accessibility', name: 'Accessibility', category: 'Accessibility', description: 'The portfolio supports keyboard use, clear focus states, reduced motion, and meaningful labels.', appliedAt: 'Skip link, focus indicators, semantic sections, ARIA labels, and reduced-motion styles.', principle: 'The interface should work for as many people as possible.' },
 { id: 'responsive-design', name: 'Responsive Design', category: 'Responsive Design', description: 'Layouts, text, and navigation adapt to different screen sizes.', appliedAt: 'Flexible grids, mobile navigation, fluid type, and stacked content on small screens.', principle: 'The experience should remain clear on desktop, tablet, and mobile.' },
];

