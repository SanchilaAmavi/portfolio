"use client";
import { useState, useEffect, useRef } from "react";
import { projects, leadership, skills, achievements } from "@/lib/data";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.max(1, Math.ceil(target / 30));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(timer); }
            else setVal(start);
          }, 35);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/**
 * All four numbers below are DERIVED from lib/data.ts at build time —
 * nothing is hardcoded, so this never drifts out of sync as you add
 * projects, roles, or skills.
 */
function computeStats() {
  const projectCount = projects.length;

  const robotticsCompetitions = projects.filter(
    (p) => p.category === "Robotics"
  ).length + achievements.filter(
    (a) => a.type === "Participant" && /robot|rosco|mars/i.test(a.title + a.event)
  ).length;

  const leadershipCount = leadership.length;

  const uniqueTech = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => uniqueTech.add(t)));
  skills.forEach((s) => s.items.forEach((i) => uniqueTech.add(i)));

  return [
    { value: projectCount,            suffix: "+", label: "Engineering Projects" },
    { value: robotticsCompetitions,   suffix: "+", label: "Robotics Competitions" },
    { value: leadershipCount,         suffix: "",  label: "Leadership Roles" },
    { value: uniqueTech.size,         suffix: "+", label: "Technologies Used" },
  ];
}

export default function StatsStrip({ className = "" }: { className?: string }) {
  const stats = computeStats();

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((s, i) => (
        <div key={s.label} className="text-center md:text-left">
          <p
            className="text-3xl md:text-4xl font-extrabold text-[var(--text)] font-mono leading-none stat-num"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CountUp target={s.value} suffix={s.suffix} />
          </p>
          <p className="font-mono text-[0.62rem] text-[var(--text-subtle)] mt-1.5 tracking-widest uppercase">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}