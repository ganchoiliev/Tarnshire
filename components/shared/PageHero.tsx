import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  headline: string;
  lede?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, headline, lede, children }: PageHeroProps) {
  return (
    <section className="border-b border-[var(--color-neutral-100)] bg-[var(--color-bone)] py-16 md:py-24 lg:py-28">
      <Container>
        <div className="max-w-[760px]">
          <div
            className="inline-flex items-center gap-3 text-[var(--color-mineral)] font-medium mb-6 uppercase"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            <span className="inline-block w-6 h-px bg-[var(--color-mineral)]" aria-hidden />
            {eyebrow}
          </div>
          <h1
            className="font-medium text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-lg)",
              lineHeight: 1.0,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            {headline}
          </h1>
          {lede ? (
            <p
              className="text-[var(--color-neutral-700)] mt-8 max-w-[640px]"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            >
              {lede}
            </p>
          ) : null}
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
