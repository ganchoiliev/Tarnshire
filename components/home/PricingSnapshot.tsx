import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function PricingSnapshot() {
  return (
    <section
      className="py-16 md:py-20 bg-[var(--color-bone-soft)] border-y border-[var(--color-neutral-100)]"
      aria-label="Pricing snapshot"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-[640px]">
            <p
              className="text-[var(--color-mineral)] font-medium uppercase mb-4"
              style={{
                fontSize: "var(--text-label)",
                letterSpacing: "var(--tracking-label)",
              }}
            >
              Pricing
            </p>
            <h2
              className="font-medium text-[var(--color-ink)] mb-4"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-md)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Pricing without the gauntlet.
            </h2>
            <p
              className="text-[var(--color-neutral-700)] max-w-[520px]"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            >
              From £42 for two cleaners, one hour. Every rate published. No quote
              calls, no surprises.
            </p>
          </div>
          <Link
            href="/home/pricing"
            className="text-[var(--color-ink)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] font-medium underline underline-offset-4 decoration-[0.5px] flex-shrink-0"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            See full pricing →
          </Link>
        </div>
      </Container>
    </section>
  );
}
