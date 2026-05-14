import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-neutral-100)] py-20 md:py-32 lg:py-40">
      <Image
        src={IMAGES.heroHome}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.22] pointer-events-none"
      />
      <Container className="relative z-10">
        <div className="max-w-[720px]">
          <div
            className="inline-flex items-center gap-3 text-[var(--color-mineral)] font-medium mb-7 uppercase"
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            <span className="inline-block w-6 h-px bg-[var(--color-mineral)]" aria-hidden />
            For Home
          </div>
          <h1
            className="font-medium text-[var(--color-ink)] mb-8"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-xl)",
              lineHeight: 0.96,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            The same cleaner, every visit.
          </h1>
          <p
            className="text-[var(--color-neutral-700)] mb-12 max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            Premium recurring housekeeping in Didsbury, Chorlton, and Withington.
            Vetted, insured, instantly bookable. A weekly hour returned to your week.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Button href="/home/book" variant="accent" size="lg">
              Book in 90 seconds
            </Button>
            <Link
              href="/home/pricing"
              className="text-[var(--color-ink)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] font-medium underline underline-offset-4 decoration-[0.5px]"
              style={{ fontSize: "var(--text-body)" }}
            >
              See full pricing →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
