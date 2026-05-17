import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectorHero } from "@/components/business/SectorHero";
import { SectorPillars } from "@/components/business/SectorPillars";
import { SectorCredentials } from "@/components/business/SectorCredentials";
import { SectorFAQ } from "@/components/business/SectorFAQ";
import { SectorLockedNotice } from "@/components/business/SectorLockedNotice";
import { BusinessFinalCTA } from "@/components/business/BusinessFinalCTA";
import { SECTORS, getSectorBySlug } from "@/lib/sectors";
import { IMAGES } from "@/lib/images";

type Props = { params: Promise<{ sector: string }> };

export async function generateStaticParams() {
  return SECTORS.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sector: slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return { title: "Sector not found · Tarnshire" };
  return {
    title: `${sector.title} · Tarnshire`,
    description: sector.metaDescription,
    openGraph: {
      title: `Tarnshire — ${sector.title}`,
      description: sector.metaDescription,
      images: [IMAGES[sector.imageKey]],
    },
  };
}

export default async function SectorPage({ params }: Props) {
  const { sector: slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  if (sector.locked) {
    return (
      <>
        <SiteHeader />
        <main>
          <SectorHero
            eyebrow={sector.eyebrow}
            headline={sector.headline}
            lede={sector.lede}
            imageKey={sector.imageKey}
            locked
          />
          <SectorLockedNotice
            note={sector.lockedNote ?? "Phase 3"}
            body={sector.lockedBody ?? ""}
          />
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>
        <SectorHero
          eyebrow={sector.eyebrow}
          headline={sector.headline}
          lede={sector.lede}
          imageKey={sector.imageKey}
        />
        <SectorPillars pillars={sector.pillars} />
        <SectorCredentials credentials={sector.relevantCredentials} />
        <SectorFAQ faq={sector.faq} sectorTitle={sector.title} />
        <BusinessFinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
