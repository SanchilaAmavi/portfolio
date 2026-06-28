
"use client";
import { useState, useEffect } from "react";
import { Github, Linkedin, ChevronDown, Download } from "lucide-react";
import { personalInfo } from "@/lib/data";
import Image from "next/image";

const roles = [
  "AI Systems Engineer",
  "IoT Architect",
  "Embedded Systems Developer",
  "Full-Stack Builder",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fade, setFade]       = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setRoleIdx((i) => (i + 1) % roles.length); setFade(true); }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center pt-20 pb-10">

      {/* ── Full-bleed photo, right side ── */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[52%]">
        <Image
          src="/images/profile.jpg"
          alt={personalInfo.name}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        {/* Gradient blending photo into dark background on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/70 via-[28%] to-transparent to-[75%]" />
        {/* Top fade so it tucks under navbar cleanly */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--bg)] to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
        {/* Solid cover on mobile/tablet so photo doesn't fight with stacked text */}
        <div className="absolute inset-0 bg-[var(--bg)]/80 lg:hidden" />
      </div>

      {/* ── Ambient blobs ── */}
      <div className="blob w-[420px] h-[420px] bg-[var(--accent)]/[0.06] -top-32 -left-32 pointer-events-none" />

      {/* ── Grid texture ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "linear-gradient(rgba(56,189,248,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.02) 1px, transparent 1px)",
          backgroundSize: "72px 72px"
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-[640px]">

          {/* Eyebrow */}
          <div className={`flex items-center gap-3 mb-5 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="w-7 h-px bg-[var(--green)]" />
            <span className="font-mono text-[0.66rem] tracking-[0.2em] text-[var(--green)] uppercase">
              Electronic &amp; Telecom Engineering
            </span>
            <span className="text-[var(--text-subtle)] text-xs hidden sm:inline">•</span>
            <span className="font-mono text-[0.66rem] tracking-[0.16em] text-[var(--text-subtle)] uppercase hidden sm:inline">
              KDU · Intake 41
            </span>
          </div>

          {/* Headline */}
          <div className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="leading-[0.95] tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
              <span className="block text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold text-[var(--text)]">
                ENGINEERING
              </span>
              <span className="block text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)", color: "transparent" }}>
                INTELLIGENT
              </span>
              <span className="inline-flex items-baseline gap-3">
                <span className="block text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold text-[var(--text)]">
                  SYSTEMS
                </span>
                <span className="w-3 h-3 rounded-full bg-[var(--green)] mb-1.5" />
              </span>
            </h1>
          </div>

          {/* Name + rotating role */}
          <div className={`mt-5 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-lg font-semibold text-[var(--text)] mb-1">{personalInfo.shortName}</p>
            <div className="flex items-center gap-2 h-6">
              <span className="text-[var(--accent)] font-mono text-sm">_</span>
              <span className={`text-[var(--text-muted)] font-mono text-sm transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
                {roles[roleIdx]}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className={`mt-4 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-[var(--text-muted)] leading-relaxed text-[0.92rem] max-w-lg">
              Bridging the gap between{" "}
              <span className="text-[var(--text)] font-semibold">embedded hardware</span>{" "}
              and{" "}
              <span className="text-[var(--text)] font-semibold">intelligent software</span>.
              Currently pursuing{" "}
              <span className="text-[var(--accent)]">Electronic &amp; Telecommunication Engineering</span>{" "}
              at{" "}
              <a href="https://www.kdu.ac.lk" target="_blank" rel="noopener noreferrer"
                className="text-[var(--accent)] underline underline-offset-2 decoration-[var(--accent)]/40 hover:decoration-[var(--accent)] transition-colors">KDU</a>,
              building systems that span PCB to production — from PCB design and firmware
              to AI inference, cloud pipelines, and mobile apps.
            </p>
            <p className="font-mono text-[0.68rem] text-[var(--text-subtle)] mt-2.5 leading-relaxed">
              B.Sc. (Hons) Electronic and Telecommunication Engineering<br />
              General Sir John Kotelawala Defence University
            </p>
          </div>

          {/* CTAs */}
          <div className={`mt-7 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-[400ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <a href="#projects" className="btn-primary text-[0.84rem] px-5 py-2.5">
              View Work
            </a>
            <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer" className="btn-outline text-[0.84rem] px-5 py-2.5">
              <Download size={13} />
              Resume
            </a>
            <span className="w-px h-6 bg-[var(--border)] mx-1" />
            <div className="flex items-center gap-3.5">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors" aria-label="GitHub">
                <Github size={17} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors" aria-label="LinkedIn">
                <Linkedin size={17} />
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div className={`mt-9 flex items-center gap-8 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {personalInfo.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-[var(--text)] font-mono leading-none">{s.value}</div>
                <div className="text-[0.66rem] text-[var(--text-subtle)] mt-1 tracking-wide uppercase font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors z-20">
        <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={13} className="animate-bounce" />
      </a>
    </section>
  );
}