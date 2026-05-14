import { Container } from "@/components/ui/Container";

type Check = { number: string; title: string; body: string };

const checks: Check[] = [
  {
    number: "01",
    title: "DBS background-checked",
    body: "Every contractor verified through the UK Disclosure and Barring Service before first visit.",
  },
  {
    number: "02",
    title: "Reference-verified",
    body: "Minimum two prior housekeeping employers contacted and confirmed.",
  },
  {
    number: "03",
    title: "£2M public liability insurance",
    body: "Full cover for every visit. Documentation on file, available on request.",
  },
  {
    number: "04",
    title: "Six months minimum experience",
    body: "No trainees. Every Tarnshire cleaner has at least six months of paid housekeeping work behind them.",
  },
  {
    number: "05",
    title: "In-person trial clean",
    body: "Every contractor completes a paid trial clean with our standards lead before joining the network.",
  },
];

export function VettingChecklist() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="Vetting standards">
      <Container>
        <div className="mb-14 md:mb-16 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            Standards
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
            Five checks. Non-negotiable.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] max-w-[520px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            Every Tarnshire contractor passes all five before their first paid
            clean. Documented, dated, on file.
          </p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {checks.map((c) => (
            <li
              key={c.number}
              className="border-t border-[var(--color-neutral-100)] pt-5"
            >
              <p
                className="text-[var(--color-mineral)] font-medium mb-3"
                style={{
                  fontFamily: "var(--font-display-loaded), var(--font-display)",
                  fontSize: "var(--text-heading-lg)",
                }}
              >
                {c.number}
              </p>
              <h3
                className="text-[var(--color-ink)] font-medium mb-2"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}
              >
                {c.title}
              </h3>
              <p
                className="text-[var(--color-neutral-500)]"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
              >
                {c.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
