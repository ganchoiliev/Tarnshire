import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function LaunchOffer() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="Launch offer">
      <Container width="narrow" className="text-center">
        <p
          className="text-[var(--color-mineral)] font-medium uppercase mb-5"
          style={{
            fontSize: "var(--text-label)",
            letterSpacing: "var(--tracking-label)",
          }}
        >
          Launch offer
        </p>
        <h2
          className="font-medium text-[var(--color-ink)] mb-6"
          style={{
            fontFamily: "var(--font-display-loaded), var(--font-display)",
            fontSize: "var(--text-display-lg)",
            lineHeight: 1.0,
            letterSpacing: "var(--tracking-display)",
          }}
        >
          The first ten customers.
        </h2>
        <p
          className="text-[var(--color-neutral-700)] mb-10 mx-auto max-w-[520px]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
        >
          Twenty per cent off your first three weekly cleans, for the first ten
          customers across our launch postcodes. After that, the rate is the
          rate.
        </p>
        <div className="inline-flex">
          <Button href="/home/book" variant="accent" size="lg">
            Book your first clean
          </Button>
        </div>
      </Container>
    </section>
  );
}
