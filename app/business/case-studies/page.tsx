import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { Prose } from "@/components/shared/Prose";
import { CaseStudyBand } from "@/components/business/CaseStudyBand";
import { BusinessFinalCTA } from "@/components/business/BusinessFinalCTA";

export const metadata: Metadata = {
  title: "Case studies · Tarnshire For Business",
  description:
    "Real cornerstone clients land on this page through 2026. Until then, the shape of contracts Tarnshire is bidding now: sector, size band, frequency, area, outcome metric.",
  openGraph: {
    title: "Tarnshire — Case studies",
    description: "Named cornerstone clients coming through 2026. The shape of contracts being bid now.",
    images: ["/img/1-4.jpg"],
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Case studies"
          headline="Named cornerstone clients, coming through 2026."
          lede="Tarnshire publishes case studies the way procurement teams want to read them — sector, building size, cleaning frequency, geographic area, and a measurable outcome metric, all with the named client's consent. None of those exist yet. The shape of the contracts we're bidding right now is below."
        />

        <Prose eyebrow="Why this matters" heading="The case studies you won't read on a competitor site.">
          <p>
            Every commercial cleaning brand publishes &ldquo;case studies.&rdquo; Almost none publish ones that are useful to a procurement team. The standard pattern is a generic photograph, a paragraph of marketing copy, an anonymous client name, and no measurable outcome — the kind of content that fills space without informing a buying decision.
          </p>
          <p>
            Tarnshire&apos;s commitment is different. When a cornerstone client is signed, agreed, and consents to publication, the case study that lands on this page contains <strong>five pieces of information</strong>: the named client, their sector, the building&apos;s measurable scope (square footage and frequency), the geographic area, and an outcome metric agreed with the client (response time, audit pass rate, contractor continuity rate, or another metric that matters to the client&apos;s operation). Nothing more. No padding.
          </p>
        </Prose>

        <CaseStudyBand />

        <Prose eyebrow="The format" heading="What a real case study looks like, when one lands." background="bone-soft">
          <p>When the first cornerstone client signs and consents, the placeholder cards above swap for case studies that read like this in structure:</p>
          <h3>The client</h3>
          <p>Named at first reference, with their sector and geographic area. No anonymous &ldquo;a leading Manchester firm&rdquo; hedges. If the client doesn&apos;t want naming, the case study doesn&apos;t get published.</p>
          <h3>The scope</h3>
          <p>Measurable. Square footage of the cleaning footprint, cleaning frequency, scope inclusions and exclusions, contract length. A procurement reader should be able to compare directly to their own building.</p>
          <h3>The standard</h3>
          <p>The accreditations Tarnshire holds at the time of the case study, the operatives&apos; specific vetting depth (DBS or Enhanced DBS), the documentation supplied to the client (audit logs, photo evidence, COSHH records).</p>
          <h3>The outcome</h3>
          <p>One metric, agreed with the client before publication. Examples: average response time to ad-hoc requests, number of audit passes per year, contractor continuity rate over a 12-month period, percentage of scheduled visits delivered on time. One number, defensible, evidence on file.</p>
          <h3>What we won&apos;t publish</h3>
          <p>No invented quotes. No anonymous endorsements. No metrics we can&apos;t evidence with documentation. No case studies the client hasn&apos;t signed off in writing.</p>
        </Prose>

        <BusinessFinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
