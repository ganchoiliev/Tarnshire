import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function BusinessFinalCTA() {
  return (
    <section
      className="py-20 md:py-28 bg-[var(--color-bone-soft)] border-t border-[var(--color-neutral-100)]"
      aria-label="Final call to action"
    >
      <Container width="narrow" className="text-center">
        <h2
          className="font-medium text-[var(--color-ink)] mb-5"
          style={{
            fontFamily: "var(--font-display-loaded), var(--font-display)",
            fontSize: "var(--text-display-lg)",
            lineHeight: 1.0,
            letterSpacing: "var(--tracking-display)",
          }}
        >
          Ready for a walkthrough?
        </h2>
        <p
          className="text-[var(--color-neutral-700)] mb-10 mx-auto max-w-[520px]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
        >
          Tell us about the building. We&apos;ll be on site within five working days, with a documented quote within 24 hours of the walkthrough.
        </p>
        <div className="inline-flex">
          <Button href="/business/quote" prefetch={false} variant="primary" size="lg">
            Request a quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
