import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { CleanerShowcase } from "@/components/home/CleanerShowcase";
import { VettingChecklist } from "@/components/home/VettingChecklist";

export const metadata: Metadata = {
  title: "Our Cleaners — Tarnshire",
  description:
    "Every Tarnshire cleaner is DBS-checked, reference-verified, insured, and matched to a single recurring customer. This page goes live with portraits when our first contractors hire.",
};

export default function OurCleanersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Our Cleaners"
          headline="The people behind every visit."
          lede="This page goes live with named portraits when our first contractors complete vetting. Until then: a recruitment pitch and an honest account of how we hire."
        />
        <ComingSoon
          label="Activates with first hires"
          heading="No fictional faces."
          body="Tarnshire does not synthesise contractor portraits or invent names to fill this page. The brand's same-cleaner promise depends on every face here being a real person you can actually book. Until our first cleaners have completed vetting and consented to portrait photography, this page surfaces our standards and our open positions instead."
          activatesWhen="Estimated activation: Q3 2026"
        />
        <VettingChecklist />
        <CleanerShowcase />
      </main>
      <SiteFooter />
    </>
  );
}
