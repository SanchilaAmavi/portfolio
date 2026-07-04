"use client";
import { useState } from "react";
import { education, coursework, leadership } from "@/lib/data";

const tabs = [
  { key: "overview",    label: "Overview",    icon: "◈" },
  { key: "education",   label: "Education",   icon: "◎" },
  { key: "leadership",  label: "Leadership",  icon: "◆" },
  { key: "courses",     label: "Coursework",  icon: "◉" },
];

const infoGrid = [
  { label: "University", value: "KDU",               full: "General Sir John Kotelawala Defence University" },
  { label: "Degree",     value: "BSc. (Hons) Electronic & Telecommunication Engineering",    full: "BSc. (Hons) Electronic & Telecommunication Engineering" },
  { label: "started",     value: "Feb 2024",            full: "41st Intake" },
  { label: "Focus",      value: "AI · IoT · Robotics", full: null },
  { label: "Location",   value: "Sri Lanka ",      full: null },
];

const skillClusters = [
  { label: "Hardware",   tags: ["ESP32 / ESP32-S3", "Arduino", "LoRa (SX1278)", "GSM (SIM800L)", "PCB Design"] },
{ label: "AI / ML",    tags: ["PyTorch", "TensorFlow", "OpenCV", "YOLOv8", "MediaPipe"] },
{ label: "Full-Stack", tags: ["Flutter", "React.js", "FastAPI", "Firebase", "Docker"] },
];

