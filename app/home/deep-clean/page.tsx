import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Tarnshire Deep Clean — Greater Manchester | Tarnshire",
  description:
    "A 4-hour minimum, top-to-bottom deep clean for move-in, move-out, post-renovation, or pre-event. Available in M20, M21, and M14.",
  alternates: { canonical: "/home/deep-clean" },
  openGraph: {
    title: "Tarnshire Deep Clean — Greater Manchester",
    description:
      "A 4-hour minimum, top-to-bottom deep clean. Move-in, move-out, post-renovation, pre-event.",
    url: "/home/deep-clean",
    images: ["/img/1-3.jpg"],
  },
};

const SCOPE_INCLUDED: { area: string; items: string[] }[] = [
  {
    area: "Kitchen",
    items: [
      "Inside and outside of oven, including racks and trays",
      "Inside microwave, inside fridge (if empty)",
      "Extractor fan and filter degrease",
      "All worktops, splashbacks, and tile grout",
      "Inside and outside of all cabinets and drawers",
      "Behind and under appliances where accessible",
      "Floor scrub, including edges and corners",
    ],
  },
  {
    area: "Bathrooms",
    items: [
      "Limescale removal from taps, shower screens, and tiles",
      "Grout cleaning and re-whitening where possible",
      "Inside and outside of toilet, including base and behind",
      "Mirror, glass, and chrome polishing",
      "Tile and floor scrub",
      "Inside cabinets and drawers",
    ],
  },
  {
    area: "Bedrooms & living areas",
    items: [
      "Skirting boards, door frames, and architraves wiped",
      "Light switches, sockets, and door handles sanitised",
      "Behind and under furniture vacuumed where accessible",
      "Window sills, ledges, and radiators dusted",
      "Inside-facing windows cleaned (ground floor only)",
      "Light fittings dusted (where safely reachable)",
    ],
  },
  {
    area: "General",
    items: [
      "All hard floors mopped with appropriate solution",
      "All carpets vacuumed including edges",
      "Cobwebs and ceiling corners cleared",
      "Bins emptied and sanitised",
    ],
  },
];

const SCOPE_EXCLUDED: string[] = [
  "Outside-facing windows above ground floor",
  "Carpet shampooing or steam cleaning",
  "Mould remediation requiring chemical treatment",
  "Anything requiring ladders above 2 metres",
  "Pre-existing damage repair",
];

const PRICE_TIERS: { label: string; price: string }[] = [
  { label: "Studio", price: "£120" },
  { label: "1–2 bed", price: "£120" },
  { label: "3 bed", price: "£150" },
  { label: "4 bed", price: "£190" },
  { label: "5+ bed", price: "£230" },
];

const USE_CASES: { title: string; body: string }[] = [
  {
    title: "End of tenancy",
    body: "Move-out cleans for tenants who want their deposit back in full. Photographable before-and-after.",
  },
  {
    title: "Move-in reset",
    body: "Before your furniture lands. A baseline you can trust before your life unpacks into it.",
  },
  {
    title: "Post-renovation",
    body: "Plaster dust, paint splatter, sawdust in places you didn't know existed. We remove it.",
  },
  {
    title: "Pre-event",
    body: "Before guests, before a viewing, before the in-laws. A house that performs.",
  },
];

