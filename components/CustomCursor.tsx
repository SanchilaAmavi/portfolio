"use client";
import { useEffect, useRef } from "react";

/**
 * Custom magnetic cursor.
 * - Dot snaps instantly to the pointer; ring trails with easing for a
 *   "magnetic" feel.
 * - Ring grows + changes color (via .hovering, already defined in
 *   globals.css) over any link, button, or [data-cursor-hover] element.
 * - Disabled automatically on touch devices and when the user has
 *   prefers-reduced-motion enabled — falls back to the native cursor.
 *
 * Mount once, globally, in app/layout.tsx:
 *   <body className="antialiased">
 *     <CustomCursor />
 *     {children}
 *   </body>
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    enabled.current = true;
    document.body.classList.add("custom-cursor-active");

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let raf = 0;
    let visible = false;

    const showCursor = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const hideCursor = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      showCursor();
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor-hover]'
      );
      ring.classList.toggle("hovering", !!hoverable);
    };

    const onDown = () => {
      ring.style.transform = "translate(-50%, -50%) scale(0.85)";
    };
    const onUp = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1)";
    };

    // Ease the ring toward the pointer every frame — the "magnetic lag"
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  id="cursor-dot"  style={{ opacity: 0 }} />
      <div ref={ringRef} id="cursor-ring" style={{ opacity: 0, transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.3s, transform 0.15s ease" }} />
    </>
  );
}