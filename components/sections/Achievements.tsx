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
} from "lucide-react";
import Image from "next/image";

const AUTO_ADVANCE_MS = 3000;

type Item = {
  title: string;
  image?: string | null;
  images?: string[];
  [key: string]: any;
};

// Returns the list of images for an item, whether it used the old
// single `image` field or the new `images` array.
function getImages(item: Item): string[] {
  if (item.images && item.images.length > 0) return item.images;
  if (item.image) return [item.image];
  return [];
}

type LightboxState = { images: string[]; index: number } | null;

export default function Achievements() {
  const [index, setIndex] = useState(0);
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

  return (
    <section id="achievements" className="py-28 relative overflow-hidden">
      <div className="blob w-80 h-80 bg-[var(--amber)]/[0.05] bottom-0 left-0" />

      <div className="section-inner">
        {/* Heading */}
        <div className="mb-14">
          <span className="eyebrow">05 / Recognition</span>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Achievements &amp; <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-3 max-w-xl text-sm">
            Competition results and professional certifications from my engineering journey.
          </p>
        </div>

        {/* ── Achievements carousel ── */}
        <div className="flex items-center gap-2 mb-6">
          <Trophy size={14} className="text-[var(--amber)]" />
          <h3 className="font-mono text-[0.65rem] text-[var(--amber)] uppercase tracking-widest">
            Selected highlights
          </h3>
        </div>

        <div
          className="relative flex items-center justify-center gap-3 md:gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            onClick={prev}
            aria-label="Previous achievement"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-colors shrink-0"
          >
            <ChevronLeft size={16} />
          </button>

          <SidePeek achievement={card(-1)} />
          <MainCard achievement={card(0)} onView={openLightbox} />
          <SidePeek achievement={card(1)} />

          <button
            onClick={next}
            aria-label="Next achievement"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-colors shrink-0"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6 mb-24">
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

        {/* ── Certifications timeline ── */}
        <div className="flex items-center gap-2 mb-10">
          <BookMarked size={14} className="text-[var(--violet)]" />
          <h3 className="font-mono text-[0.65rem] text-[var(--violet)] uppercase tracking-widest">
            Certifications
          </h3>
        </div>

        <div className="relative max-w-2xl">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)]" />
          <div className="space-y-10">
            {certifications.map((c, i) => {
              const imgs = getImages(c);
              return (
                <div key={i} className="relative flex gap-5">
                  <div className="relative z-10 w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    <BookMarked size={13} className="text-[var(--violet)]" />
                  </div>
                  <div className="flex-1 min-w-0 pb-2">
                    <span className="font-mono text-[0.65rem] text-[var(--text-subtle)]">
                      {c.year} / {c.issuer}
                    </span>
                    <h4 className="font-bold text-[var(--text)] text-base mt-1">{c.title}</h4>
                    <p className="text-[0.8rem] text-[var(--text-muted)] mt-1.5 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      {imgs.length > 0 && (
                        <button
                          onClick={() => openLightbox(imgs)}
                          className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                        >
                          View certificate{imgs.length > 1 ? `s (${imgs.length})` : ""}{" "}
                          <ExternalLink size={12} />
                        </button>
                      )}
                      {c.verifyUrl && (
                        <a
                          href={c.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--accent)] hover:opacity-80 transition-opacity"
                        >
                          Verify credential <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox — supports multiple images per entry */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
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
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrev();
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
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

function MainCard({
  achievement,
  onView,
}: {
  achievement: Item;
  onView: (images: string[], startAt?: number) => void;
}) {
  const a = achievement as any;
  const imgs = getImages(a);

  return (
    <div className="card flex-1 max-w-xl overflow-hidden flex flex-col md:flex-row transition-all">
      <div className="p-6 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className={`tag ${a.type === "Winner" ? "tag-green" : "tag-accent"}`}>
            {a.type}
          </span>
          <span className="font-mono text-[0.6rem] text-[var(--text-subtle)]">
            {a.year} · {a.event}
          </span>
        </div>
        <h4 className="text-lg font-bold text-[var(--text)] leading-snug">{a.title}</h4>
        {a.description && (
          <p className="text-[0.8rem] text-[var(--text-muted)] leading-relaxed flex-1">
            {a.description}
          </p>
        )}
        {imgs.length > 0 ? (
          <button
            onClick={() => onView(imgs)}
            className="self-start mt-1 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-3.5 py-1.5 hover:border-[var(--border-hover)] transition-colors"
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
          className="relative w-full md:w-48 h-40 md:h-auto shrink-0 bg-[var(--surface)] block"
        >
          <Image src={imgs[0]} alt={a.title} fill className="object-cover" />
          {imgs.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[0.6rem] font-mono px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <ImageIcon size={10} /> {imgs.length}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

function SidePeek({ achievement }: { achievement: Item }) {
  const a = achievement as any;
  const imgs = getImages(a);
  return (
    <div className="hidden lg:flex w-40 h-44 card overflow-hidden opacity-40 scale-90 shrink-0 flex-col">
      <div className="relative w-full h-24 bg-[var(--surface)]">
        {imgs[0] && <Image src={imgs[0]} alt="" fill className="object-cover" />}
      </div>
      <div className="p-3">
        <span className={`tag text-[0.55rem] ${a.type === "Winner" ? "tag-green" : "tag-accent"}`}>
          {a.type}
        </span>
        <p className="text-[0.65rem] text-[var(--text-muted)] mt-1 line-clamp-2">{a.title}</p>
      </div>
    </div>
  );
}