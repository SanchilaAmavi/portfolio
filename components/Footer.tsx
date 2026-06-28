import { personalInfo } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-2)] py-10">
      <div className="section-inner">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">{personalInfo.shortName}</p>
            <p className="font-mono text-[0.62rem] text-[var(--text-subtle)] mt-0.5 tracking-wide">
              Electronic &amp; Telecommunication Engineer · KDU
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-5">
            {["About", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-[0.65rem] tracking-widest text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors uppercase"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
              className="text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={`mailto:${personalInfo.email}`}
              className="text-[var(--text-subtle)] hover:text-[var(--accent)] transition-colors" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[0.6rem] text-[var(--text-subtle)]">
            © {year} {personalInfo.shortName} · All rights reserved.
          </p>
          <p className="font-mono text-[0.6rem] text-[var(--text-subtle)]">
            Built with Next.js · Tailwind CSS · TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}