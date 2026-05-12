import type { ReactNode } from "react";

type TrustItem = {
  title: string;
  body: string;
  icon: ReactNode;
};

const items: TrustItem[] = [
  {
    title: "DBS-checked operatives",
    body: "Every Tarnshire contractor background-verified before first job",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden width="16" height="16">
        <path d="M9 12l2 2 4-4M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z" />
      </svg>
    ),
  },
  {
    title: "Same-week response",
    body: "Quote-to-walkthrough scheduled within five working days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden width="16" height="16">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Transparent pricing",
    body: "Rates published, no surprises, no quote-call gauntlet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden width="16" height="16">
        <rect x="4" y="6" width="16" height="14" rx="1" />
        <path d="M4 10h16M9 14h6" />
      </svg>
    ),
  },
];

export function TrustStrip() {
  return (
    <section
      className="bg-[var(--color-bone-soft)] border-y border-[var(--color-neutral-100)] px-6 py-9 md:px-14 md:py-10"
      aria-label="Trust indicators"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full border border-[var(--color-neutral-300)] flex items-center justify-center text-[var(--color-mineral)]">
              {item.icon}
            </div>
            <div>
              <p
                className="text-[var(--color-ink)] font-medium mb-1"
                style={{ fontSize: "var(--text-body-sm)" }}
              >
                {item.title}
              </p>
              <p
                className="text-[var(--color-neutral-700)]"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.5 }}
              >
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
