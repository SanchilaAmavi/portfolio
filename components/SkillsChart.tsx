"use client";
import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/data";

/**
 * Two chart views built ONLY from real data: the number of tools/technologies
 * listed per category in lib/data.ts. This is "breadth," not invented
 * proficiency percentages — I won't fabricate skill levels like "Python 92%"
 * since there's no honest basis for that number.
 */

const COLORS = ["var(--accent)", "var(--violet)", "var(--green)", "var(--amber)", "var(--rose)", "var(--accent)"];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ── Horizontal breadth bars ─────────────────────────────────────────── */
function BreadthBars() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...skills.map((s) => s.items.length));

  return (
    <div ref={ref} className="space-y-3.5">
      {skills.map((s, i) => {
        const pct = Math.round((s.items.length / max) * 100);
        return (
          <div key={s.category}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-[var(--text)]">{s.category}</span>
              <span className="font-mono text-[0.62rem] text-[var(--text-subtle)]">{s.items.length} tools</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-[1100ms] ease-out"
                style={{
                  width: inView ? `${pct}%` : "0%",
                  transitionDelay: `${i * 90}ms`,
                  background: `linear-gradient(90deg, ${COLORS[i % COLORS.length]}, var(--accent))`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Radar / polygon overview ────────────────────────────────────────── */
function RadarChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const size = 260;
  const center = size / 2;
  const maxR = center - 36;
  const max = Math.max(...skills.map((s) => s.items.length));
  const n = skills.length;

  const points = skills.map((s, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = inView ? (s.items.length / max) * maxR : 0;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (maxR + 22) * Math.cos(angle),
      labelY: center + (maxR + 22) * Math.sin(angle),
      angle,
    };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  // background concentric rings
  const rings = [0.33, 0.66, 1].map((f) => {
    const ringPts = skills.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = maxR * f;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    }).join(" ");
    return ringPts;
  });

  return (
    <div ref={ref} className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {rings.map((r, i) => (
          <polygon key={i} points={r} fill="none" stroke="var(--border)" strokeWidth="1" />
        ))}
        {/* axis lines */}
        {skills.map((_, i) => {
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center} y1={center}
              x2={center + maxR * Math.cos(angle)}
              y2={center + maxR * Math.sin(angle)}
              stroke="var(--border)" strokeWidth="1"
            />
          );
        })}
        {/* data polygon */}
        <polygon
          points={polygon}
          fill="var(--accent)"
          fillOpacity="0.14"
          stroke="var(--accent)"
          strokeWidth="1.5"
          style={{ transition: "all 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--accent)"
            style={{ transition: "all 1s cubic-bezier(0.22,1,0.36,1)" }} />
        ))}
        {/* labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontFamily="var(--font-mono), monospace"
            fill="var(--text-subtle)"
          >
            {skills[i].category.split(" ")[0]}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function SkillsChart() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center card p-7">
      <div>
        <p className="font-mono text-[0.6rem] tracking-widest text-[var(--text-subtle)] uppercase mb-4">
          Tool Breadth by Category
        </p>
        <BreadthBars />
      </div>
      <div>
        <p className="font-mono text-[0.6rem] tracking-widest text-[var(--text-subtle)] uppercase mb-2 text-center">
          Category Overview
        </p>
        <RadarChart />
      </div>
    </div>
  );
}