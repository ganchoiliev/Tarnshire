export type CaseStudyCardData = {
  sector: string;
  size: string;
  frequency: string;
  area: string;
  outcomeLabel: string;
};

export function CaseStudyCard({ sector, size, frequency, area, outcomeLabel }: CaseStudyCardData) {
  return (
    <article className="border border-[var(--color-neutral-100)] rounded-[var(--radius-md)] bg-[var(--color-bone)] p-6 md:p-7">
      <p
        className="text-[var(--color-neutral-500)] font-medium uppercase mb-5"
        style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
      >
        Named client coming soon
      </p>
      <h3
        className="font-medium text-[var(--color-ink)] mb-6"
        style={{
          fontFamily: "var(--font-display-loaded), var(--font-display)",
          fontSize: "var(--text-heading-lg)",
          lineHeight: 1.15,
          letterSpacing: "var(--tracking-heading)",
        }}
      >
        {sector}
      </h3>
      <dl className="flex flex-col gap-3 mb-6 pb-6 border-b border-[var(--color-neutral-100)]">
        <div className="flex justify-between items-baseline gap-4">
          <dt
            className="text-[var(--color-neutral-500)] uppercase"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Size
          </dt>
          <dd className="text-[var(--color-ink)] font-medium text-right" style={{ fontSize: "var(--text-body-sm)" }}>
            {size}
          </dd>
        </div>
        <div className="flex justify-between items-baseline gap-4">
          <dt
            className="text-[var(--color-neutral-500)] uppercase"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Frequency
          </dt>
          <dd className="text-[var(--color-ink)] font-medium text-right" style={{ fontSize: "var(--text-body-sm)" }}>
            {frequency}
          </dd>
        </div>
        <div className="flex justify-between items-baseline gap-4">
          <dt
            className="text-[var(--color-neutral-500)] uppercase"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Area
          </dt>
          <dd className="text-[var(--color-ink)] font-medium text-right" style={{ fontSize: "var(--text-body-sm)" }}>
            {area}
          </dd>
        </div>
      </dl>
      <p className="text-[var(--color-neutral-500)]" style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}>
        Outcome metric on file: <span className="text-[var(--color-ink)] font-medium">{outcomeLabel}</span>
      </p>
    </article>
  );
}
