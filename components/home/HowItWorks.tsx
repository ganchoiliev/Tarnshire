import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { STAGGER_STEP } from "@/components/motion/motion-tokens";

type Step = { number: string; title: string; body: string };

// Every line here is true of the live booking flow: M20/M21/M14 coverage, the
// four-step quote with a price shown as you go, and the same-cleaner promise
// with cancel-any-time. No claims beyond what the product actually does.
const steps: Step[] = [
  {
    number: "01",
    title: "Share your postcode",
    body: "We clean Didsbury, Chorlton, and Withington today. Your postcode tells us in seconds whether we're on your street.",
  },
  {
    number: "02",
    title: "Book in four steps",
    body: "Your home, your schedule, your details. The price updates as you go. Published rates, no quote call, no surprises.",
  },
  {
    number: "03",
    title: "Same cleaner, every visit",
    body: "We match you to one vetted, insured cleaner and keep them on your home. Cancel any time.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="How it works">
      <Container>
        <Reveal className="mb-12 md:mb-16 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            How it works
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
            Postcode, book, same cleaner.
          </h2>
        </Reveal>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.number}
              delay={i * STAGGER_STEP}
              className="border-t border-[var(--color-neutral-100)] pt-5"
            >
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
                style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.3 }}
              >
                {s.title}
              </h3>
              <p
                className="text-[var(--color-neutral-700)]"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.6 }}
              >
                {s.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
