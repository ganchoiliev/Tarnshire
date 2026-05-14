import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomeHero } from "@/components/home/HomeHero";
import { ServicesRow } from "@/components/home/ServicesRow";
import { PricingSnapshot } from "@/components/home/PricingSnapshot";
import { VettingChecklist } from "@/components/home/VettingChecklist";
import { CleanerShowcase } from "@/components/home/CleanerShowcase";
import { LaunchOffer } from "@/components/home/LaunchOffer";
import { EditorialPullQuote } from "@/components/home/EditorialPullQuote";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "For Home — Premium recurring housekeeping in M20, M21, M14",
  description:
    "Premium recurring housekeeping in Didsbury, Chorlton, and Withington. Same cleaner every visit. DBS-checked, insured, instantly bookable.",
  openGraph: {
    title: "Tarnshire For Home — Premium recurring housekeeping in Manchester",
    description:
      "Same cleaner every visit. Vetted, insured, instantly bookable across M20, M21, and M14.",
    images: ["/img/1-3.jpg"],
  },
};

export default function ForHomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />
        <ServicesRow />
        <PricingSnapshot />
        <VettingChecklist />
        <CleanerShowcase />
        <LaunchOffer />
        <EditorialPullQuote />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
