import React, { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, Camera, Download, Film, Gamepad2, Github,
  Layers3, Linkedin, Menu, Moon, Palette, Power, Sun, X,
} from 'lucide-react';
import { projects, type Project } from './data/projects';
import { profile } from './data/profile';
import { playerStats } from './data/studio';
import { ProjectVisual } from './components/ProjectVisual';
import '@fontsource-variable/manrope';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import './styles.css';
import './control-room.css';

type Navigate = (href: string) => void;

const rooms = [
  { id: 'play', label: 'Play', note: 'Systems, feedback, flow', icon: Gamepad2, code: '01' },
  { id: 'capture', label: 'Capture', note: 'Framing, light, focus', icon: Camera, code: '02' },
  { id: 'create', label: 'Create', note: 'Pacing, story, motion', icon: Film, code: '03' },
  { id: 'quests', label: 'Quests', note: 'Research to shipped UI', icon: Layers3, code: '04' },
];

function useStudioEffects() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      root.style.setProperty('--xp', `${max > 0 ? (scrollY / max) * 100 : 0}%`);
    };
    updateProgress();
    addEventListener('scroll', updateProgress, { passive: true });

    const cursor = document.querySelector<HTMLElement>('.cr-cursor');
    const moveCursor = (event: PointerEvent) => {
      if (cursor) cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    };
    const finePointer = matchMedia('(pointer:fine)').matches;
    if (!reduced && finePointer) addEventListener('pointermove', moveCursor, { passive: true });

    const magnetic = [...document.querySelectorAll<HTMLElement>('[data-magnetic]')];
    const cleanups = magnetic.map((element) => {
      const move = (event: PointerEvent) => {
        const box = element.getBoundingClientRect();
        element.style.setProperty('--mx', `${(event.clientX - box.left - box.width / 2) * .12}px`);
        element.style.setProperty('--my', `${(event.clientY - box.top - box.height / 2) * .12}px`);
      };
      const reset = () => { element.style.removeProperty('--mx'); element.style.removeProperty('--my'); };
      if (!reduced && finePointer) {
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerleave', reset);
      }
      return () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); };
    });

    let disposed = false;
    let destroySmoothScroll = () => {};
    if (!reduced) {
      Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(([lenisModule, gsapModule, triggerModule]) => {
        if (disposed) return;
        const Lenis = lenisModule.default;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        destroySmoothScroll = () => { gsap.ticker.remove(tick); lenis.destroy(); };
      });
    }

    return () => {
      disposed = true;
      removeEventListener('scroll', updateProgress);
      removeEventListener('pointermove', moveCursor);
      cleanups.forEach((cleanup) => cleanup());
      destroySmoothScroll();
    };
  });
}

function BootScreen() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (sessionStorage.getItem('control-room-booted')) return;
    sessionStorage.setItem('control-room-booted', 'true');
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), reduced ? 100 : 1500);
    return () => clearTimeout(timer);
  }, [reduced]);
  return <AnimatePresence>{visible && <motion.div className="cr-boot" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .24 }}>
    <div className="cr-boot-flash" />
    <div className="cr-boot-console">
      <span className="cr-kicker">SYSTEM / KCR-26</span>
      <Power aria-hidden="true" />
      <strong>KUNAL'S<br />CONTROL ROOM</strong>
      <div className="cr-boot-line"><i /><span>LOADING EXPERIENCE</span></div>
      <button type="button" onClick={() => setVisible(false)}>Skip intro</button>
    </div>
  </motion.div>}</AnimatePresence>;
}

function ResumeLink({ className = '' }: { className?: string }) {
  return profile.resume
    ? <a className={className} href={profile.resume} download>Resume <Download size={15} /></a>
    : <a className={className} href="/#resume-status" aria-label="Resume — file not yet supplied">Resume <Download size={15} /></a>;
}

