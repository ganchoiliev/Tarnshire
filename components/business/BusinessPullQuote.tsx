import { Container } from "@/components/ui/Container";

export function BusinessPullQuote() {
  return (
    <section className="bg-[var(--color-mineral)] py-20 md:py-28" aria-label="Brand statement">
      <Container width="narrow" className="text-center">
        <blockquote
          className="text-[var(--color-bone)] mb-6"
          style={{
            fontFamily: "var(--font-display-loaded), var(--font-display)",
            fontSize: "var(--text-display-md)",
            fontStyle: "italic",
            lineHeight: 1.15,
            letterSpacing: "var(--tracking-heading)",
            fontWeight: 500,
          }}
        >
          We publish what we hold. We surface what we&apos;re earning. We don&apos;t trade on accreditations we haven&apos;t completed.
        </blockquote>
        <p
          className="text-[var(--color-mineral-soft)] font-medium uppercase"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
        >
          — Tarnshire
        </p>
      </Container>
    </section>
  );
}
