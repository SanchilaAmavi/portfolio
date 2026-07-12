"use client";
import { useState } from "react";
import { personalInfo } from "@/lib/data";
import { Mail, Github, Linkedin, Phone, MapPin, Send, CheckCircle, Download } from "lucide-react";
import ConstellationBG from "@/components/ConstellationBG";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(`Hi Sanchila,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-28 px-6 section-pro-background animate-fade-in relative overflow-hidden">
      {/* Animated constellation network background */}
      <ConstellationBG density={36} />

      <div className="blob w-72 h-72 bg-[var(--violet)]/[0.08] top-0 right-0" />

      <div className="section-inner">
        {/* Heading */}
        <div className="mb-14">
          <span className="eyebrow">06 / Contact</span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-3 max-w-xl text-sm">
            Open to internships, collaborations, and engineering-focused conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* ── Info column ── */}
          <div className="space-y-6 animate-slide-right">
            <div className="card circuit-corners p-7 space-y-6">
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                Let&apos;s build something precise, useful, and a little ambitious. Whether it&apos;s
                embedded systems, AI applications, IoT pipelines, or collaborative research — I&apos;m
                always interested in meaningful engineering conversations.
              </p>

              <div className="space-y-3">
                <a href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--border-hover)] transition-colors">
                    <Mail size={14} />
                  </div>
                  {personalInfo.email}
                </a>
                <a href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--border-hover)] transition-colors">
                    <Phone size={14} />
                  </div>
                  {personalInfo.phone}
                </a>
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                    <MapPin size={14} />
                  </div>
                  {personalInfo.location}
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-2 gap-3">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="card p-4 flex items-center gap-3 hover:border-[var(--border-hover)] transition-colors">
                <Github size={16} className="text-[var(--accent)]" />
                <div>
                  <p className="font-mono text-[0.58rem] text-[var(--text-subtle)] uppercase">GitHub</p>
                  <p className="text-xs font-semibold text-[var(--text)] mt-0.5">sanchila-amavi</p>
                </div>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="card p-4 flex items-center gap-3 hover:border-[var(--border-hover)] transition-colors">
                <Linkedin size={16} className="text-[var(--accent)]" />
                <div>
                  <p className="font-mono text-[0.58rem] text-[var(--text-subtle)] uppercase">LinkedIn</p>
                  <p className="text-xs font-semibold text-[var(--text)] mt-0.5">sanchila-amavi</p>
                </div>
              </a>
            </div>

            {/* Resume */}
            <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer"
              className="block card p-5 hover:border-[var(--border-hover)] transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[0.62rem] text-[var(--accent)] tracking-widest uppercase mb-1">Resume</p>
                  <p className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    Download CV / Resume →
                  </p>
                  <p className="font-mono text-[0.62rem] text-[var(--text-subtle)] mt-1">PDF · Updated 2026</p>
                </div>
                <Download size={18} className="text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          </div>

          {/* ── Contact form ── */}
          <form onSubmit={handleSubmit} className="card circuit-corners p-7 space-y-5 animate-slide-left">
            <h3 className="font-semibold text-[var(--text)] text-base">Send a message</h3>

            {[
              { key: "name",    label: "NAME",    type: "text",  ph: "Your name" },
              { key: "email",   label: "EMAIL",   type: "email", ph: "your@email.com" },
            ].map(({ key, label, type, ph }) => (
              <div key={key} className="space-y-1.5">
                <label className="font-mono text-[0.6rem] text-[var(--text-subtle)] tracking-widest uppercase">{label}</label>
                <input
                  type={type}
                  required
                  value={form[key as "name" | "email"]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={ph}
                  className="focus-ring-pro w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
                />
              </div>
            ))}

            <div className="space-y-1.5">
              <label className="font-mono text-[0.6rem] text-[var(--text-subtle)] tracking-widest uppercase">MESSAGE</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or opportunity..."
                className="focus-ring-pro w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className={`btn-lift w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                sent
                  ? "bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30 animate-scale-in"
                  : "bg-[var(--accent)] text-[#000] hover:bg-[var(--accent)]/90 hover:shadow-lg hover:shadow-[var(--accent)]/25 font-bold"
              }`}
            >
              {sent ? (
                <><CheckCircle size={14} className="animate-scale-in" /> Opening mail client…</>
              ) : (
                <><Send size={14} /> Send Message</>
              )}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}