function Header({ navigate }: { navigate: Navigate }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    const next = saved === 'light' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('portfolio-theme', next);
    document.documentElement.dataset.theme = next;
  };
  const home = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    navigate('/');
  };
  return <header className="cr-header">
    <a className="cr-brand" href="/" onClick={home} aria-label="Kunal Khaire, control room home"><span>KK</span><b>CONTROL ROOM</b></a>
    <nav id="control-nav" className={open ? 'is-open' : ''} aria-label="Primary navigation">
      {rooms.map((room) => <a key={room.id} href={`/#${room.id}`} onClick={() => setOpen(false)}>{room.label}</a>)}
      <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>
    </nav>
    <div className="cr-header-actions">
      <span className="cr-system-state"><i /> AVAILABLE</span>
      <ResumeLink className="cr-resume" />
      <button className="cr-icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
      <button className="cr-icon-button cr-menu" type="button" aria-expanded={open} aria-controls="control-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function SplitLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <span className="cr-split-line" aria-label={text}>{[...text].map((character, index) => <motion.span aria-hidden="true" key={`${character}-${index}`} initial={reduced ? false : { y: '115%', rotate: 4 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: .62, delay: delay + index * .018, ease: [.22, 1, .36, 1] }}>{character === ' ' ? '\u00a0' : character}</motion.span>)}</span>;
}

function Hero() {
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const parallax = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (reduced || !panel.current) return;
    const box = panel.current.getBoundingClientRect();
    panel.current.style.setProperty('--px', `${((event.clientX - box.left) / box.width - .5) * 16}px`);
    panel.current.style.setProperty('--py', `${((event.clientY - box.top) / box.height - .5) * 16}px`);
  };
  return <section className="cr-hero" id="home" onMouseMove={parallax} ref={panel}>
    <div className="cr-hero-grid" aria-hidden="true" />
    <div className="cr-hero-copy">
      <p className="cr-kicker">UI/UX DESIGNER · FRONTEND DEVELOPER · PLAYER ONE</p>
      <h1><SplitLine text="I design" /><SplitLine text="experiences," delay={.08} /><span className="cr-hero-accent"><SplitLine text="not just screens." delay={.16} /></span></h1>
      <p className="cr-hero-lede">Gaming taught me feedback. Photography taught me focus. Video taught me pacing. I bring all three into clear, useful digital products.</p>
      <div className="cr-hero-actions">
        <a className="cr-button is-primary" data-magnetic href="#quests">Enter the quests <ArrowDown size={17} /></a>
        <a className="cr-button is-quiet" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowRight size={17} /></a>
      </div>
    </div>
    <div className="cr-mode-grid" aria-label="Explore the four rooms">
      {rooms.map(({ id, label, note, icon: Icon, code }, index) => <motion.a key={id} href={`#${id}`} className={`cr-mode-card is-${id}`} initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28 + index * .07 }}>
        <span>{code}</span><Icon aria-hidden="true" /><div><strong>{label}</strong><small>{note}</small></div><ArrowRight aria-hidden="true" />
      </motion.a>)}
    </div>
    <div className="cr-hero-telemetry" aria-hidden="true"><span>X 19.0760°</span><span>Y 72.8777°</span><span>SESSION ACTIVE</span></div>
  </section>;
}

