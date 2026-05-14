import { Container } from "@/components/ui/Container";
import { CaseStudyCard, type CaseStudyCardData } from "./CaseStudyCard";

const targets: CaseStudyCardData[] = [
  {
    sector: "Boutique office",
    size: "8,000 sqft",
    frequency: "Weekly",
    area: "MediaCity, Salford",
    outcomeLabel: "Documented at first walkthrough",
  },
  {
    sector: "Independent gym",
    size: "3,500 sqft",
    frequency: "5× weekly",
    area: "Spinningfields, Manchester",
    outcomeLabel: "Documented at first walkthrough",
  },
  {
    sector: "Independent retail",
    size: "2,000 sqft",
    frequency: "3× weekly",
    area: "Altrincham, Trafford",
    outcomeLabel: "Documented at first walkthrough",
  },
];

export function CaseStudyBand() {
  return (
    <section
      className="py-20 md:py-28 bg-[var(--color-bone-soft)] border-y border-[var(--color-neutral-100)]"
      aria-label="Case studies"
    >
      <Container>
        <div className="mb-12 md:mb-16 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Case studies
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
            Cornerstone clients coming through 2026.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            The shape of contracts we&apos;re bidding now. Real case studies — named, measured, documented — land on this page through Q3 and Q4 2026.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {targets.map((t, i) => (
            <CaseStudyCard key={i} {...t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
