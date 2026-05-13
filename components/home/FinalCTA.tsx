import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone-soft)] border-t border-[var(--color-neutral-100)]" aria-label="Final call to action">
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
          Ready for a quiet hour?
        </h2>
        <p
          className="text-[var(--color-neutral-700)] mb-10 mx-auto max-w-[480px]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
        >
          Book in 90 seconds. Cancel any time. Same cleaner every visit.
        </p>
        <div className="inline-flex">
          <Button href="/home/book" variant="accent" size="lg">
            Get your slot
          </Button>
        </div>
      </Container>
    </section>
  );
}