function EduIcon({ institution }: { institution: string }) {
  const lower = institution.toLowerCase();
  const isSchool = lower.includes("vidyalaya") || lower.includes("school") || lower.includes("college");
  return (
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border ${
      isSchool ? "bg-[var(--violet)]/10 border-[var(--violet)]/25" : "bg-[var(--accent)]/10 border-[var(--accent)]/25"
    }`}>
      {isSchool ? "🏫" : "🎓"}
    </div>
  );
}

export default function About() {
  const [tab, setTab] = useState("overview");

  return (
    <section id="about" className="py-28 px-6 section-pro-background animate-fade-up relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="blob w-[32rem] h-[32rem] bg-[var(--violet)]/[0.06] bottom-0 right-0" />
      <div className="blob w-80 h-80 bg-[var(--accent)]/[0.05] top-10 -left-24" />

      <div className="section-inner relative z-10">

        {/* ── HEADER ROW ─────────────────────────────────────────────── */}
        <div className="mb-8">
          <span className="eyebrow">02 / About Me</span>
          <h2
            className="text-[1.6rem] md:text-[2.4rem] font-extrabold leading-[1.1] tracking-tight mt-3"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-[var(--text)]">Building intelligent systems</span>{" "}
            <span className="text-[var(--text-muted)]">where</span>{" "}
            <span className="relative inline-block">
              <span className="gradient-text">software meets hardware.</span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[var(--accent)] via-[var(--violet)] to-transparent rounded-full" />
            </span>
          </h2>
        </div>

        {/* ── TAB BAR ────────────────────────────────────────────────── */}
        <div
          className="inline-flex items-center gap-1 p-1 rounded-2xl border border-[var(--border)] mb-7"
          style={{ background: "var(--surface)" }}
          role="tablist"
        >
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                tab === key ? "text-[var(--text)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
              style={tab === key ? {
                background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--violet) 12%, transparent))",
                boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
              } : {}}
            >
              <span className={`text-[0.58rem] ${tab === key ? "text-[var(--accent)]" : "text-[var(--text-subtle)]"}`}>
                {icon}
              </span>
              {label}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ────────────────────────────────────────────── */}
        <div className="min-h-[26rem]">

          {/* ─── OVERVIEW ──────────────────────────────────────────── */}
          {tab === "overview" && (
            <div className="animate-fade-in">

              {/* Two-column: left=bio+skills, right=info cards */}
              <div className="grid md:grid-cols-[1fr_220px] gap-8 items-start">

                {/* LEFT COLUMN */}
                <div className="space-y-6">

                  {/* Bio */}
                  <p className="text-[var(--text-muted)] leading-relaxed text-sm md:text-[0.95rem] max-w-xl">
                    ETE undergraduate at{" "}
                    <span className="text-[var(--text)] font-semibold">
                      General Sir John Kotelawala Defence University
                    </span>
                    , focused on building end-to-end intelligent systems - from PCB layout and
                    embedded firmware to cloud backends and polished interfaces.
                    My work targets safety-critical and assistive technology challenges.
                  </p>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-[var(--border)] via-[var(--accent)]/20 to-transparent" />

                  {/* Skill clusters */}
                  <div>
                    <p className="font-mono text-[0.58rem] tracking-[0.2em] text-[var(--text-subtle)] uppercase mb-3">
                      Technical Stack
                    </p>
                    <div className="space-y-2.5">
                      {skillClusters.map((cluster) => (
                        <div key={cluster.label} className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[0.58rem] text-[var(--text-subtle)] tracking-widest uppercase w-[4.5rem] flex-shrink-0">
                            {cluster.label}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {cluster.tags.map((t) => (
                              <span
                                key={t}
                                className="tag hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-colors cursor-default"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick stat strip */}
                  <div className="flex items-center gap-5 pt-1">
                    {[
                      { n: "10+",  label: "Projects" },
                      { n: "10+",  label: "Awards" },
                      { n: "10+",   label: "Certs" },
                    ].map(({ n, label }) => (
                      <div key={label} className="text-center">
                        <p className="text-xl font-extrabold text-[var(--text)]" style={{ fontFamily: "Syne, sans-serif" }}>{n}</p>
                        <p className="font-mono text-[0.55rem] text-[var(--text-subtle)] tracking-widest uppercase mt-0.5">{label}</p>
                      </div>
                    ))}
                    <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
                  </div>
                </div>

                {/* RIGHT COLUMN — info cards */}
                <div className="flex flex-col gap-2">
                  {infoGrid.map((item) => (
                    <div
                      key={item.label}
                      className="card px-4 py-3 hover:border-[var(--border-hover)] transition-all duration-200 cursor-default group"
                      title={item.full ?? undefined}
                    >
                      <p className="font-mono text-[0.5rem] text-[var(--text-subtle)] tracking-[0.18em] uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="text-[0.72rem] font-semibold text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* ─── EDUCATION ─────────────────────────────────────────── */}
          {tab === "education" && (
            <div className="animate-fade-in max-w-3xl space-y-3">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="card p-5 flex items-start gap-4 hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-200"
                >
                  <EduIcon institution={edu.institution} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <h3 className="text-sm font-bold text-[var(--text)] leading-snug">{edu.institution}</h3>
                      <span className="font-mono text-[0.62rem] text-[var(--text-subtle)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-2.5 py-0.5 flex-shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{edu.degree}</p>
                    {edu.detail && <span className="tag tag-accent mt-2.5 inline-block">{edu.detail}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── LEADERSHIP ────────────────────────────────────────── */}
          {tab === "leadership" && (
            <div className="animate-fade-in max-w-3xl">
              <div className="relative pl-8">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/60 via-[var(--violet)]/40 to-transparent" />
                <div className="space-y-3">
                  {leadership.map((l, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-[1.35rem] top-5 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] transition-all duration-200 group-hover:bg-[var(--accent)] group-hover:scale-125" />
                      <div className="card p-4 hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-200">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <p className="font-bold text-sm text-[var(--text)]">{l.role}</p>
                            <p className="text-[var(--text-muted)] text-xs mt-0.5">{l.org}</p>
                          </div>
                          <span className="font-mono text-[0.6rem] text-[var(--text-subtle)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-2.5 py-0.5 flex-shrink-0">
                            {l.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {leadership.length < 4 && (
                <div className="mt-5 rounded-2xl border border-dashed border-[var(--border)] px-6 py-4 text-center">
                  <p className="text-[var(--text-subtle)] text-xs font-mono tracking-wide">More roles coming soon</p>
                </div>
              )}
            </div>
          )}

          {/* ─── COURSEWORK ────────────────────────────────────────── */}
          {tab === "courses" && (
            <div className="animate-fade-in max-w-3xl">
              <p className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--text-subtle)] uppercase mb-4">
                Key Modules · Undergraduate Curriculum
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {coursework.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-2.5 hover:border-[var(--border-hover)] transition-all duration-150"
                  >
                    <span className="font-mono text-[0.52rem] text-[var(--accent)]/50 w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[var(--text)] text-xs leading-snug">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
        {/* end tab content */}

      </div>
    </section>
  );
}
