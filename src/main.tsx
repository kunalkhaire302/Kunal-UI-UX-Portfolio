import React, { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, Camera, ChevronLeft, ChevronRight, Download, Film, Gamepad2, Github,
  Layers3, Linkedin, Menu, MonitorPlay, Moon, Palette, PenTool, Play, Power, Search,
  Sparkles, Sun, TestTube2, X,
} from 'lucide-react';
import { projects, type Project } from './data/projects';
import { profile } from './data/profile';
import { games, photos, playerStats, videos } from './data/studio';
import { ProjectVisual } from './components/ProjectVisual';
import { MotionToggle, WaveBackground } from './components/background/WaveBackground';
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
  }, []);
}

function BootScreen() {
  const [visible, setVisible] = useState(false);
  const skipButton = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (sessionStorage.getItem('control-room-booted')) return;
    sessionStorage.setItem('control-room-booted', 'true');
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), reduced ? 100 : 1500);
    return () => clearTimeout(timer);
  }, [reduced]);
  useEffect(() => {
    if (!visible) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    skipButton.current?.focus();
    const containFocus = (event: KeyboardEvent) => {
      if (event.key === 'Tab') { event.preventDefault(); skipButton.current?.focus(); }
      if (event.key === 'Escape') setVisible(false);
    };
    addEventListener('keydown', containFocus);
    return () => { document.body.style.overflow = overflow; removeEventListener('keydown', containFocus); previous?.focus(); };
  }, [visible]);
  return <AnimatePresence>{visible && <motion.div className="cr-boot" role="dialog" aria-modal="true" aria-label="Loading Kunal's Control Room" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .24 }}>
    <div className="cr-boot-flash" />
    <div className="cr-boot-console">
      <span className="cr-kicker">SYSTEM / KCR-26</span>
      <Power aria-hidden="true" />
      <strong>KUNAL'S<br />CONTROL ROOM</strong>
      <div className="cr-boot-line"><i /><span>LOADING EXPERIENCE</span></div>
      <button ref={skipButton} type="button" onClick={() => setVisible(false)}>Skip intro</button>
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
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    const next = saved === 'light' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);
  useEffect(() => {
    if (!open) return;
    navigation.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    addEventListener('keydown', close);
    return () => removeEventListener('keydown', close);
  }, [open]);
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
    <nav ref={navigation} id="control-nav" className={open ? 'is-open' : ''} aria-label="Primary navigation">
      {rooms.map((room) => <a key={room.id} href={`/#${room.id}`} onClick={() => setOpen(false)}>{room.label}</a>)}
      <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>
    </nav>
    <div className="cr-header-actions">
      <span className="cr-system-state"><i /> AVAILABLE</span>
      <ResumeLink className="cr-resume" />
      <button className="cr-icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
      <button ref={menuButton} className="cr-icon-button cr-menu" type="button" aria-expanded={open} aria-controls="control-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
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
  return <section className="cr-hero" id="hero" onMouseMove={parallax} ref={panel}>
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
        <div className="cr-portrait"><img src="/kunal-khaire-portrait.png" alt="Kunal Khaire wearing a navy suit" /><i /></div>
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

const featuredSlugs = ['redesign-craigslist-mumbai', 'techfest-landingpage', 'nswf-portal'];

function ProjectAnchor({ project, navigate, className = '', children }: { project: Project; navigate: Navigate; className?: string; children: React.ReactNode }) {
  const open = (event: ReactMouseEvent<HTMLAnchorElement>) => { event.preventDefault(); navigate(`/work/${project.slug}`); };
  return <a className={className} href={`/work/${project.slug}`} onClick={open}>{children}</a>;
}

