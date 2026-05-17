import { Container } from "@/components/ui/Container";
import type { SectorPillar } from "@/lib/sectors";

export function SectorPillars({ pillars }: { pillars: SectorPillar[] }) {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="What we do">
      <Container>
        <div className="mb-14 md:mb-16 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            What we do
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
            Three commitments per visit.
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {pillars.map((p, i) => (
            <li key={p.title} className="border-t border-[var(--color-neutral-100)] pt-5">
              <p
                className="text-[var(--color-mineral)] font-medium mb-3"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-heading-lg)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="text-[var(--color-ink)] font-medium mb-2"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}
              >
                {p.title}
              </h3>
              <p
                className="text-[var(--color-neutral-500)]"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
              >
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
