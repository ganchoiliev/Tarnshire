import { Container } from "@/components/ui/Container";

export function EditorialPullQuote() {
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
          We send the same cleaner, every visit. We pay them properly. We back
          them with insurance. That&apos;s the whole brand.
        </blockquote>
        <p
          className="text-[var(--color-mineral-soft)] font-medium uppercase"
          style={{
            fontSize: "var(--text-label)",
            letterSpacing: "var(--tracking-label)",
          }}
        >
          — Tarnshire
        </p>
      </Container>
    </section>
  );
}
