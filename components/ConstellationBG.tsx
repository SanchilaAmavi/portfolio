"use client";
import { useEffect, useRef } from "react";

/**
 * ConstellationBG
 * ────────────────────────────────────────────────────────────────────────
 * A full-bleed, canvas-driven animated network of drifting glowing nodes
 * connected by thin lines when close together — the "constellation" look.
 * Drop it as the FIRST child inside any `relative overflow-hidden` section
 * (it renders absolute, inset-0, pointer-events-none, so it never blocks
 * clicks or scrolling and sits behind the section-inner content).
 *
 * Usage:
 *   <section className="relative overflow-hidden ...">
 *     <ConstellationBG />
 *     ...rest of section
 *   </section>
 *
 * Props let you tune density / speed per-section if a section feels too
 * busy or too quiet, but sane defaults are picked already.
 */

interface ConstellationBGProps {
  /** Roughly how many nodes to draw. Lower on smaller sections. */
  density?: number;
  /** Max distance (px) at which two nodes are still linked by a line. */
  linkDistance?: number;
  /** Overall drift speed multiplier. */
  speed?: number;
  /** Opacity of the whole layer (0–1). */
  opacity?: number;
  /** Show the large soft rotating arc ring in the corner, like the reference art. */
  showArc?: boolean;
  /** Show the soft top-left light-beam glow. */
  showBeam?: boolean;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ConstellationBG({
  density = 42,
  linkDistance = 150,
  speed = 1,
  opacity = 0.9,
  showArc = true,
  showBeam = true,
  className = "",
}: ConstellationBGProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pull real theme colors so this always matches the current palette.
    const rootStyle = getComputedStyle(document.documentElement);
    const accent = rootStyle.getPropertyValue("--accent").trim() || "#38bdf8";
    const violet = rootStyle.getPropertyValue("--violet").trim() || "#a78bfa";

    const hexToRgb = (hex: string) => {
      const clean = hex.replace("#", "");
      const bigint = parseInt(
        clean.length === 3
          ? clean.split("").map((c) => c + c).join("")
          : clean,
        16
      );
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };
    const [ar, ag, ab] = hexToRgb(accent);
    const [vr, vg, vb] = hexToRgb(violet);

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let rafId = 0;
    let running = false;
    let visible = true;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const buildNodes = () => {
      const area = width * height;
      // Scale count a little by area so tiny sections don't get overcrowded.
      const count = Math.max(14, Math.min(density, Math.round((area / 1_100_000) * density)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.18, 0.18) * speed,
        vy: rand(-0.14, 0.14) * speed,
        r: rand(1.1, 2.4),
      }));
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // Update + draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Draw links first (so nodes glow on top)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const t = 1 - dist / linkDistance;
            const useAccent = (i + j) % 2 === 0;
            const [r, g, bch] = useAccent ? [ar, ag, ab] : [vr, vg, vb];
            ctx.strokeStyle = `rgba(${r}, ${g}, ${bch}, ${t * 0.32})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const useAccent = i % 2 === 0;
        const [r, g, bch] = useAccent ? [ar, ag, ab] : [vr, vg, vb];
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${bch}, 0.55)`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${bch}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${r + (255 - r) * 0.5}, ${g + (255 - g) * 0.5}, ${bch + (255 - bch) * 0.5}, 0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    };

    resize();

    if (prefersReducedMotion) {
      // Draw a single static frame so the aesthetic still shows, but
      // nothing keeps animating for users who asked for reduced motion.
      ctx.clearRect(0, 0, width, height);
      for (const n of nodes) {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        glow.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, 0.4)`);
        glow.addColorStop(1, `rgba(${ar}, ${ag}, ${ab}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Only animate while the section is actually on screen — keeps five
      // simultaneous canvases (one per page section) cheap on the CPU/GPU.
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        },
        { threshold: 0.01 }
      );
      io.observe(wrap);

      const onResize = () => resize();
      window.addEventListener("resize", onResize);

      return () => {
        stop();
        io.disconnect();
        window.removeEventListener("resize", onResize);
      };
    }
  }, [density, linkDistance, speed]);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Soft directional light beam, top-left — matches the reference art */}
      {showBeam && (
        <div
          className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.05), transparent 60%)",
          }}
        />
      )}

      {/* Large slow-rotating arc ring, purely decorative */}
      {showArc && (
        <svg
          className="absolute"
          style={{
            top: "50%",
            left: "58%",
            width: "min(70vw, 900px)",
            height: "min(70vw, 900px)",
            transform: "translate(-50%, -50%)",
            animation: "constellation-spin 90s linear infinite",
            opacity: 0.35,
          }}
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="150"
            stroke="url(#constellation-arc-grad)"
            strokeWidth="1"
            strokeDasharray="4 10"
          />
          <defs>
            <linearGradient id="constellation-arc-grad" x1="0" y1="0" x2="400" y2="400">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}

      <canvas ref={canvasRef} className="absolute inset-0" />

      <style>{`
        @keyframes constellation-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          svg[style*="constellation-spin"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}