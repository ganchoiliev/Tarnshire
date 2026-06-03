import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomeHero } from "@/components/home/HomeHero";
import { TrustSignals } from "@/components/home/TrustSignals";
import { ServicesRow } from "@/components/home/ServicesRow";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PricingSnapshot } from "@/components/home/PricingSnapshot";
import { VettingChecklist } from "@/components/home/VettingChecklist";
import { CleanerCoverage } from "@/components/home/CleanerCoverage";
import { LaunchOffer } from "@/components/home/LaunchOffer";
import { Reviews } from "@/components/home/Reviews";
import { EditorialPullQuote } from "@/components/home/EditorialPullQuote";
import { FinalCTA } from "@/components/home/FinalCTA";
import { MobileBookBar } from "@/components/home/MobileBookBar";

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
        <TrustSignals />
        <ServicesRow />
        <HowItWorks />
        <PricingSnapshot />
        <VettingChecklist />
        <CleanerCoverage />
        <LaunchOffer />
        <Reviews />
        <EditorialPullQuote />
        <FinalCTA />
      </main>
      <SiteFooter />
      <MobileBookBar />
    </>
  );
}
