import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

type ComingSoonProps = {
  label?: string;
  heading: string;
  body: string;
  activatesWhen: string;
  children?: ReactNode;
};

export function ComingSoon({
  label = "Coming soon",
  heading,
  body,
  activatesWhen,
  children,
}: ComingSoonProps) {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]">
      <Container width="narrow" className="text-center">
        <p
          className="text-[var(--color-mineral)] font-medium uppercase mb-5"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
        >
          {label}
        </p>
        <h2
          className="font-medium text-[var(--color-ink)] mb-6"
          style={{
            fontFamily: "var(--font-display-loaded), var(--font-display)",
            fontSize: "var(--text-display-md)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          {heading}
        </h2>
        <p
          className="text-[var(--color-neutral-700)] mb-6 mx-auto max-w-[560px]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
        >
          {body}
        </p>
        <p
          className="text-[var(--color-neutral-500)] uppercase mx-auto max-w-[560px]"
          style={{ fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)" }}
        >
          {activatesWhen}
        </p>
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  );
}
