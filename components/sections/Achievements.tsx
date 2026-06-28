"use client";
import { useCallback, useEffect, useState } from "react";
import { achievements, certifications } from "@/lib/data";
import {
  Trophy,
  BookMarked,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  ImageIcon,
  Crosshair,
  Award,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

const AUTO_ADVANCE_MS = 3000;

type Item = {
  title: string;
  image?: string | null;
  images?: string[];
  [key: string]: any;
};

function getImages(item: Item): string[] {
  if (item.images && item.images.length > 0) return item.images;
  if (item.image) return [item.image];
  return [];
}

type LightboxState = { images: string[]; index: number } | null;

// ─── Achievement summary stats derived from data ──────────────────────────────
function buildStats(list: any[]) {
  const winners    = list.filter((a) => a.type === "Winner").length;
  const awards     = list.filter((a) => a.type === "Award").length;
  const participants = list.filter((a) => a.type === "Participant").length;
  const total      = list.length;
  return { winners, awards, participants, total };
}

export default function Achievements() {
  const [index, setIndex]   = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const total = achievements.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [next, paused]);

  const card = (offset: number) => achievements[(index + offset + total) % total];

  const openLightbox = (images: string[], startAt = 0) => {
    if (images.length === 0) return;
    setLightbox({ images, index: startAt });
  };
  const lightboxNext = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb));
  const lightboxPrev = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : lb
    );

  const stats = buildStats(achievements);

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="blob w-80 h-80 bg-[var(--amber)]/[0.05] bottom-0 left-0" />

      <div className="section-inner">

        {/* ── Section heading ── */}
        <div className="mb-10">
          <span className="eyebrow">05 / Recognition</span>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight mt-2"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Achievements &amp; <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-3 max-w-xl text-sm">
            Competition results, sporting honours, and professional certifications
            from my engineering and athletic journey.
          </p>
        </div>

        {/* ── Achievement summary stats strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            {
              icon: <Trophy size={16} className="text-[var(--amber)]" />,
              label: "Championship Wins",
              value: stats.winners,
              bg: "bg-[var(--amber)]/[0.06]",
              border: "border-[var(--amber)]/20",
            },
            {
              icon: <Award size={16} className="text-[var(--accent)]" />,
              label: "Awards & Honours",
              value: stats.awards,
              bg: "bg-[var(--accent)]/[0.06]",
              border: "border-[var(--accent)]/20",
            },
            {
              icon: <Users size={16} className="text-[var(--violet)]" />,
              label: "Competitions",
              value: stats.participants,
              bg: "bg-[var(--violet)]/[0.06]",
              border: "border-[var(--violet)]/20",
            },
            {
              icon: <Star size={16} className="text-[var(--text-muted)]" />,
              label: "Total Recognitions",
              value: stats.total,
              bg: "bg-[var(--surface)]",
              border: "border-[var(--border)]",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`flex flex-col gap-2 p-4 rounded-2xl border ${s.bg} ${s.border}`}
            >
              <div className="flex items-center gap-2">
                {s.icon}
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-[var(--text-subtle)]">
                  {s.label}
                </span>
              </div>
              <p
                className="text-3xl font-extrabold text-[var(--text)]"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Achievements carousel label ── */}
        <div className="flex items-center gap-2 mb-5">
          <Trophy size={14} className="text-[var(--amber)]" />
          <h3 className="font-mono text-[0.65rem] text-[var(--amber)] uppercase tracking-widest">
            Selected highlights
          </h3>
        </div>

        {/* ── Carousel ── */}
        <div
          className="relative flex items-center justify-center gap-3 md:gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            onClick={prev}
            aria-label="Previous achievement"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border
                       border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]
                       hover:border-[var(--border-hover)] transition-colors shrink-0 z-10"
          >
            <ChevronLeft size={16} />
          </button>

          <SidePeek achievement={card(-1)} onClick={prev} />
          <MainCard achievement={card(0)} onView={openLightbox} />
          <SidePeek achievement={card(1)} onClick={next} />

          <button
            onClick={next}
            aria-label="Next achievement"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border
                       border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]
                       hover:border-[var(--border-hover)] transition-colors shrink-0 z-10"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-5 mb-16">
          {achievements.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-[var(--border)]"
              }`}
            />
          ))}
        </div>

        {/* ── Full achievements list (top to bottom) ── */}
        <div className="flex items-center gap-2 mb-6">
          <Crosshair size={14} className="text-[var(--amber)]" />
          <h3 className="font-mono text-[0.65rem] text-[var(--amber)] uppercase tracking-widest">
            All Achievements
          </h3>
        </div>

        <div className="space-y-2 mb-16">
          {achievements.map((a, i) => {
            const imgs = getImages(a);
            const typeColor =
              a.type === "Winner"
                ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                : a.type === "Award"
                ? "text-[var(--amber)] bg-[var(--amber)]/10 border-[var(--amber)]/20"
                : "text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20";

            return (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3 rounded-xl border
                           border-[var(--border)] bg-[var(--surface)]/50
                           hover:border-[var(--border-hover)] hover:bg-[var(--surface)]
                           transition-all duration-200 group"
              >
                {/* Index number */}
                <span className="font-mono text-[0.55rem] text-[var(--text-subtle)] w-5 shrink-0 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Type badge */}
                <span
                  className={`text-[0.55rem] font-mono font-bold tracking-widest uppercase
                              px-2 py-0.5 rounded-full border shrink-0 ${typeColor}`}
                >
                  {a.type}
                </span>

                {/* Year */}
                <span className="font-mono text-[0.6rem] text-[var(--text-subtle)] shrink-0 w-8">
                  {a.year}
                </span>

                {/* Title + event */}
                <div className="flex-1 min-w-0">
                  <p className="text-[0.8rem] font-semibold text-[var(--text)] leading-snug truncate">
                    {a.title}
                  </p>
                  <p className="text-[0.65rem] text-[var(--text-subtle)] truncate mt-0.5">
                    {a.event}
                  </p>
                </div>

                {/* Certificate thumbnail — right side */}
                {imgs.length > 0 && (
                  <button
                    onClick={() => openLightbox(imgs)}
                    className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border
                               border-[var(--border)] hover:border-[var(--accent)]
                               transition-colors relative opacity-70 group-hover:opacity-100"
                    title="View certificate"
                  >
                    <Image src={imgs[0]} alt={a.title} fill className="object-cover" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Certifications timeline label ── */}
        <div className="flex items-center gap-2 mb-8">
          <BookMarked size={14} className="text-[var(--violet)]" />
          <h3 className="font-mono text-[0.65rem] text-[var(--violet)] uppercase tracking-widest">
            Certifications
          </h3>
        </div>

        {/* ── Certifications timeline ── */}
        <div className="relative max-w-2xl">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)]" />

          <div className="space-y-7">
            {certifications.map((c, i) => {
              const imgs = getImages(c);
              return (
                <div key={i} className="relative flex gap-4">

                  {/* Timeline dot */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-[var(--surface)]
                                  border border-[var(--border)] flex items-center
                                  justify-center shrink-0 mt-0.5">
                    <BookMarked size={13} className="text-[var(--violet)]" />
                  </div>

                  {/* Content row: thumbnail LEFT + text RIGHT */}
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-start gap-3">

                      {/* ── Certificate thumbnail — LEFT corner ── */}
                      {imgs.length > 0 && (
                        <button
                          onClick={() => openLightbox(imgs)}
                          className="shrink-0 w-14 h-14 rounded-xl overflow-hidden border
                                     border-[var(--border)] hover:border-[var(--violet)]
                                     transition-colors shadow-sm hover:shadow-md
                                     group relative mt-0.5"
                          title="View certificate"
                        >
                          <Image
                            src={imgs[0]}
                            alt={c.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          {imgs.length > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 bg-black/60
                                             text-white text-[0.45rem] font-mono px-1 py-0.5
                                             rounded flex items-center gap-0.5 leading-none">
                              <ImageIcon size={7} />
                              {imgs.length}
                            </span>
                          )}
                        </button>
                      )}

                      {/* Text content */}
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[0.6rem] text-[var(--text-subtle)] leading-none">
                          {c.year} / {c.issuer}
                        </span>
                        <h4 className="font-bold text-[var(--text)] text-[0.9rem] mt-0.5 leading-snug capitalize">
                          {c.title}
                        </h4>
                        <p className="text-[0.75rem] text-[var(--text-muted)] mt-1 leading-relaxed">
                          {c.description}
                        </p>

                        {/* Action links */}
                        <div className="flex items-center gap-4 mt-2">
                          {imgs.length > 0 && (
                            <button
                              onClick={() => openLightbox(imgs)}
                              className="inline-flex items-center gap-1.5 text-[0.7rem]
                                         font-medium text-[var(--text)] hover:text-[var(--accent)]
                                         transition-colors"
                            >
                              View certificate{imgs.length > 1 ? `s (${imgs.length})` : ""}
                              <ExternalLink size={11} />
                            </button>
                          )}
                          {c.verifyUrl && (
                            <a
                              href={c.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[0.7rem]
                                         font-medium text-[var(--accent)] hover:opacity-80
                                         transition-opacity"
                            >
                              Verify credential <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {lightbox.images.length > 1 && (
            <button
              className="absolute left-4 md:left-10 text-white/80 hover:text-white"
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div
            className="relative max-w-3xl max-h-[85vh] w-full aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.images[lightbox.index]}
              alt="Certificate"
              fill
              className="object-contain"
            />
            {lightbox.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {lightbox.images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === lightbox.index ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {lightbox.images.length > 1 && (
            <button
              className="absolute right-4 md:right-10 text-white/80 hover:text-white"
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </section>
  );
}

// ─── Main (active) carousel card ──────────────────────────────────────────────
function MainCard({
  achievement,
  onView,
}: {
  achievement: Item;
  onView: (images: string[], startAt?: number) => void;
}) {
  const a    = achievement as any;
  const imgs = getImages(a);

  return (
    <div
      className="card flex-1 max-w-xl overflow-hidden flex flex-col md:flex-row
                 transition-all duration-300 scale-100 z-10 shadow-lg"
      style={{ minHeight: "220px" }}
    >
      <div className="p-6 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`tag ${a.type === "Winner" ? "tag-green" : "tag-accent"}`}>
            {a.type}
          </span>
          <span className="font-mono text-[0.6rem] text-[var(--text-subtle)]">
            {a.year} · {a.event}
          </span>
        </div>
        <h4 className="text-lg font-bold text-[var(--text)] leading-snug">{a.title}</h4>
        {a.description && (
          <p className="text-[0.8rem] text-[var(--text-muted)] leading-relaxed flex-1 line-clamp-3">
            {a.description}
          </p>
        )}
        {imgs.length > 0 ? (
          <button
            onClick={() => onView(imgs)}
            className="self-start mt-1 inline-flex items-center gap-1.5 text-[0.75rem]
                       font-semibold text-[var(--text)] bg-[var(--surface)] border
                       border-[var(--border)] rounded-full px-3.5 py-1.5
                       hover:border-[var(--border-hover)] transition-colors"
          >
            View certificate{imgs.length > 1 ? `s (${imgs.length})` : ""}
          </button>
        ) : (
          <span className="self-start mt-1 text-[0.7rem] font-mono text-[var(--text-subtle)] italic">
            Certificate to be added
          </span>
        )}
      </div>

      {imgs.length > 0 && (
        <button
          onClick={() => onView(imgs)}
          className="relative w-full md:w-44 h-40 md:h-auto shrink-0 bg-[var(--surface)] block"
        >
          <Image src={imgs[0]} alt={a.title} fill className="object-cover" />
          {imgs.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[0.6rem]
                             font-mono px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <ImageIcon size={10} /> {imgs.length}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

// ─── Side peek card ────────────────────────────────────────────────────────────
function SidePeek({
  achievement,
  onClick,
}: {
  achievement: Item;
  onClick: () => void;
}) {
  const a    = achievement as any;
  const imgs = getImages(a);

  return (
    <div
      onClick={onClick}
      className="hidden lg:flex w-40 card overflow-hidden opacity-40
                 scale-90 hover:scale-[0.97] hover:opacity-65
                 shrink-0 flex-col cursor-pointer
                 transition-all duration-300 ease-out"
      style={{ height: "220px" }}
    >
      <div className="relative w-full h-24 bg-[var(--surface)] shrink-0">
        {imgs[0] && <Image src={imgs[0]} alt="" fill className="object-cover" />}
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <span
          className={`tag text-[0.55rem] self-start ${
            a.type === "Winner" ? "tag-green" : "tag-accent"
          }`}
        >
          {a.type}
        </span>
        <p className="text-[0.65rem] text-[var(--text-muted)] line-clamp-3 leading-snug">
          {a.title}
        </p>
      </div>
    </div>
  );
}