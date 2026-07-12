"use client";
import { useState, useEffect } from "react";
import { personalInfo } from "@/lib/data";
import { Menu, X, Download } from "lucide-react";

const navItems = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Projects",     href: "#projects" },
  { label: "Skills",       href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [progress,      setProgress]      = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0);

      const sections = Array.from(document.querySelectorAll("section[id]"));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement;
        if (window.scrollY >= el.offsetTop - 140) {
          setActiveSection(el.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll progress rail — signal-strength style indicator across the top */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080b10]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-6 flex items-center h-[68px]">

          {/* Brand */}
          <button onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <div className="circuit-corners w-9 h-9 rounded-xl overflow-hidden border border-[var(--accent)]/30 bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/10 ring-offset-1 ring-offset-[var(--bg)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span
                className="text-[var(--accent)] font-extrabold text-[0.72rem] leading-none select-none"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {personalInfo.initials}
              </span>
            </div>
            <span className="hidden sm:block text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors font-[Space_Grotesk]">
              {personalInfo.shortName}
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 mx-auto">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    data-active={isActive}
                    className={`underline-draw focus-ring-pro relative px-4 py-2 text-[0.72rem] font-medium tracking-wide rounded-lg transition-all ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-[var(--accent)]/8 rounded-lg border border-[var(--accent)]/20 animate-scale-in" />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Resume CTA */}
          <a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift focus-ring-pro hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] text-[0.72rem] font-semibold hover:bg-[var(--accent)]/10 transition-all ml-auto font-mono"
          >
            <Download size={12} />
            Resume
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[var(--text-muted)] hover:text-[var(--text)] ml-auto p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#080b10]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-5 md:hidden">
          {/* Decorative cross-hair */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }}
          />
          {navItems.map((item, i) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="animate-fade-up text-3xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors relative z-10"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {item.label}
            </button>
          ))}
          <a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-4 flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all font-mono text-sm"
          >
            <Download size={14} />
            Resume
          </a>
        </div>
      )}
    </>
  );
}