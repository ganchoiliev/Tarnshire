import { Container } from "@/components/ui/Container";

export type AccreditationDetail = {
  title: string;
  status: "in-place" | "working-toward";
  targetDate?: string;
  body: string[];
  evidence?: string;
};

export function AccreditationDetails({ details }: { details: AccreditationDetail[] }) {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="Per-credential details">
      <Container width="narrow">
        <div className="mb-14 md:mb-16">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Detail
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
            What each credential covers.
          </h2>
        </div>
        <ol className="flex flex-col gap-14 md:gap-16">
          {details.map((d, i) => (
            <li key={d.title} className="border-t border-[var(--color-neutral-100)] pt-8">
              <div className="flex items-baseline justify-between gap-6 mb-5 flex-wrap">
                <div className="flex items-baseline gap-4">
                  <span
                    className="text-[var(--color-mineral)] font-medium"
                    style={{
                      fontFamily: "var(--font-display-loaded), var(--font-display)",
                      fontSize: "var(--text-heading-lg)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[var(--color-ink)] font-medium"
                    style={{
                      fontFamily: "var(--font-display-loaded), var(--font-display)",
                      fontSize: "var(--text-heading-lg)",
                      lineHeight: 1.15,
                      letterSpacing: "var(--tracking-heading)",
                    }}
                  >
                    {d.title}
                  </h3>
                </div>
                <span
                  className={`uppercase font-medium px-3 py-1 rounded-[var(--radius-xs)] ${
                    d.status === "in-place"
                      ? "bg-[var(--color-mineral-soft)] text-[var(--color-mineral-deep)]"
                      : "bg-[var(--color-bone-soft)] text-[var(--color-neutral-700)] border border-[var(--color-neutral-300)]"
                  }`}
                  style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
                >
                  {d.status === "in-place" ? "In place" : `Working toward · ${d.targetDate ?? ""}`}
                </span>
              </div>
              <div className="space-y-4 mb-5">
                {d.body.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-[var(--color-neutral-700)]"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
                  >
                    {p}
                  </p>
                ))}
              </div>
              {d.evidence ? (
                <p
                  className="text-[var(--color-neutral-500)] italic"
                  style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
                >
                  Evidence on file: {d.evidence}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
