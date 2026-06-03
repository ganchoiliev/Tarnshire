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
            Vetted, insured, same cleaner every visit. A weekly hour returned to your week.
          </p>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/home/book" variant="accent" size="lg">
                Book your first clean
              </Button>
              <Link
                href="/home/pricing"
                className="text-[var(--color-ink)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] font-medium underline underline-offset-4 decoration-[0.5px]"
                style={{ fontSize: "var(--text-body)" }}
              >
                See full pricing →
              </Link>
            </div>
            <Link
              href="/home/deep-clean"
              className="text-[var(--color-neutral-500)] hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] underline underline-offset-4 decoration-[0.5px]"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Need a one-off deep clean instead? →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
