import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

type ProseProps = {
  eyebrow?: string;
  heading?: string;
  children: ReactNode;
  background?: "bone" | "bone-soft";
};

const bgClass: Record<NonNullable<ProseProps["background"]>, string> = {
  bone: "bg-[var(--color-bone)]",
  "bone-soft": "bg-[var(--color-bone-soft)] border-y border-[var(--color-neutral-100)]",
};

export function Prose({ eyebrow, heading, children, background = "bone" }: ProseProps) {
  return (
    <section className={`py-16 md:py-24 ${bgClass[background]}`}>
      <Container width="narrow">
        {eyebrow ? (
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            {eyebrow}
          </p>
        ) : null}
        {heading ? (
          <h2
            className="font-medium text-[var(--color-ink)] mb-8"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-md)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            {heading}
          </h2>
        ) : null}
        <div
          className="prose-tarnshire"
          style={{
            fontFamily: "var(--font-sans-loaded), var(--font-sans)",
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.7,
            color: "var(--color-neutral-700)",
          }}
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
