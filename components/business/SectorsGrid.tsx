import { Container } from "@/components/ui/Container";
import { SectorCard, type SectorCardData } from "./SectorCard";
import { IMAGES } from "@/lib/images";

const sectors: SectorCardData[] = [
  {
    href: "/business/sectors/offices",
    title: "Offices",
    body: "Boutique studios to multi-floor practices.",
    imageSrc: IMAGES.sectorOffices,
  },
  {
    href: "/business/sectors/gyms",
    title: "Gyms & studios",
    body: "Boutique fitness, yoga, pilates, members' studios.",
    imageSrc: IMAGES.sectorGyms,
  },
  {
    href: "/business/sectors/retail",
    title: "Retail",
    body: "Independent storefronts and small chains.",
    imageSrc: IMAGES.sectorRetail,
  },
  {
    href: "/business/sectors/education",
    title: "Education",
    body: "Schools, sixth-form colleges, training centres.",
    imageSrc: IMAGES.sectorEducation,
  },
  {
    href: "/business/sectors/hospitality",
    title: "Hospitality",
    body: "Boutique hotels, restaurants, members' clubs.",
    imageSrc: IMAGES.sectorHospitality,
  },
  {
    href: "/business/sectors/healthcare",
    title: "Healthcare",
    body: "Private clinics, dental practices, physiotherapy.",
    imageSrc: IMAGES.sectorHealthcare,
    locked: true,
    lockedNote: "By referral · Phase 3 · Q3 2026",
  },
];

export function SectorsGrid() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bone)]" aria-label="Sectors">
      <Container>
        <div className="mb-12 md:mb-16 max-w-[640px]">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Sectors
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
            Six sectors. One standard.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {sectors.map((s) => (
            <SectorCard key={s.title} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
