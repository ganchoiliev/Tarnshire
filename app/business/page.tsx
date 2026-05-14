import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BusinessHero } from "@/components/business/BusinessHero";
import { SectorsGrid } from "@/components/business/SectorsGrid";
import { CommercialTimeline } from "@/components/business/CommercialTimeline";
import { AccreditationsStrip } from "@/components/business/AccreditationsStrip";
import { CaseStudyBand } from "@/components/business/CaseStudyBand";
import { BusinessPullQuote } from "@/components/business/BusinessPullQuote";
import { BusinessFinalCTA } from "@/components/business/BusinessFinalCTA";

export const metadata: Metadata = {
  title: "For Business — Commercial cleaning contracts across Greater Manchester",
  description:
    "Commercial cleaning across Greater Manchester. DBS-checked operatives, £2M insurance, COSHH-trained, transparent timelines. Quote within 24 hours of inquiry.",
  openGraph: {
    title: "Tarnshire For Business — Commercial cleaning in Greater Manchester",
    description:
      "Vetted operatives, transparent timelines, documented contracts. Walkthrough within 5 working days.",
    images: ["/img/1-4.jpg"],
  },
};

export default function ForBusinessPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <BusinessHero />
        <SectorsGrid />
        <CommercialTimeline />
        <AccreditationsStrip />
        <CaseStudyBand />
        <BusinessPullQuote />
        <BusinessFinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