function PlayerProfile() {
  return <section className="cr-section cr-profile" id="profile" aria-labelledby="profile-title">
    <div className="cr-section-heading"><span className="cr-index">00</span><div><p className="cr-kicker">PLAYER PROFILE</p><h2 id="profile-title">The person behind<br />the interface.</h2></div><p>A product-minded designer and developer who notices the same things in a flow, a frame, and a game: what gets attention, what creates confidence, and what makes people continue.</p></div>
    <div className="cr-profile-grid">
      <article className="cr-id-card">
        <div className="cr-portrait" role="img" aria-label="Portrait placeholder for Kunal Khaire"><span>ADD<br />PORTRAIT</span><i /></div>
        <div><p className="cr-kicker">PLAYER 01</p><h3>Kunal Khaire</h3><p>UI/UX Designer + Developer</p><span className="cr-status-pill"><i /> Open to opportunities</span></div>
      </article>
      <div className="cr-stat-panel">
        <div className="cr-panel-head"><span>PORTFOLIO EMPHASIS</span><span>NOT A PROFICIENCY SCORE</span></div>
        {playerStats.map((stat) => <div className="cr-stat" key={stat.label}><div><span>{stat.label}</span><b>{stat.value}</b></div><div className="cr-stat-track"><i style={{ width: `${stat.value}%` }} /></div></div>)}
      </div>
      <div className="cr-achievements">
        <div className="cr-panel-head"><span>ACHIEVEMENTS</span><span>05 PROJECTS</span></div>
        <div className="cr-achievement-grid"><span><Palette />Design + code</span><span><Gamepad2 />Feedback thinker</span><span><Camera />Visual observer</span><span><Film />Story builder</span></div>
      </div>
    </div>
  </section>;
}

function Home() {
  return <><Hero /><PlayerProfile /><section className="cr-section cr-next-up" id="quests"><p className="cr-kicker">NEXT ROOM</p><h2>Quests are loading.</h2><p>The existing projects remain available while their research-to-test presentation is upgraded.</p></section></>;
}

function CaseStudyPreview({ project, navigate }: { project: Project; navigate: Navigate }) {
  return <article className="cr-case-preview">
    <button className="cr-text-button" onClick={() => navigate('/')}><ArrowLeft size={17} /> Back to control room</button>
    <span className="cr-kicker">QUEST / {project.category}</span><h1>{project.title}</h1><p>{project.description}</p>
    <ProjectVisual slug={project.slug} />
    <div className="cr-case-preview-copy"><div><span>ROLE</span><strong>{project.role}</strong></div><div><span>GOAL</span><strong>{project.goals}</strong></div></div>
  </article>;
}

function NotFound({ navigate }: { navigate: Navigate }) {
  return <section className="cr-not-found"><span className="cr-kicker">ERROR / 404</span><h1>Signal lost.</h1><p>This coordinate is outside the control room.</p><button className="cr-button is-primary" onClick={() => navigate('/')}>Return home</button></section>;
}

export function App({ initialPath = '' }: { initialPath?: string }) {
  const [path, setPath] = useState(() => initialPath || (typeof window === 'undefined' ? '/' : window.location.pathname));
  useStudioEffects();
  useEffect(() => {
    const pop = () => setPath(location.pathname);
    addEventListener('popstate', pop);
    return () => removeEventListener('popstate', pop);
  }, []);
  const navigate: Navigate = (href) => {
    if (typeof window === 'undefined') return;
    history.pushState({}, '', href);
    setPath(href);
    scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const slug = path.match(/^\/work\/([^/]+)\/?$/)?.[1];
  const project = slug ? projects.find((item) => item.slug === slug) : undefined;
  const isUnknown = path !== '/' && !project;
  return <div className="cr-app">
    <a className="skip-link" href="#main">Skip to content</a><BootScreen /><div className="cr-xp" aria-hidden="true"><i /></div><div className="cr-cursor" aria-hidden="true" />
    <Header navigate={navigate} />
    <AnimatePresence mode="wait"><motion.main id="main" key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>{isUnknown ? <NotFound navigate={navigate} /> : project ? <CaseStudyPreview project={project} navigate={navigate} /> : <Home />}</motion.main></AnimatePresence>
    <footer className="cr-footer"><span>KK / CONTROL ROOM</span><p>Designed and built by Kunal Khaire.</p><a href="#home">Back to top ↑</a></footer>
  </div>;
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root')!;
  if (root.hasChildNodes()) hydrateRoot(root, <App />);
  else createRoot(root).render(<App />);
}
