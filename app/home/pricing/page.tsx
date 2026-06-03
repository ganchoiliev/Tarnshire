import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";
import {
  BEDROOM_OPTIONS,
  FREQUENCY_MULTIPLIERS,
  calculatePricePerVisit,
  formatGBP,
  fromPrice,
  initialBookingState,
} from "@/lib/booking";

export const metadata: Metadata = {
  title: "Pricing · Tarnshire",
  description:
    "Every Tarnshire rate, published in full and derived from the booking engine. Recurring home cleaning and one-off deep cleans across M20, M21, and M14. No quote calls, no site visits, no surprises.",
  alternates: { canonical: "/home/pricing" },
  openGraph: {
    title: "Tarnshire · Pricing",
    description:
      "Every rate published, in the open. Recurring cleaning and one-off deep cleans across M20, M21, and M14. No quote calls, no surprises.",
    url: "/home/pricing",
    images: [IMAGES.serviceRegular],
  },
};

// Every figure below is computed by the same engine the booking flow uses
// (lib/booking.ts), so the page can never quote a price we would not charge.
const STANDARD_ROWS = BEDROOM_OPTIONS.map((opt) => ({
  label: opt.label,
  perVisit: formatGBP(
    calculatePricePerVisit({
      ...initialBookingState,
      serviceType: "standard",
      bedrooms: opt.value,
      frequency: "weekly",
    }),
  ),
}));

const DEEP_ROWS = BEDROOM_OPTIONS.map((opt) => ({
  label: opt.label,
  price: formatGBP(
    calculatePricePerVisit({
      ...initialBookingState,
      serviceType: "deep_clean",
      bedrooms: opt.value,
    }),
  ),
}));

