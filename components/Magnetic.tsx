"use client";
import { useRef, ReactNode, MouseEvent as ReactMouseEvent } from "react";

/**
 * Wrap any button/link in <Magnetic> to make it pull toward the cursor
 * on hover (capped strength so it stays subtle, not gimmicky).
 *
 * <Magnetic>
 *   <a href="#projects" className="btn-primary">View Work</a>
 * </Magnetic>
 */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </div>
  );
}

/**
 * Wrap any card in <TiltCard> for a 3D perspective tilt that follows the
 * cursor — drives the --rx / --ry custom properties your .tilt class in
 * globals.css already reads. Add className="tilt" to the child you want
 * to actually tilt (usually the card itself, not this wrapper).
 *
 * <TiltCard>
 *   <div className="card tilt p-6">...</div>
 * </TiltCard>
 */
export function TiltCard({
  children,
  max = 8,
}: {
  children: ReactNode;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1
    const rx = (px - 0.5) * max * 2;  // rotateY driver
    const ry = (0.5 - py) * max * 2;  // rotateX driver
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
}