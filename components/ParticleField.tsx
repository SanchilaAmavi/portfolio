"use client";

import { useMemo } from "react";

type Particle = {
  id: number;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
};

const COLORS = [
  "var(--accent)",
  "var(--violet)",
  "var(--green)",
  "var(--cyan)",
  "var(--pink)",
  "var(--gold)",
  "var(--coral)",
];

/**
 * Ambient full-bleed background of slow-drifting, softly glowing dots.
 * Purely decorative (aria-hidden), sits behind content via negative z-index.
 * Drop it once inside a relatively-positioned section, e.g. your Hero:
 *
 *   <section className="relative ...">
 *     <ParticleField count={28} />
 *     ...your existing hero content...
 *   </section>
 *
 * `count` defaults to 24 — keep it modest (20-35) so it reads as atmosphere,
 * not noise. Respects prefers-reduced-motion automatically via CSS.
 */
export default function ParticleField({ count = 24 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      color: COLORS[i % COLORS.length],
      duration: 14 + Math.random() * 16,
      delay: Math.random() * -20,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-10%",
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.55,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particle-rise ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes particle-rise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          8%   { opacity: 0.55; }
          92%  { opacity: 0.4; }
          100% { transform: translateY(-120vh) translateX(24px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          span { animation: none !important; opacity: 0.25 !important; }
        }
      `}</style>
    </div>
  );
}