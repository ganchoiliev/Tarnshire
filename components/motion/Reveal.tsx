"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { DURATION_BASE, EASE_EMPHASIS, REVEAL_DISTANCE } from "./motion-tokens";

type RevealTag = "div" | "li" | "span";

const MOTION_TAG: Record<RevealTag, ElementType> = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Element to render. Defaults to a div; use "li" inside ordered/unordered lists. */
  as?: RevealTag;
  /** Stagger offset in seconds, for cascading grouped items. */
  delay?: number;
  /** Entrance travel distance in px (transform-only — no layout shift). */
  distance?: number;
  /** Duration in seconds. */
  duration?: number;
  /** Fade opacity in. Set false to keep content painted from the start (LCP-safe headings). */
  fade?: boolean;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
};

/**
 * Reveals its children once, the first time they scroll into view: a restrained
 * fade + upward rise driven by the shared motion tokens.
 *
 * Under prefers-reduced-motion it renders the children fully visible with no
 * transform. The global CSS rule neutralises CSS animation; this honours the
 * same preference for Framer's JS-driven animation, which CSS cannot reach.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  distance = REVEAL_DISTANCE,
  duration = DURATION_BASE,
  fade = true,
  amount = 0.3,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = MOTION_TAG[as];

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: fade ? 0 : 1, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE_EMPHASIS, delay }}
    >
      {children}
    </Tag>
  );
}
