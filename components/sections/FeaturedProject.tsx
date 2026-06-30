"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Github, ArrowUpRight, Cpu, Zap } from "lucide-react";
import { TiltCard } from "@/components/Magnetic";

/** Pulls the Mars Robot entry straight from lib/data.ts — single source of truth. */
const featured = projects.find((p) => p.title === "Mars Robot");

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

export default function FeaturedProject() {
  if (!featured) return null;

  // Derived, factual stats — counted directly from the data you already have,
  // not invented numbers.
  const sensorCount = featured.highlights.filter((h) =>
    /sensor|ir|ultrasonic|gyro|colour|color/i.test(h)
  ).length || featured.tags.filter((t) => /IR|Ultrasonic|MPU|TCS/i.test(t)).length;

  return (
    <section id="featured" className="py-24 relative overflow-hidden">
      <div className="blob w-96 h-96 bg-[var(--green)]/[0.06] -top-20 left-1/4" />
      <div className="blob w-72 h-72 bg-[var(--accent)]/[0.06] bottom-0 right-0" />

      {/* Faint PCB-trace texture, scoped to this section only */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        preserveAspectRatio="none"
      >
        <pattern id="pcb-trace" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M0 60 H40 V20 H120 M60 0 V40 H120" stroke="var(--accent)" strokeWidth="1" fill="none" />
          <circle cx="40" cy="20" r="2.5" fill="var(--accent)" />
          <circle cx="60" cy="40" r="2.5" fill="var(--violet)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#pcb-trace)" />
      </svg>

      <div className="section-inner relative z-10">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="eyebrow">Featured Project</span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
              {featured.title} <span className="gradient-text">{featured.subtitle?.split(" ")[0]}</span>
            </h2>
          </div>
          <span className="font-mono text-[0.65rem] tracking-widest text-[var(--text-subtle)] uppercase">
            {featured.category} · {featured.year}
          </span>
        </div>

        <TiltCard max={4}>
          <div className="card tilt circuit-corners grid lg:grid-cols-2 gap-0 overflow-hidden">

            {/* Image side */}
            <div className="relative min-h-[280px] lg:min-h-[440px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent lg:bg-gradient-to-r" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="live-dot" />
                <span className="font-mono text-[0.6rem] tracking-widest text-[var(--text)] bg-[var(--bg)]/60 backdrop-blur px-2 py-1 rounded-full uppercase">
                  {featured.status}
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="p-7 lg:p-10 flex flex-col justify-center">
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                {featured.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-7">
                {featured.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Zap size={13} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-[var(--text)] leading-snug">{h}</span>
                  </div>
                ))}
              </div>

              {/* Derived stat strip — counted from real data above, not invented */}
              <div className="grid grid-cols-3 gap-4 mb-7 pb-7 border-b border-[var(--border)]">
                <div>
                  <p className="text-xl font-extrabold text-[var(--text)] font-mono">
                    <CountUp target={featured.tags.length} suffix="" />
                  </p>
                  <p className="font-mono text-[0.55rem] text-[var(--text-subtle)] tracking-widest uppercase mt-0.5">Technologies</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-[var(--text)] font-mono">
                    <CountUp target={featured.highlights.length} suffix="" />
                  </p>
                  <p className="font-mono text-[0.55rem] text-[var(--text-subtle)] tracking-widest uppercase mt-0.5">Core Systems</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-[var(--text)] font-mono">{featured.year}</p>
                  <p className="font-mono text-[0.55rem] text-[var(--text-subtle)] tracking-widest uppercase mt-0.5">Built</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-7">
                {featured.tags.map((t) => (
                  <span key={t} className="tag tag-accent flex items-center gap-1">
                    <Cpu size={10} /> {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-[0.8rem] px-4 py-2.5"
                >
                  <Github size={14} /> View Repository
                </a>
                <a href="#projects" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover-underline">
                  See all projects <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}