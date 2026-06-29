"use client";
import { useEffect } from "react";

/**
 * Drop <ScrollReveal /> anywhere inside your layout (e.g. in page.tsx after <Navbar>).
 * It observes every element with class "reveal", "reveal-left", or "reveal-right"
 * and adds "revealed" when it scrolls into view, triggering the CSS transition.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const selectors = ".reveal, .reveal-left, .reveal-right";
    const els = Array.from(document.querySelectorAll(selectors));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}