function Quests({ navigate }: { navigate: Navigate }) {
  const featured = featuredSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter((project): project is Project => Boolean(project));
  const more = projects.filter((project) => !featuredSlugs.includes(project.slug));
  return <section className="cr-section cr-quests" id="quests" aria-labelledby="quests-title">
    <div className="cr-section-heading"><span className="cr-index">01</span><div><p className="cr-kicker">QUESTS / CASE STUDIES</p><h2 id="quests-title">Problems worth<br />solving well.</h2></div><p>Three UI/UX-focused stories show how constraints become clearer structures, interactions, and responsive systems. Existing project facts are preserved.</p></div>
    <div className="cr-quest-grid">
      {featured.map((project, index) => <article className="cr-quest-card" key={project.slug}>
        <ProjectAnchor project={project} navigate={navigate} className="cr-quest-visual"><ProjectVisual slug={project.slug} /></ProjectAnchor>
        <div className="cr-quest-copy"><span className="cr-kicker">QUEST {String(index + 1).padStart(2, '0')} / {project.category}</span><h3><ProjectAnchor project={project} navigate={navigate}>{project.title}</ProjectAnchor></h3><p>{project.description}</p><div className="cr-quest-meta"><span>{project.role}</span><span>{project.uiuxConcepts.length} concepts</span></div><ProjectAnchor project={project} navigate={navigate} className="cr-quest-link">Open case study <ArrowRight size={17} /></ProjectAnchor></div>
      </article>)}
    </div>
    <div className="cr-side-quests"><div><p className="cr-kicker">SIDE QUESTS</p><h3>More product explorations.</h3></div>{more.map((project) => <ProjectAnchor project={project} navigate={navigate} key={project.slug}><span>{project.category}</span><strong>{project.title}</strong><ArrowRight /></ProjectAnchor>)}</div>
  </section>;
}

function Capture() {
  const [active, setActive] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const lightboxOpen = active !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((current) => current === null ? null : (current + 1) % photos.length);
      if (event.key === 'ArrowLeft') setActive((current) => current === null ? null : (current - 1 + photos.length) % photos.length);
      if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll<HTMLElement>('.cr-lightbox button')];
        if (!controls.length) return;
        const current = controls.indexOf(document.activeElement as HTMLElement);
        const next = event.shiftKey ? (current - 1 + controls.length) % controls.length : (current + 1) % controls.length;
        event.preventDefault(); controls[next].focus();
      }
    };
    document.body.style.overflow = 'hidden';
    addEventListener('keydown', keydown);
    requestAnimationFrame(() => closeButton.current?.focus());
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', keydown); returnFocus.current?.focus(); returnFocus.current = null; };
  }, [lightboxOpen]);
  const selected = active === null ? null : photos[active];
  return <section className="cr-section cr-capture" id="capture" aria-labelledby="capture-title">
    <div className="cr-section-heading"><span className="cr-index">02</span><div><p className="cr-kicker">CAPTURE / PHOTOGRAPHY</p><h2 id="capture-title">Train the eye<br />to find focus.</h2></div><p>Photography turns hierarchy into instinct: choose the subject, remove distraction, and let light direct attention. These frames explore scale, atmosphere, movement, and focus.</p></div>
    <div className="cr-gallery">{photos.map((photo, index) => <button key={photo.src} type="button" onClick={() => setActive(index)} aria-label={`Open ${photo.title} in lightbox`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span><b>{photo.title}</b></span></button>)}</div>
    <p className="cr-placeholder-note">PHOTO METADATA / Camera and exposure details remain unspecified until verified.</p>
    <AnimatePresence>{selected && <motion.div className="cr-lightbox" role="dialog" aria-modal="true" aria-label={`${selected.title} image viewer`} onMouseDown={(event) => event.currentTarget === event.target && setActive(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button ref={closeButton} className="cr-lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Close image viewer"><X /></button>
      <button className="cr-lightbox-nav is-left" type="button" onClick={() => setActive((active! - 1 + photos.length) % photos.length)} aria-label="Previous photograph"><ChevronLeft /></button>
      <figure><img src={selected.src} alt={selected.alt} /><figcaption><div><span className="cr-kicker">CAPTURE {String(active! + 1).padStart(2, '0')}</span><h3>{selected.title}</h3></div><dl><div><dt>CAMERA</dt><dd>{selected.camera}</dd></div><div><dt>SETTINGS</dt><dd>{selected.settings}</dd></div></dl></figcaption></figure>
      <button className="cr-lightbox-nav is-right" type="button" onClick={() => setActive((active! + 1) % photos.length)} aria-label="Next photograph"><ChevronRight /></button>
    </motion.div>}</AnimatePresence>
  </section>;
}

function VideoClip({ video, index, selected, onSelect }: { video: typeof videos[number]; index: number; selected: boolean; onSelect: () => void }) {
  return <article className={selected ? 'is-selected' : ''} tabIndex={0} role="button" aria-pressed={selected} onClick={onSelect} onFocus={onSelect} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(); } }}>
    <img src={video.poster} alt="" loading="lazy" />
    <div><span>CLIP {String(index + 1).padStart(2, '0')} · {video.duration}</span><h3>{video.title}</h3><p>{video.caption}</p></div>
  </article>;
}

