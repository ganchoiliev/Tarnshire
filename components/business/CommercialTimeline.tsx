import Link from "next/link";
import { Container } from "@/components/ui/Container";

type Step = { number: string; label: string; body: string };

const steps: Step[] = [
  {
    number: "01",
    label: "Quote within 24 hours",
    body: "Tell us the building, the frequency, the scope. We respond by the next working day.",
  },
  {
    number: "02",
    label: "Walkthrough within 5 days",
    body: "Site survey scheduled within a working week. We measure, we ask, we listen.",
  },
  {
    number: "03",
    label: "Contract before first clean",
    body: "Terms, scope, schedule, break clauses — all documented and signed before any operative steps on site.",
  },
];

export function CommercialTimeline() {
  return (
    <section
      className="py-20 md:py-28 bg-[var(--color-bone-soft)] border-y border-[var(--color-neutral-100)]"
      aria-label="Commercial timeline"
    >
      <Container>
        <div className="mb-14 md:mb-16 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Timeline
          </p>
          <h2
            className="font-medium text-[var(--color-ink)] mb-5"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-md)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Quote, walkthrough, contract.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            Procurement teams shouldn&apos;t have to chase. Every Tarnshire commercial engagement runs on the same documented timeline.
          </p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((s) => (
            <li key={s.number} className="border-t border-[var(--color-neutral-100)] pt-5">
              <p
                className="text-[var(--color-mineral)] font-medium mb-3"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-heading-lg)",
                }}
              >
                {s.number}
              </p>
              <h3
                className="text-[var(--color-ink)] font-medium mb-2"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}
              >
                {s.label}
              </h3>
              <p
                className="text-[var(--color-neutral-700)]"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Link
            href="/business/quote"
            prefetch={false}
            className="text-[var(--color-ink)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] font-medium underline underline-offset-4 decoration-[0.5px]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            Request a quote →
          </Link>
        </div>
      </Container>
    </section>
  );
}
