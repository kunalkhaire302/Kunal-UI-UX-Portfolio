import { useEffect, useRef, useState } from 'react';
import { lightWaveColors, waveScenes, type WaveScene } from './scenes';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number };
type Ripple = { x: number; y: number; age: number };
type IdleWindow = Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (handle: number) => void };

const TAU = Math.PI * 2;
const sceneIds = ['hero', 'quests', 'play', 'capture', 'create', 'contact'];
const hex = (value: string) => [parseInt(value.slice(1, 3), 16), parseInt(value.slice(3, 5), 16), parseInt(value.slice(5, 7), 16)];
const mix = (a: number, b: number, amount: number) => a + (b - a) * amount;

export function MotionToggle() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(localStorage.getItem('reduce-background-motion') === 'true'), []);
  const toggle = () => {
    const next = !reduced;
    setReduced(next);
    localStorage.setItem('reduce-background-motion', String(next));
    dispatchEvent(new CustomEvent('background-motion-change', { detail: next }));
  };
  return <button className="wave-motion-toggle" type="button" aria-pressed={reduced} onClick={toggle}>{reduced ? 'Enable background motion' : 'Reduce background motion'}</button>;
}

export function WaveBackground({ routeKey }: { routeKey: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = matchMedia('(pointer:fine)').matches;
    const idleWindow = window as IdleWindow;
    const particles: Particle[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: .5, y: .5, targetX: .5, targetY: .5 };
    let active: WaveScene = { ...waveScenes.hero, colors: [...waveScenes.hero.colors] };
    let target: WaveScene = waveScenes.hero;
    let colors = active.colors.map(hex);
    let targetColors = colors.map((color) => [...color]);
    let width = 1, height = 1, dpr = 1, frame = 0, resizeTimer = 0;
    let previous = performance.now(), lastFrame = 0, previousScroll = scrollY, previousScrollTime = previous;
    let scrollEnergy = 0, scrollTarget = 0;
    let themeMix = document.documentElement.dataset.theme === 'light' ? 1 : 0;
    let themeTarget = themeMix;
    let userReduced = localStorage.getItem('reduce-background-motion') === 'true';
    let reduced = motionQuery.matches || userReduced;
    let pageVisible = !document.hidden, canvasVisible = true, disposed = false, initialized = false;
    const lowPower = navigator.hardwareConcurrency <= 4 || innerWidth < 768;
    const stackedLines = lowPower ? 2 : 4;
    const xStep = lowPower ? 15 : 9;
    const maxParticles = lowPower ? 34 : 80;

    const setScene = (name: string) => { target = waveScenes[name] || waveScenes.hero; targetColors = target.colors.map(hex); };
    const resize = () => {
      width = innerWidth; height = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length) for (let index = 0; index < maxParticles; index += 1) particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * 6, vy: -2 - Math.random() * 5, radius: .5 + Math.random() * 1.4, alpha: .07 + Math.random() * .2 });
    };
    const interpolate = (delta: number) => {
      const amount = 1 - Math.exp(-delta * 4.2);
      active.amplitude = mix(active.amplitude, target.amplitude, amount); active.speed = mix(active.speed, target.speed, amount);
      active.yPosition = mix(active.yPosition, target.yPosition, amount); active.particleCount = mix(active.particleCount, target.particleCount, amount);
      active.opacity = mix(active.opacity, target.opacity, amount); active.scanline = target.scanline; active.converge = target.converge;
      for (let index = 0; index < 3; index += 1) for (let channel = 0; channel < 3; channel += 1) colors[index][channel] = mix(colors[index][channel], targetColors[index][channel], amount);
      pointer.x = mix(pointer.x, pointer.targetX, 1 - Math.exp(-delta * 5)); pointer.y = mix(pointer.y, pointer.targetY, 1 - Math.exp(-delta * 5));
      scrollEnergy = mix(scrollEnergy, scrollTarget, 1 - Math.exp(-delta * 4)); scrollTarget *= Math.exp(-delta * 4.5);
      themeMix = mix(themeMix, themeTarget, 1 - Math.exp(-delta * 7));
    };
    const draw = (now: number, staticFrame = false) => {
      if (disposed || !pageVisible || !canvasVisible) return;
      if (!staticFrame && now - lastFrame < 16.5) { frame = requestAnimationFrame(draw); return; }
      lastFrame = now;
      const delta = staticFrame ? 0 : Math.min((now - previous) / 1000, .05); previous = now; interpolate(delta);
      context.clearRect(0, 0, width, height);
      context.fillStyle = `rgb(${Math.round(mix(11,247,themeMix))},${Math.round(mix(15,247,themeMix))},${Math.round(mix(26,242,themeMix))})`; context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'source-over';
      const particleLimit = Math.min(particles.length, Math.round(active.particleCount));
      for (let index = 0; index < particleLimit; index += 1) {
        const particle = particles[index];
        if (!staticFrame) { particle.x += particle.vx * delta; particle.y += particle.vy * delta; }
        if (particle.y < -4) { particle.y = height + 4; particle.x = Math.random() * width; }
        if (particle.x < -4) particle.x = width + 4; else if (particle.x > width + 4) particle.x = -4;
        const twinkle = staticFrame ? .8 : .72 + Math.sin(now * .0016 + index * 1.7) * .28;
        context.fillStyle = `rgba(${Math.round(mix(148,102,themeMix))},${Math.round(mix(196,147,themeMix))},${Math.round(mix(255,164,themeMix))},${particle.alpha * twinkle * mix(1,.55,themeMix)})`;
        context.beginPath(); context.arc(particle.x, particle.y, particle.radius, 0, TAU); context.fill();
      }
      context.globalCompositeOperation = themeMix > .55 ? 'source-over' : 'lighter';
      const amplitudes = [86, 60, 40], speeds = [.28, .46, .7];
      for (let layer = 0; layer < 3; layer += 1) {
        const pastel = hex(lightWaveColors[layer]);
        const red = Math.round(mix(colors[layer][0], pastel[0], themeMix));
        const green = Math.round(mix(colors[layer][1], pastel[1], themeMix));
        const blue = Math.round(mix(colors[layer][2], pastel[2], themeMix));
        context.shadowBlur = mix(lowPower ? 6 : 18, 3, themeMix); context.shadowColor = `rgb(${red},${green},${blue})`;
        const layerY = active.converge ? mix(active.yPosition + (layer - 1) * .14, .5, .72) : active.yPosition + (layer - 1) * .14;
        const parallaxX = (pointer.x - .5) * (layer + 1) * 12, parallaxY = (pointer.y - .5) * (layer + 1) * 10;
        for (let line = -1; line < stackedLines; line += 1) {
          const isGlow = line === -1;
          context.beginPath(); context.lineWidth = isGlow ? (lowPower ? 8 : 16) : .8 + line * .55;
          context.strokeStyle = `rgba(${red},${green},${blue},${active.opacity * (isGlow ? .07 : .48 - line * .065) * mix(1,.82,themeMix)})`;
          for (let x = -18; x <= width + 18; x += xStep) {
            const normalized = (x + parallaxX) / Math.max(width, 1);
            const time = staticFrame ? 1.7 : now * .001 * speeds[layer] * active.speed * (1 + scrollEnergy * .5);
            const breath = staticFrame ? 1 : 1 + Math.sin(now * .00045 + layer * 1.8) * .065;
            const amplitude = amplitudes[layer] * active.amplitude * breath * (1 + scrollEnergy * .28);
            const lineOffset = isGlow ? 0 : (line - (stackedLines - 1) / 2) * (8 + Math.sin(normalized * TAU * 1.6 + time) * 2.5);
            let y = height * layerY + Math.sin(normalized * TAU * (1.12 + layer * .2) + time + layer) * amplitude + Math.sin(normalized * TAU * 2.3 - time * 1.35 + layer) * amplitude * .24 + Math.sin(normalized * TAU * .52 + time * .35) * amplitude * .12 + lineOffset + parallaxY;
            if (finePointer && !reduced) { const distance = x - pointer.x * width; const pull = Math.exp(-(distance * distance) / (2 * Math.pow(width * .16, 2))); y += Math.max(-62, Math.min(62, (pointer.y * height - y) * .16)) * pull; }
            for (const wave of ripples) { const distance = Math.hypot(x - wave.x, y - wave.y); y += Math.sin(distance * .035 - wave.age * 8) * 20 * Math.exp(-(distance * distance) / (2 * Math.pow(width * .18, 2))) * Math.max(0, 1 - wave.age / 2.2); }
            if (x === -18) context.moveTo(x, y); else context.lineTo(x, y);
          }
          context.stroke();
        }
      }
      if (active.scanline) {
        const scanY = staticFrame ? height * .55 : (now * .045) % (height + 100) - 50;
        const gradient = context.createLinearGradient(0, scanY - 30, 0, scanY + 30);
        gradient.addColorStop(0, 'rgba(34,211,238,0)'); gradient.addColorStop(.5, `rgba(34,211,238,${.08 * (1 - themeMix)})`); gradient.addColorStop(1, 'rgba(34,211,238,0)');
        context.fillStyle = gradient; context.fillRect(0, scanY - 30, width, 60);
      }
      context.shadowBlur = 0; context.globalCompositeOperation = 'source-over';
      if (!staticFrame && !reduced) {
        for (let index = ripples.length - 1; index >= 0; index -= 1) { ripples[index].age += delta; if (ripples[index].age > 2.2) ripples.splice(index, 1); }
        frame = requestAnimationFrame(draw);
      }
    };
    const restart = () => { cancelAnimationFrame(frame); previous = performance.now(); draw(previous, reduced); };
    const initialize = async () => {
      if (disposed) return; initialized = true; resize();
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (disposed) return; gsap.registerPlugin(ScrollTrigger);
      sceneIds.forEach((id) => { const element = document.getElementById(id); if (element) ScrollTrigger.create({ trigger: element, start: 'top 55%', end: 'bottom 45%', onEnter: () => setScene(id), onEnterBack: () => setScene(id) }); });
      restart();
    };
    const pointerMove = (event: PointerEvent) => { pointer.targetX = event.clientX / width; pointer.targetY = event.clientY / height; };
    const scroll = () => { const now = performance.now(); scrollTarget = Math.min(1.4, Math.abs(scrollY - previousScroll) / Math.max(now - previousScrollTime, 16) * .55); previousScroll = scrollY; previousScrollTime = now; };
    const ripple = (event: PointerEvent) => { if (!reduced) ripples.push({ x: event.clientX, y: event.clientY, age: 0 }); };
    const themeObserver = new MutationObserver(() => { themeTarget = document.documentElement.dataset.theme === 'light' ? 1 : 0; if (reduced) { themeMix = themeTarget; restart(); } });
    const resizeObserver = new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(() => { resize(); if (reduced) restart(); }, 120); });
    const visibility = () => { pageVisible = !document.hidden; if (pageVisible && initialized) restart(); else cancelAnimationFrame(frame); };
    const canvasObserver = new IntersectionObserver(([entry]) => { canvasVisible = entry.isIntersecting; if (canvasVisible && initialized) restart(); else cancelAnimationFrame(frame); });
    const preference = () => { reduced = motionQuery.matches || userReduced; restart(); };
    const override = (event: Event) => { userReduced = (event as CustomEvent<boolean>).detail; reduced = motionQuery.matches || userReduced; restart(); };
    const idle = idleWindow.requestIdleCallback ? idleWindow.requestIdleCallback(initialize, { timeout: 700 }) : setTimeout(initialize, 40);
    if (finePointer) addEventListener('pointermove', pointerMove, { passive: true });
    addEventListener('scroll', scroll, { passive: true }); addEventListener('pointerdown', ripple, { passive: true }); addEventListener('background-motion-change', override);
    document.addEventListener('visibilitychange', visibility); motionQuery.addEventListener('change', preference);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] }); resizeObserver.observe(document.documentElement); canvasObserver.observe(canvas);
    return () => {
      disposed = true; cancelAnimationFrame(frame);
      if (idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idle); else clearTimeout(idle);
      removeEventListener('pointermove', pointerMove); removeEventListener('scroll', scroll); removeEventListener('pointerdown', ripple); removeEventListener('background-motion-change', override);
      document.removeEventListener('visibilitychange', visibility); motionQuery.removeEventListener('change', preference);
      themeObserver.disconnect(); resizeObserver.disconnect(); canvasObserver.disconnect();
      void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.getAll().filter((item) => sceneIds.includes(item.trigger?.id || '')).forEach((item) => item.kill()));
    };
  }, [routeKey]);

  return <div className="wave-background" aria-hidden="true"><canvas ref={canvasRef} /><div className="wave-vignette" /><div className="wave-grain" /></div>;
}
