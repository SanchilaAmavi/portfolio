"use client";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, ChevronDown, Download } from "lucide-react";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

const roles = [
  "AI Systems Engineer",
  "IoT Architect",
  "Embedded Systems Developer",
  "Full-Stack Builder",
];

/** Animated counter that counts from 0 to target */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(timer); }
          else setVal(start);
        }, 40);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fade, setFade]       = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length);
        setFade(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const delay = (ms: number) =>
    `transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center pt-20 pb-10">

      {/* ── Ambient background orbs ── */}
      <div className="blob w-[520px] h-[520px] bg-[var(--accent)]/[0.055] -top-40 -left-40 pointer-events-none" />
      <div className="blob w-72 h-72 bg-[var(--violet)]/[0.06] top-32 right-24 pointer-events-none" />
      <div className="blob w-48 h-48 bg-[var(--green)]/[0.05] bottom-20 left-1/3 pointer-events-none" />
      
      {/* ── Grid texture overlay ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "linear-gradient(rgba(56,189,248,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px"
        }}
      />

      {/* ── Full-bleed hero image ── */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[52%] z-[2]">
        <Image
          src="/images/profile.jpg"
          alt={personalInfo.name}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        {/* Gradient blend left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/72 via-[26%] to-transparent to-[72%]" />
        {/* Top navbar fade */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[var(--bg)] to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[var(--bg)] to-transparent" />
        {/* Mobile solid cover */}
        <div className="absolute inset-0 bg-[var(--bg)]/82 lg:hidden" />

        <div className="hidden lg:block absolute -bottom-20 -right-20 w-40 h-40 rounded-full border border-[var(--accent)]/[0.03] opacity-10 animate-spin-slow pointer-events-none" />
        <div className="hidden lg:block absolute bottom-24 right-24 w-12 h-12 rounded-full border border-[var(--violet)]/20 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "8s" }} />

      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-[640px]">

          {/* Eyebrow — identity-first: leads with what you build, not just the degree */}
          <div className={`flex flex-col gap-1.5 mb-5 transition-all duration-700 delay-[0ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gradient-to-r from-[var(--green)] to-[var(--accent)]" />
              <span className="font-mono text-[0.65rem] tracking-[0.22em] text-[var(--green)] uppercase">
                Building Autonomous Robots &amp; Embedded Systems
              </span>
            </div>
            <div className="flex items-center gap-3 pl-11">
              <span className="font-mono text-[0.6rem] tracking-[0.16em] text-[var(--text-subtle)] uppercase">
                Electronics &amp; Telecom Engineering · KDU · Intake 41
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className={`transition-all duration-700 delay-[100ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="leading-[0.93] tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
              <span className="block text-[clamp(2.6rem,5vw,4.4rem)] font-extrabold text-[var(--text)]">
                ENGINEERING
              </span>
              {/* Outlined / ghost text */}
              <span className="block text-[clamp(2.6rem,5vw,4.4rem)] font-extrabold select-none"
                style={{
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.15)",
                  color: "transparent",
                  letterSpacing: "-0.01em",
                }}>
                INTELLIGENT
              </span>
              {/* Gradient line with accent dot */}
              <span className="inline-flex items-baseline gap-3">
                <span className="block text-[clamp(2.6rem,5vw,4.4rem)] font-extrabold gradient-text">
                  SYSTEMS
                </span>
                <span className="w-3 h-3 rounded-full bg-[var(--green)] mb-2 animate-pulse-dot flex-shrink-0" />
              </span>
            </h1>
          </div>

          {/* Name + rotating role */}
          <div className={`mt-6 transition-all duration-700 delay-[200ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-lg font-bold text-[var(--text)] mb-1.5 tracking-wide">
              {personalInfo.shortName}
            </p>
            {/* Typewriter role line */}
            <div className="flex items-center gap-2 h-7">
              <span className="text-[var(--accent)] font-mono text-sm font-bold">›</span>
              <span
                className="text-[var(--text-muted)] font-mono text-sm transition-all duration-300"
                style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(6px)" }}
              >
                {roles[roleIdx]}
              </span>
              <span className="w-[2px] h-4 bg-[var(--accent)] ml-0.5 rounded-full"
                style={{ animation: "typewriter-cursor 1s ease-in-out infinite" }} />
            </div>
          </div>

          {/* Bio */}
          <div className={`mt-4 transition-all duration-700 delay-[300ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-[var(--text-muted)] leading-relaxed text-[0.92rem] max-w-lg">
              Bridging the gap between{" "}
              <span className="text-[var(--text)] font-semibold">embedded hardware</span>{" "}
              and{" "}
              <span className="text-[var(--text)] font-semibold">intelligent software</span>.
              Currently pursuing{" "}
              <span className="text-[var(--accent)]">Electronic &amp; Telecommunication Engineering</span>{" "}
              at{" "}
              <a href="https://www.kdu.ac.lk" target="_blank" rel="noopener noreferrer"
                className="text-[var(--accent)] underline underline-offset-2 decoration-[var(--accent)]/35 hover:decoration-[var(--accent)] transition-colors">KDU</a>,
              building systems that span PCB to production — from firmware and AI inference
              to cloud pipelines and mobile apps.
            </p>
            <p className="font-mono text-[0.67rem] text-[var(--text-subtle)] mt-2.5 leading-relaxed">
              B.Sc. (Hons) Electronic and Telecommunication Engineering<br />
              General Sir John Kotelawala Defence University
            </p>
          </div>

          {/* CTAs */}
          <div className={`mt-7 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-[400ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="#featured" className="btn-primary text-[0.84rem] px-5 py-2.5">
              View Work
            </a>
            <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-[0.84rem] px-5 py-2.5">
              <Download size={13} />
              Resume
            </a>
            <span className="w-px h-6 bg-[var(--border)] mx-1 hidden sm:block" />
            <div className="flex items-center gap-4">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-subtle)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/8 transition-all duration-200"
                aria-label="GitHub">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-subtle)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/8 transition-all duration-200"
                aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Animated stat strip */}
          <div className={`mt-10 flex items-center gap-8 transition-all duration-700 delay-[500ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[
              { value: 6, suffix: "+", label: "Projects" },
              { value: 9, suffix: "+", label: "Awards" },
              { value: 7, suffix: "",  label: "Certs" },
            ].map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-[var(--text)] font-mono leading-none stat-num"
                  style={{ animationDelay: `${i * 120}ms` }}>
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[0.63rem] text-[var(--text-subtle)] mt-1 tracking-widest uppercase font-mono">{s.label}</div>
              </div>
            ))}
            {/* Decorative separator */}
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-hover)]/40 to-transparent hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors z-20 group">
        <span className="font-mono text-[0.52rem] tracking-[0.35em] uppercase group-hover:text-[var(--accent)] transition-colors">Scroll</span>
        <ChevronDown size={13} className="animate-bounce-gentle" />
      </a>
    </section>
  );
}