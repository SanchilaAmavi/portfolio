"use client";
import { useEffect, useRef } from "react";

/**
 * ConstellationBG
 * ────────────────────────────────────────────────────────────────────────
 * A quiet, professional animated network of drifting glowing nodes,
 * connected by faint lines when close together. Designed to sit BEHIND
 * section content without competing with it:
 *   - the network is masked so it fades out toward the center/content
 *     area and stays concentrated along the edges and corners
 *   - node count, line opacity and glow are all tuned down from a "wow"
 *     effect to an ambient one — it should read as atmosphere, not noise
 *
 * Drop it as the FIRST child inside any `relative overflow-hidden` section:
 *
 *   <section className="relative overflow-hidden ...">
 *     <ConstellationBG />
 *     ...rest of section
 *   </section>
 *
 * If a section is mostly empty (little text/cards in the middle), pass
 * `edgeFade={false}` to let the network fill the whole section evenly.
 */

interface ConstellationBGProps {
  /** Roughly how many nodes to draw. Keep this low — this is atmosphere, not a hero visual. */
  density?: number;
  /** Max distance (px) at which two nodes are still linked by a line. */
  linkDistance?: number;
  /** Overall drift speed multiplier. */
  speed?: number;
  /** Opacity of the whole layer (0–1). Kept low by default so text stays crisp. */
  opacity?: number;
  /** Fade the network out toward the center so it doesn't cross busy content. */
  edgeFade?: boolean;
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
  density = 20,
  linkDistance = 130,
  speed = 0.6,
  opacity = 0.5,
  edgeFade = true,
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

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const buildNodes = () => {
      const area = width * height;
      // Scale count by area, but cap hard — this must stay sparse.
      const count = Math.max(10, Math.min(density, Math.round((area / 900_000) * density * 0.4 + density * 0.5)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.1, 0.1) * speed,
        vy: rand(-0.08, 0.08) * speed,
        r: rand(1, 1.9),
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links first, so nodes sit visually on top.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const t = 1 - dist / linkDistance;
            ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, ${t * 0.16})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const useAccent = i % 3 !== 0; // mostly accent, occasional violet
        const [r, g, bch] = useAccent ? [ar, ag, ab] : [vr, vg, vb];

        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4.5);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${bch}, 0.35)`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${bch}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${r}, ${g}, ${bch}, 0.85)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      if (!running) return;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }
      draw();
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
    draw();

    if (prefersReducedMotion) {
      // Single static frame only — no motion for users who asked for none.
      return;
    }

    // Only animate while the section is actually on screen — keeps several
    // simultaneous canvases (one per page section) cheap on CPU/GPU.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
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
  }, [density, linkDistance, speed]);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        opacity,
        maskImage: edgeFade
          ? "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 30%, black 78%)"
          : undefined,
        WebkitMaskImage: edgeFade
          ? "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 30%, black 78%)"
          : undefined,
      }}
      aria-hidden="true"
    >
      {/* Soft directional light, top-left corner only */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.035), transparent 65%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}