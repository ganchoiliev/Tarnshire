import Link from "next/link";
import { Container } from "@/components/ui/Container";

type Borough = { code: string; name: string; postcode: string };

const launchBoroughs: Borough[] = [
  { code: "M20", name: "Didsbury", postcode: "M20" },
  { code: "M21", name: "Chorlton", postcode: "M21" },
  { code: "M14", name: "Withington", postcode: "M14" },
];

export function CleanerShowcase() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone-soft)] border-y border-[var(--color-neutral-100)]" aria-label="Cleaner recruitment">
      <Container>
        <div className="mb-12 md:mb-14 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            Hiring
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
            Become a Tarnshire cleaner.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            Self-employed, fairly paid, with your own recurring clients in your
            own borough. We&apos;re hiring across Didsbury, Chorlton, and Withington
            now.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {launchBoroughs.map((b) => (
            <Link
              key={b.postcode}
              href="/careers"
              className="group flex items-center gap-5 p-6 bg-[var(--color-bone)] border border-[var(--color-neutral-100)] rounded-[var(--radius-md)] hover:border-[var(--color-neutral-300)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-emphasis)]"
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
                  We&apos;re hiring →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
