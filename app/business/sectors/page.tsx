import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { SectorsGrid } from "@/components/business/SectorsGrid";
import { BusinessFinalCTA } from "@/components/business/BusinessFinalCTA";

export const metadata: Metadata = {
  title: "Sectors · Tarnshire For Business",
  description:
    "Tarnshire commercial cleaning across six sectors: offices, gyms, retail, education, hospitality, and healthcare (Phase 3). Vetted operatives, transparent timelines, documented contracts.",
  openGraph: {
    title: "Tarnshire For Business — Sectors",
    description: "Six sectors. One standard. Commercial cleaning across Greater Manchester.",
    images: ["/img/1-4.jpg"],
  },
};

export default function SectorsIndexPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="For Business"
          headline="Six sectors. One standard."
          lede="Tarnshire serves six commercial sectors across Greater Manchester with the same vetting, the same documentation, and the same accountability. Five sectors are open for engagement now; healthcare opens by referral in Q3 2026."
        />
        <SectorsGrid />
        <BusinessFinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
