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
  title: "Tarnshire · Premium domestic cleaning in Greater Manchester",
  description:
    "Premium recurring home cleaning for South Manchester households in M20, M21 and M14. The same cleaner every visit, DBS-checked and fully insured.",
  openGraph: {
    title: "Tarnshire · Premium domestic cleaning in Greater Manchester",
    description:
      "Premium recurring home cleaning in M20, M21 and M14. The same cleaner every visit, DBS-checked and fully insured.",
    images: ["/img/1-3.jpg"],
  },
};

export default function HomePage() {
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
