import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { CleanerCoverage } from "@/components/home/CleanerCoverage";
import { VettingChecklist } from "@/components/home/VettingChecklist";

export const metadata: Metadata = {
  title: "Our Cleaners — Tarnshire",
  description:
    "Tarnshire's cleaners are vetted, insured, independent professionals serving M20, M21 and M14 now, each matched to a single recurring customer. Real names and portraits appear only as each cleaner consents to photography.",
  alternates: { canonical: "/our-cleaners" },
};

export default function OurCleanersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Our Cleaners"
          headline="The people behind every visit."
          lede="Vetted, insured, independent professionals cleaning homes across Didsbury, Chorlton, and Withington now. Real names and portraits appear here only as each cleaner consents to photography. We never invent faces or profiles."
        />
        <ComingSoon
          label="Real people only"
          heading="No fictional faces."
          body="Our cleaners are real, vetted, and working now. We will not fill this page with synthesised portraits or invented names. Each cleaner's photo and name appear here only once they have consented to be photographed, so every face you see is someone you can actually book."
          activatesWhen="Portraits publish as each cleaner consents to photography."
        />
        <VettingChecklist />
        <CleanerCoverage />
      </main>
      <SiteFooter />
    </>
  );
}