function CreateStudio() {
  const [playhead, setPlayhead] = useState(0);
  const reduced = useReducedMotion();
  const active = Math.min(videos.length - 1, Math.floor(playhead / (100 / videos.length)));
  const select = (index: number) => setPlayhead(index * (100 / videos.length) + 8);
  return <section className="cr-section cr-create" id="create" aria-labelledby="create-title">
    <div className="cr-section-heading"><span className="cr-index">03</span><div><p className="cr-kicker">CREATE / VIDEO STUDIO</p><h2 id="create-title">Pacing gives<br />ideas momentum.</h2></div><p>Editing is interaction design over time: sequence information, create anticipation, and give every transition a reason.</p></div>
    <div className="cr-edit-bay">
      <div className="cr-monitor"><video key={videos[active].src} src={videos[active].src} poster={videos[active].poster} controls autoPlay={!reduced} muted playsInline preload="metadata" aria-label={`${videos[active].title} project video`}>{videos[active].captions && <track kind="captions" src={videos[active].captions} srcLang="en" label="English" default />}</video><div><span className="cr-kicker">PROGRAM MONITOR</span><b>{videos[active].title}</b><small>{videos[active].caption}</small></div></div>
      <div className="cr-clip-grid">{videos.map((video, index) => <VideoClip key={video.title} video={video} index={index} selected={active === index} onSelect={() => select(index)} />)}</div>
      <div className="cr-timeline"><div className="cr-time-head"><span>00:00:00</span><strong>EDIT TIMELINE / DRAG OR USE ARROW KEYS</strong><output>{String(Math.round(playhead)).padStart(2, '0')}%</output></div><div className="cr-track" aria-hidden="true">{videos.map((video, index) => <span key={video.title} className={active === index ? 'is-active' : ''}>C{index + 1}</span>)}<i style={{ left: `${playhead}%` }} /></div><label><span className="sr-only">Timeline playhead position</span><input type="range" min="0" max="100" value={playhead} onChange={(event) => setPlayhead(Number(event.target.value))} /></label></div>
    </div>
    <p className="cr-placeholder-note">VIDEO ACCESSIBILITY / Project videos are now included. Add accurate VTT caption tracks in <code>src/data/studio.ts</code> when transcripts are available.</p>
  </section>;
}

function PlayRoom() {
  return <section className="cr-section cr-play" id="play" aria-labelledby="play-title">
    <div className="cr-section-heading"><span className="cr-index">04</span><div><p className="cr-kicker">PLAY / GAME ROOM</p><h2 id="play-title">Good systems<br />teach by doing.</h2></div><p>Games make feedback, affordance, challenge, and progress visible. These lessons translate directly into understandable product experiences.</p></div>
    <div className="cr-game-grid">{games.map((game, index) => <article key={game.title}><div className="cr-game-art"><img src={game.image} alt={game.imageAlt} loading="lazy" /><span>0{index + 1}</span></div><div><p className="cr-kicker">{game.genre}</p><h3>{game.title}</h3><p>{game.lesson}</p></div></article>)}</div>
    <div className="cr-principles"><div><p className="cr-kicker">SIMPLE CONCEPTS APPLIED</p><h3>What this portfolio practices.</h3></div>{[
      ['Visual hierarchy', 'Display type and numbered rooms guide the reading order.'],
      ['Consistency', 'Repeated panels, labels, and controls reduce relearning.'],
      ['Clear feedback', 'Progress, selected states, and focus styles show what changed.'],
      ['Accessibility', 'Keyboard controls, semantics, contrast, and reduced motion widen access.'],
    ].map(([title, text]) => <article key={title}><strong>{title}</strong><p>{text}</p></article>)}</div>
  </section>;
}

