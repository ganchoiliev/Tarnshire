import { Container } from "@/components/ui/Container";

type LegalPlaceholderProps = {
  lastUpdated: string;
  intendedPolicy: string[];
};

export function LegalPlaceholder({ lastUpdated, intendedPolicy }: LegalPlaceholderProps) {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-bone)]">
      <Container width="narrow">
        <p
          className="text-[var(--color-neutral-500)] uppercase mb-10"
          style={{ fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)" }}
        >
          Last updated: {lastUpdated}
        </p>
        <div className="border-l-2 border-[var(--color-mineral)] pl-6 mb-12">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-3"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Placeholder
          </p>
          <p
            className="text-[var(--color-neutral-700)]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
          >
            Tarnshire&apos;s formal legal documents are being drafted with a UK solicitor and will be published here in Q3 2026, before the brand begins commercial trading. The plain-English summary below describes the policy that the formal document will codify. If you need the formal terms before Q3 2026, email{" "}
            <a
              href="mailto:hello@tarnshire.co.uk"
              className="text-[var(--color-ink)] underline underline-offset-4 decoration-[0.5px] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)]"
            >
              hello@tarnshire.co.uk
            </a>{" "}
            and we&apos;ll share the draft.
          </p>
        </div>
        <h2
          className="font-medium text-[var(--color-ink)] mb-6"
          style={{
            fontFamily: "var(--font-display-loaded), var(--font-display)",
            fontSize: "var(--text-heading-lg)",
            lineHeight: 1.15,
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          Intended policy
        </h2>
        <ul className="flex flex-col gap-4">
          {intendedPolicy.map((p, i) => (
            <li
              key={i}
              className="text-[var(--color-neutral-700)] flex gap-4"
              style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
            >
              <span
                className="text-[var(--color-mineral)] font-medium flex-shrink-0"
                style={{ fontFamily: "var(--font-display-loaded), var(--font-display)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
