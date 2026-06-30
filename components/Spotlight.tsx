"use client";
import { useRef, useEffect, ReactNode } from "react";

/**
 * Wrap any section in <Spotlight> to get a soft radial light that follows
 * the cursor across it — used for the "engineering bench under a desk lamp"
 * feel rather than a flat background.
 *
 * <Spotlight className="relative">
 *   <Hero />
 * </Spotlight>
 *
 * No-ops on touch devices and prefers-reduced-motion.
 */
export default function Spotlight({
  children,
  className = "",
  color = "56, 189, 248", // matches --accent
  size = 480,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--spot-x", `${x}px`);
      el.style.setProperty("--spot-y", `${y}px`);
      el.style.setProperty("--spot-opacity", "1");
    };
    const onLeave = () => el.style.setProperty("--spot-opacity", "0");

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
          "--spot-opacity": "0",
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{
          opacity: "var(--spot-opacity)",
          background: `radial-gradient(${size}px circle at var(--spot-x) var(--spot-y), rgba(${color}, 0.07), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}