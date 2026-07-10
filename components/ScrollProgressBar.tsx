"use client";

import { useEffect, useState } from "react";

/**
 * Fixed rail at the very top of the viewport that fills left-to-right
 * as the user scrolls down the page. Uses the .scroll-progress class
 * already defined in globals.css (gradient: green → accent → violet).
 *
 * Usage: render once, near the top of app/layout.tsx, e.g.:
 *   <body>
 *     <ScrollProgressBar />
 *     <CustomCursor />
 *     {children}
 *   </body>
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}