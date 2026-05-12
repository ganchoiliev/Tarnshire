import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/our-cleaners", label: "Our Cleaners" },
  { href: "/the-almanac", label: "The Almanac" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-neutral-100)] bg-[var(--color-bone)]">
      <div className="mx-auto flex items-center justify-between px-6 py-7 md:px-14 md:py-9">
        <Wordmark size="lg" href="/" />
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase text-[var(--color-neutral-500)] hover:text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)]"
              style={{ letterSpacing: "var(--tracking-caption)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu trigger ships in a later slice. Mobile shows wordmark only for now. */}
      </div>
    </header>
  );
}
