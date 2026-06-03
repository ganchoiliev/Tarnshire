import { Container } from "@/components/ui/Container";
import { ServiceCard, type ServiceCardData } from "./ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { STAGGER_STEP } from "@/components/motion/motion-tokens";
import { IMAGES } from "@/lib/images";
import { formatGBP, fromPrice } from "@/lib/booking";

// Two real, fully bookable products. Prices derive from the booking engine
// (lib/booking.ts) so a card can never advertise a rate we would not charge.
const services: ServiceCardData[] = [
  {
    href: "/home/book",
    title: "Regular cleaning",
    body: "Weekly or fortnightly. The same cleaner, every visit.",
    price: `From ${formatGBP(fromPrice("standard"))}`,
    imageSrc: IMAGES.serviceRegular,
  },
  {
    href: "/home/deep-clean",
    title: "Deep cleaning",
    body: "A one-off, top-to-bottom reset. Flat price by size.",
    price: `From ${formatGBP(fromPrice("deep_clean"))}`,
    imageSrc: IMAGES.serviceDeep,
  },
];

export function ServicesRow() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="Services">
      <Container>
        <Reveal className="mb-12 md:mb-16 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
            }}
          >
            Services
          </p>
          <h2
            className="font-medium text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-md)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Two services. One standard.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-[720px]">
          {services.map((s, i) => (
            <Reveal key={s.href} delay={i * STAGGER_STEP}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
