"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { EASE_EMPHASIS } from "@/components/motion/motion-tokens";

type NavLink = { href: string; label: string };

export function MobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  // While open: move focus into the panel, trap it, close on Escape, lock scroll.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector));

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last || !panel.contains(active))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Return focus to the trigger after the panel closes.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  // The trigger only renders below lg; close if the viewport grows to desktop.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  // Close when any link inside the panel is activated (pointer or keyboard).
  const onPanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  };

  const transition = {
    duration: reduceMotion ? 0 : 0.32,
    ease: EASE_EMPHASIS,
  };
  const offset = reduceMotion ? 0 : -8;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        className="-mr-2 inline-flex items-center justify-center p-2 text-[var(--color-ink)]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: offset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: offset }}
            transition={transition}
            onClick={onPanelClick}
            data-lenis-prevent
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[var(--color-bone)]"
          >
            <div className="flex items-center justify-between px-6 py-7">
              <Wordmark size="lg" href="/" />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="-mr-2 inline-flex items-center justify-center p-2 text-[var(--color-ink)]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav aria-label="Primary" className="flex flex-col px-6 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-[var(--color-neutral-100)] py-4 font-medium uppercase text-[var(--color-neutral-500)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)] hover:text-[var(--color-ink)]"
                  style={{
                    fontSize: "var(--text-body-lg)",
                    letterSpacing: "var(--tracking-caption)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-10 pt-8">
              <Button
                href="/home/book"
                variant="accent"
                size="lg"
                className="w-full justify-center"
              >
                Book a clean
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
