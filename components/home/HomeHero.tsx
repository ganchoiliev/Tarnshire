"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import {
  DURATION_SLOW,
  EASE_EMPHASIS,
  REVEAL_DISTANCE,
} from "@/components/motion/motion-tokens";

const group: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

// Rise-only entrance. Opacity stays at 1 in both states, so the headline, lede
// and CTA (the above-the-fold LCP content) paint at first byte: the static
// shell ships them visible, transformed only, never opacity:0. Mirrors the
// fade={false} approach PageHero already uses. The stagger (see `group`) still
// gives the cascade. This also removes the pre-hydration invisible flash that
// reduced-motion users would otherwise see before hydration corrects it.
const piece: Variants = {
  hidden: { opacity: 1, y: REVEAL_DISTANCE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_SLOW, ease: EASE_EMPHASIS },
  },
};

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  // Parallax driven by the raw window scroll position (px). Framer's useScroll
  // can't be used here: Lenis stops native scroll events from propagating, so
  // useScroll never updates while smoothing is on. Polling the real (Lenis-
  // smoothed) window.scrollY each frame tracks it reliably and stays decoupled
  // from whether Lenis is mounted. The hero sits at the top, so 0→640px of
  // scroll covers its drift; useTransform clamps beyond.
  const scrollPx = useMotionValue(0);
  useAnimationFrame(() => {
    if (reduceMotion) return;
    const y = window.scrollY;
    if (y !== scrollPx.get()) scrollPx.set(y);
  });
  // ±6% travel. The image carries a constant 1.2 scale (10% overflow per edge),
  // so the drift never reveals an edge, and the section clips it anyway.
  const imageY = useTransform(scrollPx, [0, 640], ["-6%", "6%"]);

  const groupProps = reduceMotion
    ? {}
    : { variants: group, initial: "hidden", animate: "visible" };
  const pieceProps = reduceMotion ? {} : { variants: piece };

  return (
    <section id="hero" className="relative overflow-hidden border-b border-[var(--color-neutral-100)] py-20 md:py-32 lg:py-40">
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={reduceMotion ? undefined : { y: imageY, scale: 1.2 }}
      >
        <Image
          src={IMAGES.heroHome}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
      </motion.div>
      {/* Legibility scrim: a barely-there, left-weighted wash of the page's own
          bone that feathers to transparent before mid-section, so the headline
          always holds contrast over the photo while the airy right-hand space
          stays clear. color-mix keeps it tied to the --color-bone token; static,
          so it shows for every user (reduced-motion included). */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--color-bone) 80%, transparent) 0%, color-mix(in srgb, var(--color-bone) 40%, transparent) 30%, transparent 60%)",
        }}
      />
      <Container className="relative z-10">
        <motion.div className="max-w-[720px]" {...groupProps}>
          <motion.h1
            className="font-medium text-[var(--color-ink)] mb-8"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-xl)",
              lineHeight: 0.96,
              letterSpacing: "var(--tracking-display)",
            }}
            {...pieceProps}
          >
            The same cleaner, every visit.
          </motion.h1>
          <motion.p
            className="text-[var(--color-neutral-700)] mb-12 max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            {...pieceProps}
          >
            Premium recurring housekeeping in Didsbury, Chorlton, and Withington.
            Vetted, insured, same cleaner every visit. A weekly hour returned to your week.
          </motion.p>
          <motion.div className="flex flex-col items-start gap-4" {...pieceProps}>
            <Link
              href="/home/book"
              className="group inline-flex items-start gap-2 no-underline"
            >
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-mineral)]"
              />
              <span style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.4 }}>
                <span
                  className="font-medium uppercase text-[var(--color-mineral-deep)]"
                  style={{ letterSpacing: "var(--tracking-label)" }}
                >
                  Launch offer
                </span>
                <span className="text-[var(--color-neutral-700)] transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--color-ink)]">
                  {", 20% off your first three weekly cleans, for our first ten customers"}
                </span>
                <span aria-hidden className="text-[var(--color-mineral)]">
                  {" →"}
                </span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/home/book" variant="accent" size="lg">
                Book your first clean
              </Button>
              <Link
                href="/home/pricing"
                className="link-underline text-[var(--color-ink)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] font-medium"
                style={{ fontSize: "var(--text-body)" }}
              >
                See full pricing →
              </Link>
            </div>
            <Link
              href="/home/deep-clean"
              className="link-underline text-[var(--color-neutral-500)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)]"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Need a one-off deep clean instead? →
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
