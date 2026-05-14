import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact — Tarnshire",
  description:
    "Contact Tarnshire. Email response within 24 hours. Premium cleaning across Greater Manchester.",
};

type ContactMethod = {
  label: string;
  primary: string;
  secondary: string;
  href?: string;
};

const methods: ContactMethod[] = [
  {
    label: "Email",
    primary: "hello@tarnshire.co.uk",
    secondary: "Response within 24 working hours, Monday to Friday.",
    href: "mailto:hello@tarnshire.co.uk",
  },
  {
    label: "Bookings",
    primary: "bookings@tarnshire.co.uk",
    secondary: "Domestic booking enquiries. For instant booking, use the For Home page.",
    href: "mailto:bookings@tarnshire.co.uk",
  },
  {
    label: "Quotes",
    primary: "quotes@tarnshire.co.uk",
    secondary:
      "Commercial quote enquiries. Or request a quote directly via /business/quote when slice 2 ships.",
    href: "mailto:quotes@tarnshire.co.uk",
  },
  {
    label: "Phone line",
    primary: "Opens Q3 2026",
    secondary:
      "Phone support launches alongside our first contractor cohort. Email is the fastest route until then.",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Contact"
          headline="Get in touch."
          lede="Email is the fastest route to Tarnshire. We respond within 24 working hours, Monday to Friday. Phone support opens in Q3 2026."
        />
        <section className="py-16 md:py-24 bg-[var(--color-bone)]">
          <Container>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {methods.map((m) => (
                <li
                  key={m.label}
                  className="border border-[var(--color-neutral-100)] rounded-[var(--radius-md)] p-6 md:p-7 bg-[var(--color-bone)]"
                >
                  <p
                    className="text-[var(--color-mineral)] font-medium uppercase mb-3"
                    style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
                  >
                    {m.label}
                  </p>
                  {m.href ? (
                    <a
                      href={m.href}
                      className="text-[var(--color-ink)] font-medium hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] underline underline-offset-4 decoration-[0.5px]"
                      style={{
                        fontFamily: "var(--font-display-loaded), var(--font-display)",
                        fontSize: "var(--text-heading-lg)",
                      }}
                    >
                      {m.primary}
                    </a>
                  ) : (
                    <p
                      className="text-[var(--color-neutral-700)] font-medium"
                      style={{
                        fontFamily: "var(--font-display-loaded), var(--font-display)",
                        fontSize: "var(--text-heading-lg)",
                      }}
                    >
                      {m.primary}
                    </p>
                  )}
                  <p
                    className="text-[var(--color-neutral-500)] mt-3"
                    style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
                  >
                    {m.secondary}
                  </p>
                </li>
              ))}
            </ul>
            <p
              className="mt-12 text-[var(--color-neutral-500)] uppercase"
              style={{ fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)" }}
            >
              Tarnshire · Manchester · Greater Manchester · United Kingdom
            </p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
