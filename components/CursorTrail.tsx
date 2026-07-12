"use client";
import { useEffect, useRef } from "react";

/**
 * CursorTrail
 * -----------
 * A restrained, professional take on "particles that follow the cursor" —
 * same family of effect as flashy fire/spark templates, but using your
 * existing --accent / --violet / --green palette at low opacity so it
 * reads as "subtle energy," not a rave.
 *
 * How it works: on pointer move, a couple of small glowing particles spawn
 * at the cursor position with a tiny bit of the pointer's velocity, then
 * drift, shrink, and fade over ~700ms. Runs on a single full-viewport
 * <canvas>, animated via requestAnimationFrame — cheap enough to leave
 * running behind an entire page.
 *
 * Usage — sitewide (recommended), once in app/layout.tsx:
 *   <body>
 *     <CursorTrail />
 *     <CustomCursor />
 *     {children}
 *   </body>
 *
 * Usage — scoped to just the Hero (lighter touch, if you'd rather keep it
 * contained to the first screen):
 *   <section id="home" className="relative ...">
 *     <CursorTrail scoped />
 *     ...
 *   </section>
 * (With `scoped`, the canvas is `absolute` and fills its positioned
 * parent instead of the whole viewport.)
 *
 * Automatically disabled on touch devices (no persistent cursor to trail)
 * and for prefers-reduced-motion.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;      // 0 → 1, counts down
  maxLife: number;    // ms
  color: string;
  born: number;
};

const PALETTE = [
  "56, 189, 248",  // accent
  "167, 139, 250", // violet
  "52, 211, 153",  // green
];

export default function CursorTrail({ scoped = false }: { scoped?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = scoped ? canvas.parentElement : null;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = scoped && parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let hasPointer = false;

    const spawn = (x: number, y: number, vx: number, vy: number) => {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      particles.push({
        x,
        y,
        vx: vx * 0.06 + (Math.random() - 0.5) * 0.4,
        vy: vy * 0.06 + (Math.random() - 0.5) * 0.4,
        size: 1.4 + Math.random() * 1.8,
        life: 1,
        maxLife: 600 + Math.random() * 350,
        color,
        born: performance.now(),
      });
      if (particles.length > 140) particles.shift();
    };

    const onMove = (e: MouseEvent) => {
      const rect = scoped && parent ? parent.getBoundingClientRect() : { left: 0, top: 0 };
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const vx = hasPointer ? x - lastX : 0;
      const vy = hasPointer ? y - lastY : 0;
      lastX = x;
      lastY = y;
      hasPointer = true;

      // Spawn a couple particles per move event, scaled lightly by speed
      const speed = Math.min(Math.hypot(vx, vy), 40);
      const count = speed > 6 ? 2 : 1;
      for (let i = 0; i < count; i++) spawn(x, y, vx, vy);
    };

    const onLeave = () => {
      hasPointer = false;
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();

      particles = particles.filter((p) => {
        const age = now - p.born;
        p.life = 1 - age / p.maxLife;
        if (p.life <= 0) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        const alpha = Math.max(0, p.life) * 0.55;
        const size = p.size * (0.4 + p.life * 0.6);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.shadowColor = `rgba(${p.color}, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const target = scoped && parent ? parent : window;
    target.addEventListener("mousemove", onMove as EventListener, { passive: true });
    target.addEventListener("mouseleave", onLeave as EventListener);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("mousemove", onMove as EventListener);
      target.removeEventListener("mouseleave", onLeave as EventListener);
      window.removeEventListener("resize", resize);
    };
  }, [scoped]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={scoped ? "absolute inset-0 pointer-events-none z-[1]" : "fixed inset-0 pointer-events-none z-[1]"}
    />
  );
}