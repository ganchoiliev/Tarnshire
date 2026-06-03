"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { LenisOptions } from "lenis";

// lerp / smoothWheel are Lenis defaults, set explicitly for intent: a gentle,
// decelerating glide. Touch is left native (syncTouch defaults to false) for
// mobile responsiveness and accessibility. Anchors are handled by Next's router
// (the footer uses <Link href="/#services"> etc.), and Lenis re-syncs to the
// resulting native scroll, so we deliberately do not enable Lenis's own anchor
// handling — it would double-handle those clicks.
const LENIS_OPTIONS: LenisOptions = {
  lerp: 0.1,
  smoothWheel: true,
};

/**
 * Mounts a single global Lenis instance that smooths the native window scroll.
 *
 * - `root` binds Lenis to the document, so it renders no wrapper element
 *   (SSR- and hydration-safe) and keeps window.scrollY authoritative — Framer
 *   Motion's useScroll / whileInView and in-page #anchor links keep working.
 * - Disabled entirely under prefers-reduced-motion: those users get plain
 *   native scrolling, with no Lenis instance created at all.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Before mount and for reduced-motion users, render children untouched. In
  // `root` mode ReactLenis adds no DOM, so toggling this branch never shifts
  // layout or causes a hydration mismatch.
  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}