function Contact() {
  return <section className="cr-contact" id="contact" aria-labelledby="contact-title"><div className="cr-controller" aria-hidden="true"><span>L1</span><Gamepad2 /><span>R1</span></div><p className="cr-kicker">PLAYER 2 JOINED</p><h2 id="contact-title">Have a quest<br />worth sharing?</h2><p>I'm open to opportunities, collaborations, and thoughtful product conversations.</p><div className="cr-contact-actions"><a className="cr-button is-primary" data-magnetic href={profile.linkedin} target="_blank" rel="noreferrer"><span>L1</span> Connect on LinkedIn <Linkedin /></a><a className="cr-button is-quiet" href={profile.github} target="_blank" rel="noreferrer"><span>R1</span> View GitHub <Github /></a></div><div className="cr-contact-meta"><span>{profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : 'Email · add verified address'}</span><span id="resume-status">{profile.resume ? <a href={profile.resume} download>Download resume</a> : 'Resume · file not supplied'}</span></div></section>;
}

function Home({ navigate }: { navigate: Navigate }) {
  return <><Hero /><PlayerProfile /><Quests navigate={navigate} /><Capture /><CreateStudio /><PlayRoom /><Contact /></>;
}

function BeforeAfterSlider({ project }: { project: Project }) {
  const [position, setPosition] = useState(52);
  const sideStyle = { padding: '2rem', fontSize: '1rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column' as const, gap: '0.75rem', overflow: 'hidden' };
  return <div className="cr-comparison">
    <div className="cr-compare-stage">
      <div className="cr-compare-side is-before" style={sideStyle}><span>PROBLEM SPACE</span><strong style={{ fontSize: '1rem', fontWeight: 400 }}>{project.challenge}</strong></div>
      <div className="cr-compare-side is-after" style={{ ...sideStyle, clipPath: `inset(0 0 0 ${position}%)` }}><span>PORTFOLIO DIRECTION</span><strong style={{ fontSize: '1rem', fontWeight: 400 }}>{project.approach}</strong></div>
      <i style={{ left: `${position}%` }} aria-hidden="true"><b>↔</b></i>
    </div>
    <label><span>Compare framing and proposed direction</span><output>{position}%</output><input type="range" min="10" max="90" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Reveal proposed interface direction" /></label>
  </div>;
}

const casePhases = [
  { id: 'research', label: 'Research', icon: Search },
  { id: 'wireframe', label: 'Wireframe', icon: PenTool },
  { id: 'prototype', label: 'Prototype', icon: MonitorPlay },
  { id: 'test', label: 'Test', icon: TestTube2 },
];

