import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function SectorLockedNotice({ note, body }: { note: string; body: string }) {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="Sector status">
      <Container width="narrow" className="text-center">
        <p
          className="text-[var(--color-mineral)] font-medium uppercase mb-5"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
        >
          {note}
        </p>
        <h2
          className="font-medium text-[var(--color-ink)] mb-8"
          style={{
            fontFamily: "var(--font-display-loaded), var(--font-display)",
            fontSize: "var(--text-display-md)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          Opening by referral in Q3 2026.
        </h2>
        <p
          className="text-[var(--color-neutral-700)] mx-auto max-w-[640px] mb-10"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
        >
          {body}
        </p>
        <Link
          href="/contact"
          className="inline-block text-[var(--color-ink)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] font-medium underline underline-offset-4 decoration-[0.5px]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          Contact us for a referral →
        </Link>
      </Container>
    </section>
  );
}
