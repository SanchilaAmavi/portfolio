"use client";

import { useEffect } from "react";

/**
 * ScrollReveal
 * ------------
 * Client-side provider that powers every scroll-linked effect in globals.css:
 *
 *  1. .reveal / .reveal-left / .reveal-right / .reveal-scale
 *     → adds .revealed the first time an element enters the viewport
 *       (works with .reveal-stagger parents automatically, since stagger
 *       delays are pure CSS on the children). A MutationObserver keeps
 *       watching after mount, so elements that appear later — tab
 *       switches, key-based remounts, anything client-rendered after
 *       the initial paint — still get picked up instead of sitting at
 *       opacity:0 forever (this was the "cards disappear" bug: they
 *       weren't being un-revealed, they were never observed at all).
 *
 *  2. .section-scroll-rail
 *     → sets --section-progress (0 → 1) on each matching section as it
 *       scrolls through the viewport, filling the rail underline.
 *
 *  3. .parallax-layer[data-parallax-rate]
 *     → sets --parallax-y based on scroll position * rate (keep rate
 *       between 0.05 and 0.25 for a subtle effect).
 *
 *  4. .scroll-fade-line
 *     → toggles .in-focus while a line/paragraph is within the middle
 *       band of the viewport.
 *
 * Usage: render once near the root, e.g. in app/layout.tsx:
 *   <body>
 *     <ScrollReveal />
 *     {children}
 *   </body>
 * It renders nothing — it only attaches observers/listeners to the DOM.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── 1. Reveal-on-scroll (IntersectionObserver) ──────────────────────
    const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

    let revealObserver: IntersectionObserver | undefined;

    const observeNewRevealTargets = () => {
      if (prefersReducedMotion) {
        document
          .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
          .forEach((el) => el.classList.add("revealed"));
        return;
      }
      if (!revealObserver) return;
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        // data attribute guards against re-observing the same node twice
        if (!el.dataset.revealObserved && !el.classList.contains("revealed")) {
          el.dataset.revealObserved = "1";
          revealObserver!.observe(el);
        }
      });
    };

    if (!prefersReducedMotion) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              revealObserver!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
    }

    // Initial sweep, then keep watching for anything mounted later.
    observeNewRevealTargets();

    const revealMutationObserver = new MutationObserver(() => {
      observeNewRevealTargets();
    });
    revealMutationObserver.observe(document.body, { childList: true, subtree: true });

    // ── 2. Per-section scroll progress rail ─────────────────────────────
    const getRailSections = () =>
      document.querySelectorAll<HTMLElement>(".section-scroll-rail");

    const updateRails = () => {
      getRailSections().forEach((section) => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress: 0 when section top is at viewport bottom,
        // 1 when section bottom reaches viewport top.
        const total = rect.height + vh;
        const traveled = vh - rect.top;
        const progress = Math.min(1, Math.max(0, traveled / total));
        section.style.setProperty("--section-progress", progress.toFixed(3));
      });
    };

    // ── 3. Parallax layers ───────────────────────────────────────────────
    const getParallaxEls = () =>
      document.querySelectorAll<HTMLElement>("[data-parallax-rate]");

    const updateParallax = () => {
      if (prefersReducedMotion) return;
      const scrollY = window.scrollY;
      getParallaxEls().forEach((el) => {
        const rate = parseFloat(el.dataset.parallaxRate || "0.1");
        el.style.setProperty("--parallax-y", `${scrollY * rate * -1}px`);
      });
    };

    // ── 4. Scroll-fade lines (in-focus band) ─────────────────────────────
    const getFadeLines = () =>
      document.querySelectorAll<HTMLElement>(".scroll-fade-line");

    const updateFadeLines = () => {
      const vh = window.innerHeight;
      getFadeLines().forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const inBand = center > vh * 0.15 && center < vh * 0.85;
        el.classList.toggle("in-focus", inBand || prefersReducedMotion);
      });
    };

    // ── rAF-throttled scroll/resize loop for #2–#4 ───────────────────────
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateRails();
        updateParallax();
        updateFadeLines();
        ticking = false;
      });
    };

    updateRails();
    updateParallax();
    updateFadeLines();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      revealMutationObserver.disconnect();
      if (revealObserver) revealObserver.disconnect();
    };
  }, []);

  return null;
}