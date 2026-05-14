import { Container } from "@/components/ui/Container";
import { ServiceCard, type ServiceCardData } from "./ServiceCard";
import { IMAGES } from "@/lib/images";

const services: ServiceCardData[] = [
  {
    href: "/home/services/regular",
    title: "Regular cleaning",
    body: "Weekly or fortnightly. The same cleaner, every visit.",
    price: "From £42",
    imageSrc: IMAGES.serviceRegular,
  },
  {
    href: "/home/services/deep",
    title: "Deep cleaning",
    body: "A top-to-bottom reset. One-off, on request.",
    price: "From £180",
    imageSrc: IMAGES.serviceDeep,
  },
  {
    href: "/home/services/end-of-tenancy",
    title: "End of tenancy",
    body: "Deposit-back specialism. Move-out, every detail.",
    price: "From £210",
    imageSrc: IMAGES.serviceEndOfTenancy,
  },
  {
    href: "/home/services/oven",
    title: "Oven & specialist",
    body: "Single-room intensive. Oven, hob, extractor.",
    price: "From £85",
    imageSrc: IMAGES.serviceOven,
  },
  {
    href: "/home/services/airbnb-turnover",
    title: "Airbnb turnover",
    body: "Same-day reset for hosts. Linens included.",
    price: "From £55",
    imageSrc: IMAGES.serviceAirbnb,
  },
];

export function ServicesRow() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="Services">
      <Container>
        <div className="mb-12 md:mb-16 max-w-[640px]">
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
            Five ways. One standard.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {services.map((s) => (
            <ServiceCard key={s.href} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
