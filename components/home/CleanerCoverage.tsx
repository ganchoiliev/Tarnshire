import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { STAGGER_STEP } from "@/components/motion/motion-tokens";

type Borough = { code: string; name: string; postcode: string };

const coverageBoroughs: Borough[] = [
  { code: "M20", name: "Didsbury", postcode: "M20" },
  { code: "M21", name: "Chorlton", postcode: "M21" },
  { code: "M14", name: "Withington", postcode: "M14" },
];

export function CleanerCoverage() {
  return (
    <section id="areas" className="py-20 md:py-28 bg-[var(--color-bone-soft)] border-y border-[var(--color-neutral-100)]" aria-label="Where we clean">
      <Container>
        <Reveal className="mb-12 md:mb-14 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            Coverage
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
            Cleaning South Manchester now.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            Our cleaners are independent professionals: vetted, insured, and
            taking bookings now across Didsbury, Chorlton, and Withington. The
            same cleaner every visit, matched to your home.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {coverageBoroughs.map((b, i) => (
            <Reveal key={b.postcode} delay={i * STAGGER_STEP}>
              <Link
                href="/home/book"
                className="group flex items-center gap-5 p-6 bg-[var(--color-bone)] border border-[var(--color-neutral-100)] rounded-[var(--radius-md)] hover:border-[var(--color-neutral-300)] transition-[color,border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-emphasis)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-md)]"
              >
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--color-mineral)] text-[var(--color-bone)] flex items-center justify-center font-medium"
                  style={{
                    fontFamily: "var(--font-display-loaded), var(--font-display)",
                    fontSize: "var(--text-body-lg)",
                    letterSpacing: "0.04em",
                  }}
                  aria-hidden
                >
                  {b.code}
                </div>
                <div>
                  <p
                    className="text-[var(--color-ink)] font-medium mb-1"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.3 }}
                  >
                    {b.name}
                  </p>
                  <p
                    className="text-[var(--color-mineral)] font-medium uppercase"
                    style={{
                      fontSize: "var(--text-label)",
                      letterSpacing: "var(--tracking-label)",
                    }}
                  >
                    Available now →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
