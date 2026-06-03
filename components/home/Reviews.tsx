import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { STAGGER_STEP } from "@/components/motion/motion-tokens";
import { reviews } from "@/lib/reviews";

/**
 * Real-reviews-only social proof. Renders nothing until lib/reviews.ts holds at
 * least one genuine, consented entry — the structured slot is intentionally
 * empty at launch. We never fabricate testimonials or counts.
 */
export function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="What customers say">
      <Container>
        <Reveal className="mb-12 md:mb-14 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            In their words
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
            What customers say.
          </h2>
        </Reveal>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <Reveal
              as="li"
              key={`${r.attribution}-${i}`}
              delay={i * STAGGER_STEP}
              className="border-t border-[var(--color-neutral-100)] pt-5"
            >
              <blockquote
                className="text-[var(--color-neutral-700)] mb-4"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <p
                className="text-[var(--color-mineral)] font-medium uppercase"
                style={{
                  fontSize: "var(--text-label)",
                  letterSpacing: "var(--tracking-label)",
                }}
              >
                {r.attribution}
                {r.area ? ` · ${r.area}` : ""}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
