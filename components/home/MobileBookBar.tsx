"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { formatGBP, fromPrice } from "@/lib/booking";

/**
 * Slim, phone-only (`md:hidden`) sticky booking bar. The header's Book CTA
 * scrolls away with the page; this keeps a one-tap path to /home/book within
 * reach once the hero is behind you.
 *
 * Behaviour, all measured from the live DOM so it stays decoupled from page
 * structure:
 *  - Appears only after the hero (`#hero`) has fully scrolled out of view.
 *  - Hides again when the footer (`#site-footer`) enters the viewport, so it
 *    never covers the legal / company-registration line.
 *  - Never renders on the booking routes themselves.
 *
 * Accessible: while hidden it is removed from the tab order and the a11y tree
 * (aria-hidden + tabIndex -1 + pointer-events-none), so it is never a focus
 * trap. Reduced-motion safe: the show/hide is a plain CSS transition, which the
 * global prefers-reduced-motion rule in globals.css neutralises to an instant
 * state change — no bespoke motion code to opt out of.
 */
export function MobileBookBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.getElementById("site-footer");

    // No hero on the page → treat the hero as already passed.
    let pastHero = !hero;
    let atFooter = false;
    const apply = () => setVisible(pastHero && !atFooter);

    const heroObs = hero
      ? new IntersectionObserver(
          ([entry]) => {
            pastHero = !entry.isIntersecting;
            apply();
          },
          { threshold: 0 },
        )
      : null;
    heroObs?.observe(hero!);

    const footerObs = footer
      ? new IntersectionObserver(
          ([entry]) => {
            atFooter = entry.isIntersecting;
            apply();
          },
          { threshold: 0 },
        )
      : null;
    footerObs?.observe(footer!);

    apply();
    return () => {
      heroObs?.disconnect();
      footerObs?.disconnect();
    };
  }, [pathname]);

  // Belt-and-suspenders: never surface the bar on the booking flow itself.
  if (pathname?.startsWith("/home/book")) return null;

  return (
    <div
      className={[
        "md:hidden fixed inset-x-0 bottom-0 z-40",
        "border-t border-[var(--color-neutral-100)] bg-[var(--color-bone)]",
        "shadow-[var(--shadow-lg)]",
        "transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-emphasis)]",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none",
      ].join(" ")}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
    >
      <Link
        href="/home/book"
        tabIndex={visible ? undefined : -1}
        aria-label={`Book a clean — from ${formatGBP(fromPrice("standard"))} per visit`}
        className="flex items-center justify-between gap-4 px-5 py-3 no-underline"
      >
        <span className="flex flex-col">
          <span
            className="font-medium text-[var(--color-ink)]"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}
          >
            Book a clean
          </span>
          <span
            className="text-[var(--color-neutral-500)]"
            style={{ fontSize: "var(--text-caption)", lineHeight: 1.3 }}
          >
            From {formatGBP(fromPrice("standard"))} · cancel any time
          </span>
        </span>
        <span
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-mineral)] px-4 py-2.5 font-medium text-[var(--color-bone)]"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Book
          <span aria-hidden>→</span>
        </span>
      </Link>
    </div>
  );
}
