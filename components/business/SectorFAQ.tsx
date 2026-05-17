import { Container } from "@/components/ui/Container";
import type { SectorFAQItem } from "@/lib/sectors";

export function SectorFAQ({ faq, sectorTitle }: { faq: SectorFAQItem[]; sectorTitle: string }) {
  return (
    <section
      className="py-20 md:py-28 bg-[var(--color-bone)]"
      aria-label={`Frequently asked questions about ${sectorTitle}`}
    >
      <Container width="narrow">
        <div className="mb-12 md:mb-14">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Frequently asked
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
            Questions we get about {sectorTitle.toLowerCase()}.
          </h2>
        </div>
        <ul className="flex flex-col">
          {faq.map((item) => (
            <li
              key={item.question}
              className="border-t border-[var(--color-neutral-100)] last:border-b last:border-b-[var(--color-neutral-100)]"
            >
              <details className="group py-6">
                <summary className="flex items-start justify-between gap-8 cursor-pointer list-none">
                  <h3
                    className="text-[var(--color-ink)] font-medium"
                    style={{
                      fontFamily: "var(--font-display-loaded), var(--font-display)",
                      fontSize: "var(--text-heading-lg)",
                      lineHeight: 1.2,
                      letterSpacing: "var(--tracking-heading)",
                    }}
                  >
                    {item.question}
                  </h3>
                  <span
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[var(--color-mineral)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-emphasis)] group-open:rotate-45"
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <p
                  className="mt-4 text-[var(--color-neutral-700)] max-w-[640px]"
                  style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
                >
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