function CaseStudy({ project, navigate }: { project: Project; navigate: Navigate }) {
  const [activePhase, setActivePhase] = useState('research');
  useEffect(() => {
    const sections = casePhases.map((phase) => document.getElementById(`case-${phase.id}`)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActivePhase(entry.target.id.replace('case-', ''))), { rootMargin: '-25% 0px -55%' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [project.slug]);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  return <article className="cr-case">
    <header className="cr-case-hero">
      <button className="cr-text-button" onClick={() => navigate('/')}><ArrowLeft size={17} /> Back to quests</button>
      <div className="cr-case-title"><div><span className="cr-kicker">QUEST {String(index + 1).padStart(2, '0')} / {project.category}</span><h1>{project.title}</h1><p>{project.description}</p></div><div className="cr-case-facts"><span><small>ROLE</small>{project.role}</span><span><small>STACK</small>{project.stack.slice(0, 3).join(' · ')}</span>{project.liveLink && <span><small>LIVE LINK</small><a href={project.liveLink} target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'underline'}}>Visit site ↗</a></span>}<span><small>CASE TYPE</small>Structured portfolio narrative</span></div></div>
      <ProjectVisual slug={project.slug} />
    </header>
    <div className="cr-case-layout">
      <aside className="cr-case-rail" aria-label="Case study progress"><span className="cr-kicker">MISSION PROGRESS</span>{casePhases.map(({ id, label, icon: Icon }, phaseIndex) => <a key={id} className={activePhase === id ? 'is-active' : ''} href={`#case-${id}`}><i>{String(phaseIndex + 1).padStart(2, '0')}</i><Icon size={17} /><span>{label}</span></a>)}<p>These phases organize the portfolio story. They do not claim undocumented research or testing.</p></aside>
      <div className="cr-case-story">
        <section id="case-research" className="cr-case-phase"><div className="cr-phase-title"><span>01</span><div><p className="cr-kicker">RESEARCH / UNDERSTAND</p><h2>Start with the context,<br />not the canvas.</h2></div></div><div className="cr-phase-grid"><div><h3>Context</h3><p>{project.context}</p></div><div><h3>Intended use</h3><p>{project.useCase}</p></div></div><div className="cr-evidence-note"><Search /><div><strong>Evidence boundary</strong><p>The supplied project description did not include interview transcripts, analytics, or a validated persona. This section uses documented scope only.</p></div></div></section>
        <section id="case-wireframe" className="cr-case-phase"><div className="cr-phase-title"><span>02</span><div><p className="cr-kicker">WIREFRAME / STRUCTURE</p><h2>Give each decision<br />a clear job.</h2></div></div><p className="cr-phase-lede">{project.goals}</p><div className="cr-flow-map">{project.highlights.slice(0, 4).map((highlight, itemIndex) => <div key={highlight}><span>0{itemIndex + 1}</span><strong>{highlight}</strong></div>)}</div><div className="cr-decision-list">{project.decisions.map((decision, itemIndex) => <article key={decision}><span>{String(itemIndex + 1).padStart(2, '0')}</span><p>{decision}</p></article>)}</div></section>
        <section id="case-prototype" className="cr-case-phase"><div className="cr-phase-title"><span>03</span><div><p className="cr-kicker">PROTOTYPE / MAKE TANGIBLE</p><h2>Turn structure into<br />an experience.</h2></div></div><p className="cr-phase-lede">{project.approach}</p><BeforeAfterSlider project={project} /><div className="cr-prototype-slot"><img src="/videos/poster-01.svg" alt="Placeholder poster for a future project walkthrough" loading="lazy" /><div><Play aria-hidden="true" /><span>PROTOTYPE WALKTHROUGH</span><strong>Add a captioned project video</strong><small>Placeholder — no source video was supplied.</small></div></div></section>
        <section id="case-test" className="cr-case-phase"><div className="cr-phase-title"><span>04</span><div><p className="cr-kicker">TEST / LEARN</p><h2>Make the next iteration<br />more informed.</h2></div></div><div className="cr-test-grid"><article><span>CHALLENGE</span><p>{project.challenge}</p></article><article><span>LEARNING / NEXT REVIEW</span><p>{project.learning}</p></article></div><div className="cr-concept-panel"><div><Sparkles /><h3>UI/UX concepts applied</h3><p>Focused principles connected to specific interface decisions.</p></div><div>{project.uiuxConcepts.slice(0, 4).map((concept) => <article key={concept.concept}><strong>{concept.concept}</strong><p>{concept.application}</p></article>)}</div></div></section>
      </div>
    </div>
    <ProjectAnchor project={next} navigate={navigate} className="cr-next-quest"><span className="cr-kicker">NEXT QUEST</span><strong>{next.title}</strong><ArrowRight /></ProjectAnchor>
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
    <WaveBackground routeKey={path} /><a className="skip-link" href="#main">Skip to content</a><BootScreen /><div className="cr-xp" aria-hidden="true"><i /></div><div className="cr-cursor" aria-hidden="true" />
    <Header navigate={navigate} />
    <AnimatePresence mode="wait" initial={false}><motion.main id="main" key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>{isUnknown ? <NotFound navigate={navigate} /> : project ? <CaseStudy project={project} navigate={navigate} /> : <Home navigate={navigate} />}</motion.main></AnimatePresence>
    <footer className="cr-footer"><span>KK / CONTROL ROOM</span><p>Designed and built by Kunal Khaire.</p><MotionToggle /><a href="#hero">Back to top ↑</a></footer>
  </div>;
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root')!;
  if (root.hasChildNodes()) hydrateRoot(root, <App />);
  else createRoot(root).render(<App />);
}
