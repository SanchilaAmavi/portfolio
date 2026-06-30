"use client";
import { useState } from "react";
import { skills, personalInfo } from "@/lib/data";
import { Brain, Cpu, Globe, Code, BarChart2, Wrench, ArrowUpRight } from "lucide-react";
import SkillsChart from "@/components/SkillsChart";

const iconMap: Record<string, React.ElementType> = {
  Brain, Cpu, Globe, Code, BarChart2, Wrench,
};

const descriptions: Record<string, string> = {
  "AI / ML & Vision":
    "Training, fine-tuning, and deploying computer vision and deep learning models for real-world safety and monitoring applications.",
  "Embedded Systems & IoT":
    "Designing custom PCBs, writing embedded firmware, and building multi-node wireless sensor networks with LoRa and GSM.",
  "Mobile, Web & Cloud":
    "Building Flutter mobile apps, React/Next.js dashboards, and FastAPI backends connected to Firebase cloud infrastructure.",
  "Programming Languages":
    "Python for ML/AI, C/C++ for embedded systems, Dart for cross-platform apps, JavaScript for web frontends.",
  "Data & Analysis":
    "Processing sensor telemetry, visualizing engineering datasets, and performing statistical analysis for research.",
  "Design & Tools":
    "PCB schematic and layout in EasyEDA, mechanical design in SolidWorks, and the complete hardware/software toolchain.",
};

export default function Skills() {
  const [active, setActive] = useState(0);
  const activeSkill = skills[active];
  const Icon = iconMap[activeSkill.icon] || Cpu;

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="blob w-72 h-72 bg-[var(--green)]/[0.07] top-0 right-0" />

      <div className="section-inner">
        {/* Heading */}
        <div className="mb-14 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="eyebrow">04 / Skills</span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
              What I <span className="gradient-text">Work With</span>
            </h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl text-sm">
              Tools and technologies across the full stack — from silicon to cloud.
            </p>
          </div>
          {/* "See more" — sends recruiters to GitHub for full, generic, always-current view */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover-underline flex-shrink-0"
          >
            See more on GitHub <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Category list */}
          <div className="space-y-1.5">
            {skills.map((s, i) => {
              const Ico = iconMap[s.icon] || Cpu;
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all border ${
                    isActive
                      ? "bg-[var(--accent)]/8 border-[var(--accent)]/25 text-[var(--accent)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] border-transparent"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive ? "bg-[var(--accent)]/15" : "bg-[var(--surface)]"
                  }`}>
                    <Ico size={14} />
                  </div>
                  <span className="text-xs font-medium">{s.category}</span>
                  <span className="ml-auto font-mono text-[0.6rem] opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skill detail panel */}
          <div className="md:col-span-2 card p-7 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text)]">{activeSkill.category}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  {descriptions[activeSkill.category] || ""}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeSkill.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text)] hover:border-[var(--border-hover)] hover:text-[var(--accent)] transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Footer strip */}
            <div className="pt-2 border-t border-[var(--border)] flex items-center gap-5 font-mono text-[0.62rem] text-[var(--text-subtle)]">
              <span>{activeSkill.items.length} tools</span>
              <span>·</span>
              <span>Category {String(active + 1).padStart(2, "0")} of {skills.length}</span>
            </div>
          </div>
        </div>

        {/* Skills chart — breadth bars + radar, computed from real data */}
        <div className="mt-12">
          <SkillsChart />
        </div>

        {/* Full skill cloud */}
        <div className="mt-16 pt-10 border-t border-[var(--border)]">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <p className="font-mono text-[0.62rem] text-[var(--text-subtle)] tracking-widest uppercase">All Skills at a Glance</p>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors"
            >
              View repos <ArrowUpRight size={11} />
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills
              .flatMap((s) => s.items)
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[0.68rem] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--border-hover)] transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}