export default function DeepCleanPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--color-neutral-100)] bg-[var(--color-bone)] py-20 md:py-32 lg:py-40">
          <Image
            src={IMAGES.serviceDeep}
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
                <span
                  className="inline-block w-6 h-px bg-[var(--color-mineral)]"
                  aria-hidden
                />
                Tarnshire · Deep Clean
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
                Four hours.
                <br />
                Top to bottom.
              </h1>
              <p
                className="text-[var(--color-neutral-700)] mb-10 max-w-[560px]"
                style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
              >
                A one-off, intensive clean for the moments when a weekly visit isn&apos;t enough. Move-in, move-out, post-renovation, pre-event. 4-hour minimum visit. Greater Manchester only.
              </p>
              <Button href="/home/book?service=deep_clean" variant="accent" size="lg">
                Book a Deep Clean
              </Button>
            </div>
          </Container>
        </section>

        {/* Use cases */}
        <section className="py-16 md:py-24 border-b border-[var(--color-neutral-100)] bg-[var(--color-bone)]">
          <Container>
            <div className="max-w-[760px] mb-12">
              <p
                className="text-[var(--color-mineral)] font-medium uppercase mb-4"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                When to book one
              </p>
              <h2
                className="font-medium text-[var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-display-md)",
                  lineHeight: 1.05,
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                The four moments a standard clean won&apos;t cover.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {USE_CASES.map((u) => (
                <div
                  key={u.title}
                  className="border-t border-[var(--color-neutral-100)] pt-6"
                >
                  <h3
                    className="font-medium text-[var(--color-ink)] mb-3"
                    style={{
                      fontFamily: "var(--font-display-loaded), var(--font-display)",
                      fontSize: "var(--text-heading-lg)",
                      lineHeight: 1.15,
                    }}
                  >
                    {u.title}
                  </h3>
                  <p
                    className="text-[var(--color-neutral-700)]"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
                  >
                    {u.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Scope — included */}
        <section className="py-16 md:py-24 border-b border-[var(--color-neutral-100)] bg-[var(--color-bone-soft)]">
          <Container>
            <div className="max-w-[760px] mb-12">
              <p
                className="text-[var(--color-mineral)] font-medium uppercase mb-4"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                What&apos;s included
              </p>
              <h2
                className="font-medium text-[var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-display-md)",
                  lineHeight: 1.05,
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                Every checklist, every surface.
              </h2>
            </div>
            <div className="flex flex-col gap-12">
              {SCOPE_INCLUDED.map((section) => (
                <div key={section.area}>
                  <h3
                    className="font-medium text-[var(--color-ink)] mb-4 pb-2 border-b border-[var(--color-neutral-100)]"
                    style={{
                      fontFamily: "var(--font-display-loaded), var(--font-display)",
                      fontSize: "var(--text-heading-lg)",
                      lineHeight: 1.2,
                    }}
                  >
                    {section.area}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[var(--color-neutral-700)]"
                        style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
                      >
                        <span
                          className="text-[var(--color-mineral)] mt-[0.4em] flex-shrink-0"
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Scope — excluded */}
        <section className="py-16 md:py-24 border-b border-[var(--color-neutral-100)] bg-[var(--color-bone)]">
          <Container>
            <div className="max-w-[760px]">
              <p
                className="text-[var(--color-mineral)] font-medium uppercase mb-4"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                What we don&apos;t do
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
                Straight answers, not soft promises.
              </h2>
              <p
                className="text-[var(--color-neutral-700)] mb-8"
                style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
              >
                Some things aren&apos;t part of a Deep Clean — for safety, for honesty, or because they need a specialist. If you need any of these, tell us and we&apos;ll recommend who to call.
              </p>
              <ul className="flex flex-col gap-2">
                {SCOPE_EXCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[var(--color-neutral-700)]"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
                  >
                    <span
                      className="text-[var(--color-neutral-300)] mt-[0.4em] flex-shrink-0"
                      aria-hidden
                    >
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Price table */}
        <section className="py-16 md:py-24 border-b border-[var(--color-neutral-100)] bg-[var(--color-ink)] text-[var(--color-bone)]">
          <Container>
            <div className="max-w-[760px] mb-12">
              <p
                className="text-[var(--color-mineral-soft)] font-medium uppercase mb-4"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                Pricing
              </p>
              <h2
                className="font-medium"
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
            </div>
            <div className="border-t border-[color-mix(in_srgb,var(--color-bone)_20%,transparent)]">
              {PRICE_TIERS.map((tier) => (
                <div
                  key={tier.label}
                  className="flex items-baseline justify-between py-6 border-b border-[color-mix(in_srgb,var(--color-bone)_20%,transparent)]"
                >
                  <span style={{ fontSize: "var(--text-body-lg)" }}>{tier.label}</span>
                  <span
                    className="font-medium"
                    style={{
                      fontFamily: "var(--font-display-loaded), var(--font-display)",
                      fontSize: "var(--text-display-md)",
                      lineHeight: 1,
                    }}
                  >
                    {tier.price}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="mt-8 max-w-[640px]"
              style={{
                color: "color-mix(in srgb, var(--color-bone) 60%, transparent)",
                fontSize: "var(--text-body-sm)",
                lineHeight: 1.55,
              }}
            >
              All prices include cleaner labour, equipment, and standard supplies. 4-hour minimum visit. Payment taken at booking via secure Stripe checkout.
            </p>
          </Container>
        </section>

        {/* CTA */}
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
              Pick a date. Confirm. We&apos;ll handle the rest.
            </p>
            <Button href="/home/book?service=deep_clean" variant="accent" size="lg">
              Book a Deep Clean
            </Button>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