const MONTHLY_PREMIUM_PCT = Math.round((FREQUENCY_MULTIPLIERS.monthly - 1) * 100);
const STANDARD_FROM = formatGBP(fromPrice("standard"));
const DEEP_FROM = formatGBP(fromPrice("deep_clean"));

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--color-neutral-100)] bg-[var(--color-bone)] py-20 md:py-32 lg:py-40">
          <Image
            src={IMAGES.serviceRegular}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover opacity-[0.18] pointer-events-none"
          />
          <Container className="relative z-10">
            <div className="max-w-[760px]">
              <div
                className="inline-flex items-center gap-3 text-[var(--color-mineral)] font-medium mb-7 uppercase"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                <span className="inline-block w-6 h-px bg-[var(--color-mineral)]" aria-hidden />
                Pricing
              </div>
              <h1
                className="font-medium text-[var(--color-ink)] mb-8"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-display-xl)",
                  lineHeight: 0.96,
                  letterSpacing: "var(--tracking-display)",
                }}
              >
                Every rate, in the open.
              </h1>
              <p
                className="text-[var(--color-neutral-700)] mb-10 max-w-[580px]"
                style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
              >
                No quote calls, no site visits, no surprises. Recurring cleaning starts at{" "}
                {STANDARD_FROM} a visit. One-off deep cleans start at {DEEP_FROM}. Every figure
                below is the price we charge, taken securely when you book.
              </p>
              <Button href="/home/book" variant="accent" size="lg">
                Book your first clean
              </Button>
            </div>
          </Container>
        </section>

        {/* Recurring cleaning */}
        <section className="py-16 md:py-24 border-b border-[var(--color-neutral-100)] bg-[var(--color-bone)]">
          <Container>
            <div className="max-w-[760px] mb-12">
              <p
                className="text-[var(--color-mineral)] font-medium uppercase mb-4"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                Recurring cleaning
              </p>
              <h2
                className="font-medium text-[var(--color-ink)] mb-6"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-display-md)",
                  lineHeight: 1.05,
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                Priced by the size of your home.
              </h2>
              <p
                className="text-[var(--color-neutral-700)] max-w-[600px]"
                style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
              >
                The same cleaner, every visit. The rate per visit depends only on the size of
                your home, never on how long the job happens to take.
              </p>
            </div>

            <div className="max-w-[640px] border-t border-[var(--color-neutral-100)]">
              {STANDARD_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between py-5 border-b border-[var(--color-neutral-100)]"
                >
                  <span
                    className="text-[var(--color-ink)]"
                    style={{ fontSize: "var(--text-body-lg)" }}
                  >
                    {row.label}
                  </span>
                  <span className="flex items-baseline gap-2">
                    <span
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontFamily: "var(--font-display-loaded), var(--font-display)",
                        fontSize: "var(--text-heading-lg)",
                        lineHeight: 1,
                      }}
                    >
                      {row.perVisit}
                    </span>
                    <span
                      className="text-[var(--color-neutral-500)] uppercase"
                      style={{
                        fontSize: "var(--text-caption)",
                        letterSpacing: "var(--tracking-caption)",
                      }}
                    >
                      per visit
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Frequency multipliers */}
            <div className="max-w-[640px] mt-10">
              <p
                className="text-[var(--color-ink)] font-medium mb-4"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                How often we visit
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Weekly", note: "Same per-visit rate. Most households choose this." },
                  { label: "Fortnightly", note: "Same per-visit rate as weekly." },
                  {
                    label: "Monthly",
                    note: `Adds ${MONTHLY_PREMIUM_PCT}% per visit, as a less frequent visit takes longer.`,
                  },
                ].map((freq) => (
                  <li
                    key={freq.label}
                    className="flex items-baseline gap-3 text-[var(--color-neutral-700)]"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
                  >
                    <span
                      className="text-[var(--color-mineral)] font-medium flex-shrink-0 w-28"
                      style={{ fontSize: "var(--text-body)" }}
                    >
                      {freq.label}
                    </span>
                    <span>{freq.note}</span>
                  </li>
                ))}
              </ul>
              <p
                className="text-[var(--color-neutral-500)] mt-6"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
              >
                Need a single, intensive visit rather than a recurring clean? That is a Deep
                Clean, priced flat by size below.
              </p>
            </div>
          </Container>
        </section>

        {/* Deep clean flat-by-bedroom */}
        <section className="py-16 md:py-24 border-b border-[var(--color-neutral-100)] bg-[var(--color-ink)] text-[var(--color-bone)]">
          <Container>
            <div className="max-w-[760px] mb-12">
              <p
                className="text-[var(--color-mineral-soft)] font-medium uppercase mb-4"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                Deep clean
              </p>
              <h2
                className="font-medium mb-6"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-display-md)",
                  lineHeight: 1.05,
                  letterSpacing: "var(--tracking-heading)",
                  color: "var(--color-bone)",
                }}
              >
                Flat price by size. No surprises.
              </h2>
              <p
                className="max-w-[600px]"
                style={{
                  color: "color-mix(in srgb, var(--color-bone) 78%, transparent)",
                  fontSize: "var(--text-body-lg)",
                  lineHeight: 1.55,
                }}
              >
                A one-off, top-to-bottom reset for move-in, move-out, post-renovation, or
                pre-event. 4-hour minimum visit. The price is fixed by the size of your home.
              </p>
            </div>

            <div className="max-w-[640px] border-t border-[color-mix(in_srgb,var(--color-bone)_20%,transparent)]">
              {DEEP_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between py-5 border-b border-[color-mix(in_srgb,var(--color-bone)_20%,transparent)]"
                >
                  <span style={{ fontSize: "var(--text-body-lg)" }}>{row.label}</span>
                  <span
                    className="font-medium"
                    style={{
                      fontFamily: "var(--font-display-loaded), var(--font-display)",
                      fontSize: "var(--text-heading-lg)",
                      lineHeight: 1,
                    }}
                  >
                    {row.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-10">
              <Button href="/home/book?service=deep_clean" variant="accent" size="lg">
                Book a Deep Clean
              </Button>
              <Link
                href="/home/deep-clean"
                className="text-[var(--color-bone)] hover:text-[var(--color-mineral-soft)] transition-colors duration-[var(--duration-fast)] font-medium underline underline-offset-4 decoration-[0.5px]"
                style={{ fontSize: "var(--text-body)" }}
              >
                See what a Deep Clean includes →
              </Link>
            </div>
          </Container>
        </section>

        {/* Honesty note */}
        <section className="py-16 md:py-24 bg-[var(--color-bone-soft)]">
          <Container>
            <div className="max-w-[760px]">
              <p
                className="text-[var(--color-mineral)] font-medium uppercase mb-4"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                How pricing works
              </p>
              <h2
                className="font-medium text-[var(--color-ink)] mb-6"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-display-md)",
                  lineHeight: 1.05,
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                The price you see is the price you pay.
              </h2>
              <ul className="flex flex-col gap-3">
                {[
                  "Every rate above is published in full. We do not run quote calls or charge for site visits.",
                  "Your estimate updates as you book, and payment is taken securely at the end via Stripe.",
                  "All rates include cleaner labour, equipment, and standard supplies.",
                  "Available across M20, M21, and M14. Tell us your postcode and we will confirm cover.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[var(--color-neutral-700)]"
                    style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
                  >
                    <span className="text-[var(--color-mineral)] mt-[0.4em] flex-shrink-0" aria-hidden>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 bg-[var(--color-bone)]">
          <Container width="narrow" className="text-center">
            <h2
              className="font-medium text-[var(--color-ink)] mb-6"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-lg)",
                lineHeight: 1.0,
                letterSpacing: "var(--tracking-display)",
              }}
            >
              Ready when you are.
            </h2>
            <p
              className="text-[var(--color-neutral-700)] max-w-[520px] mx-auto mb-10"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            >
              Tell us your postcode and the size of your home. You will see your rate before you
              confirm.
            </p>
            <Button href="/home/book" variant="accent" size="lg">
              Book your first clean
            </Button>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
