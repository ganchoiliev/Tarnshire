import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IMAGES, type ImageKey } from "@/lib/images";

type SectorHeroProps = {
  eyebrow: string;
  headline: string;
  lede: string;
  imageKey: ImageKey;
  locked?: boolean;
};

export function SectorHero({ eyebrow, headline, lede, imageKey, locked }: SectorHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-neutral-100)] py-16 md:py-24 lg:py-28">
      <Image
        src={IMAGES[imageKey]}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover pointer-events-none ${locked ? "opacity-[0.10]" : "opacity-[0.22]"}`}
      />
      <Container className="relative z-10">
        <div className="max-w-[760px]">
          <div
            className="inline-flex items-center gap-3 text-[var(--color-mineral)] font-medium mb-7 uppercase"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            <span className="inline-block w-6 h-px bg-[var(--color-mineral)]" aria-hidden />
            <span>{eyebrow}</span>
            {locked ? (
              <>
                <span className="text-[var(--color-neutral-300)]" aria-hidden>
                  ·
                </span>
                <span className="text-[var(--color-neutral-500)]">Phase 3</span>
              </>
            ) : null}
          </div>
          <h1
            className="font-medium text-[var(--color-ink)] mb-8"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-lg)",
              lineHeight: 0.98,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            {headline}
          </h1>
          <p
            className="text-[var(--color-neutral-700)] mb-10 max-w-[600px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            {lede}
          </p>
          {!locked ? (
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/business/quote" prefetch={false} variant="primary" size="lg">
                Request a quote
              </Button>
              <Link
                href="/business/sectors"
                className="text-[var(--color-ink)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] font-medium underline underline-offset-4 decoration-[0.5px]"
                style={{ fontSize: "var(--text-body)" }}
              >
                All sectors →
              </Link>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
