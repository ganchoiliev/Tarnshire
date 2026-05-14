import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { Prose } from "@/components/shared/Prose";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "The Almanac — Tarnshire",
  description:
    "The editorial home of Tarnshire. Longform writing on care, the north, standards, and case studies. Launching alongside our first contracts in 2026.",
};

export default function TheAlmanacPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="The Almanac"
          headline="A yearly record of care, kept on the page."
          lede="The Almanac is Tarnshire's editorial home. It's where we publish what we learn about premium cleaning, about Greater Manchester, about the standards we hold to, and the case studies that earn them."
        />
        <Prose eyebrow="The four categories" heading="What you'll find here." background="bone-soft">
          <h3>Care</h3>
          <p>
            Technique deep-dives. The materials, methods, and judgment calls that distinguish a premium clean from a checkbox one. Written by the people who do the work.
          </p>
          <h3>The North</h3>
          <p>
            Greater Manchester through a housekeeping lens. Neighbourhood guides, property-stock characteristics, the cleaning challenges peculiar to Victorian terraces, MediaCity apartments, and Cheshire estates.
          </p>
          <h3>Standards</h3>
          <p>
            Compliance explainers, accreditation walkthroughs, the difference between BICSc and ISO and CHAS and why each matters to a procurement team.
          </p>
          <h3>Studies</h3>
          <p>
            Real case studies once we have cornerstone clients with consent to publish. Measurable outcomes. Named clients. Documented work.
          </p>
        </Prose>
        <ComingSoon
          label="Launching with first contracts"
          heading="The first dispatch."
          body="The Almanac publishes its first issue alongside our first signed commercial contract and our first recurring domestic customer. We don't write about cleaning work we haven't yet done."
          activatesWhen="Estimated first issue: Q3 2026"
        />
      </main>
      <SiteFooter />
    </>
  );
}
