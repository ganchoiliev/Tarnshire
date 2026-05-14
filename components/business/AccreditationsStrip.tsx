import { Container } from "@/components/ui/Container";

type Credential = { title: string; body: string };

const inPlace: Credential[] = [
  {
    title: "DBS-checked operatives",
    body: "Every contractor verified via the UK Disclosure and Barring Service before first visit.",
  },
  {
    title: "£2M public liability insurance",
    body: "Full cover for every commercial engagement. Documentation on file.",
  },
  {
    title: "COSHH-trained operatives",
    body: "Control of Substances Hazardous to Health training completed for every contractor handling chemicals.",
  },
  {
    title: "Reference-verified network",
    body: "Minimum two prior employers contacted and confirmed for every operative.",
  },
];

const workingToward: Credential[] = [
  { title: "SafeContractor accreditation", body: "Target: Q3 2026." },
  { title: "BICSc training certification", body: "Target: Q4 2026." },
  { title: "ISO 9001 quality management", body: "Target: Q4 2026." },
  { title: "ISO 14001 environmental management", body: "Target: Q1 2027." },
];

export function AccreditationsStrip() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="Accreditations and credentials">
      <Container>
        <div className="mb-14 md:mb-16 max-w-[680px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Accreditations
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
            What&apos;s in place. What&apos;s coming.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            Tarnshire publishes what we hold and surfaces what we&apos;re earning. Procurement teams shouldn&apos;t have to read between the lines.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p
              className="text-[var(--color-ink)] font-medium uppercase mb-6 pb-4 border-b border-[var(--color-ink)]"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              In place — day one
            </p>
            <ul className="flex flex-col gap-5">
              {inPlace.map((c) => (
                <li key={c.title}>
                  <p
                    className="text-[var(--color-ink)] font-medium mb-1"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}
                  >
                    {c.title}
                  </p>
                  <p
                    className="text-[var(--color-neutral-500)]"
                    style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
                  >
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              className="text-[var(--color-neutral-500)] font-medium uppercase mb-6 pb-4 border-b border-[var(--color-neutral-300)]"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Working toward
            </p>
            <ul className="flex flex-col gap-5">
              {workingToward.map((c) => (
                <li key={c.title} className="flex items-baseline justify-between gap-4">
                  <p
                    className="text-[var(--color-neutral-700)] font-medium"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}
                  >
                    {c.title}
                  </p>
                  <p
                    className="text-[var(--color-neutral-500)] flex-shrink-0"
                    style={{ fontSize: "var(--text-body-sm)", letterSpacing: "var(--tracking-caption)" }}
                  >
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
