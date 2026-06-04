import { Container } from "@/components/ui/Container";

// Only claims that are already true and verifiable today. DBS checks and
// insurance are real; the same-cleaner promise, cancel-any-time, and published
// rates are how the product actually works. No ratings, no counts, no awards.
const signals = [
  "DBS-checked",
  "Fully insured",
  "Same cleaner, every visit",
  "Cancel any time",
  "Every rate published",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      width="15"
      height="15"
      className="flex-shrink-0 text-[var(--color-mineral)]"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function TrustSignals() {
  return (
    <section
      className="bg-[var(--color-bone-soft)] border-b border-[var(--color-neutral-100)]"
      aria-label="What every Tarnshire clean includes"
    >
      <Container className="py-5 md:py-6">
        <ul className="flex flex-col items-start gap-y-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-7">
          {signals.map((label) => (
            <li key={label} className="flex items-center gap-2">
              <CheckIcon />
              <span
                className="text-[var(--color-neutral-700)] font-medium"
                style={{ fontSize: "var(--text-body-sm)" }}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
