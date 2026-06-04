import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { STAGGER_STEP } from "@/components/motion/motion-tokens";

type FooterLink = { href: string; label: string };

// Primary home journey: the links that matter most (book sits in the brand
// block as a single quiet text link). Every original link is preserved.
const homeLinks: FooterLink[] = [
  { href: "/", label: "For Home" },
  { href: "/#services", label: "Services" },
  { href: "/home/deep-clean", label: "Deep Clean" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#areas", label: "Areas" },
];

const companyLinks: FooterLink[] = [
  { href: "/about", label: "About" },
  { href: "/our-cleaners", label: "Our Cleaners" },
  { href: "/the-almanac", label: "The Almanac" },
  { href: "/contact", label: "Contact" },
];

// Relocated from the old "Brand" column into the legal bottom bar: smaller, but
// every link kept and still legible.
const legalLinks: FooterLink[] = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
];

// Surfaced for local trust and SEO. Mirrors CleanerCoverage on the home page.
const coverage = [
  { name: "Didsbury", postcode: "M20" },
  { name: "Chorlton", postcode: "M21" },
  { name: "Withington", postcode: "M14" },
];

// Only claims already true today, treated with the same craft as TrustSignals.
const trustSignals = ["DBS-checked", "Fully insured", "Same-cleaner promise"];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="site-footer"
      className="bg-[var(--color-bone)] border-t border-[var(--color-neutral-100)] pt-20 pb-14 md:pt-28"
    >
      <Container>
        {/* Brand block alongside the navigation columns. */}
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-16">
          <Reveal className="lg:max-w-[300px] lg:shrink-0">
            <Wordmark size="lg" href="/" />
            <p
              className="text-[var(--color-neutral-500)] mt-5 max-w-[300px]"
              style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.6 }}
            >
              Premium cleaning across Greater Manchester. Same cleaner every
              visit. Vetted, insured, and yours to keep.
            </p>
            <Link
              href="/home/book"
              className="link-underline w-fit mt-6 inline-flex items-center gap-2 font-medium text-[var(--color-ink)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)]"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Book a clean
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-3 lg:flex-1 lg:gap-x-16">
            <Reveal delay={STAGGER_STEP}>
              <FooterNav title="For Home" links={homeLinks} />
            </Reveal>
            <Reveal delay={STAGGER_STEP * 2}>
              <FooterNav title="Company" links={companyLinks} />
            </Reveal>
            <Reveal delay={STAGGER_STEP * 3}>
              <div>
                <Eyebrow id="footer-coverage">Coverage</Eyebrow>
                <ul
                  aria-labelledby="footer-coverage"
                  className="mt-5 flex flex-col gap-3"
                >
                  {coverage.map((area) => (
                    <li key={area.postcode} className="flex items-baseline gap-2">
                      <span
                        className="text-[var(--color-ink)]"
                        style={{ fontSize: "var(--text-body-sm)" }}
                      >
                        {area.name}
                      </span>
                      <span
                        className="text-[var(--color-mineral)] font-medium uppercase"
                        style={{
                          fontSize: "var(--text-label)",
                          letterSpacing: "var(--tracking-label)",
                        }}
                      >
                        {area.postcode}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Trust line + legal, separated by a single hairline. */}
        <Reveal className="mt-16 border-t border-[var(--color-neutral-100)] pt-12 flex flex-col gap-12 md:mt-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <ul
              aria-label="What every clean includes"
              className="flex flex-wrap gap-x-7 gap-y-3"
            >
              {trustSignals.map((signal) => (
                <li
                  key={signal}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <CheckIcon />
                  <span
                    className="text-[var(--color-neutral-700)] font-medium"
                    style={{ fontSize: "var(--text-body-sm)" }}
                  >
                    {signal}
                  </span>
                </li>
              ))}
            </ul>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline uppercase text-[var(--color-neutral-500)] hover:text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)]"
                      style={{
                        fontSize: "var(--text-caption)",
                        letterSpacing: "var(--tracking-caption)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <p
              className="text-[var(--color-neutral-500)] uppercase"
              style={{
                fontSize: "var(--text-caption)",
                letterSpacing: "var(--tracking-caption)",
              }}
            >
              {`© ${year} Tarnshire · Manchester · Greater Manchester`}
            </p>
            <p
              className="text-[var(--color-neutral-500)] max-w-[640px]"
              style={{ fontSize: "var(--text-caption)", lineHeight: 1.6 }}
            >
              Tarnshire is a trading name of Brushly Ltd, a company registered in
              England and Wales (Company No. 17056861). Registered office: 18
              Howard Road, Reigate, RH2 7JE.
            </p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}

function Eyebrow({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p
      id={id}
      className="text-[var(--color-mineral)] font-medium uppercase"
      style={{
        fontSize: "var(--text-label)",
        letterSpacing: "var(--tracking-label)",
      }}
    >
      {children}
    </p>
  );
}

function FooterNav({ title, links }: { title: string; links: FooterLink[] }) {
  const id = `footer-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <nav aria-labelledby={id}>
      <Eyebrow id={id}>{title}</Eyebrow>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="link-underline text-[var(--color-neutral-700)] hover:text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)]"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Mirrors the TrustSignals check mark so the footer's trust line reads with the
// same craft as the in-page band.
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      width="15"
      height="15"
      className="flex-shrink-0 text-[var(--color-mineral)]"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
