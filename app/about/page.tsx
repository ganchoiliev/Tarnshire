import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { Prose } from "@/components/shared/Prose";

export const metadata: Metadata = {
  title: "About — Tarnshire",
  description:
    "Tarnshire is a premium cleaning brand for Greater Manchester. Same cleaner every visit. Transparent pricing. Accreditations published, not boasted.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="About"
          headline="Premium cleaning, kept honest."
          lede="Tarnshire is a Greater Manchester cleaning brand built on three commitments: the same cleaner every visit, transparent pricing, and accreditations published rather than boasted. We launch in 2026 from Didsbury, Chorlton, and Withington — and we publish what's true today, not what we hope will be true tomorrow."
        />

        <Prose eyebrow="What we do" heading="Two products, one brand.">
          <p>
            Tarnshire operates two cleaning products under one brand. Premium recurring housekeeping for households in our launch postcodes, with instant online booking and the same cleaner every visit. Accredited commercial cleaning for offices, gyms, retail, education, and hospitality across Greater Manchester, with documented quote timelines and contract terms before any operative steps on site.
          </p>
          <p>
            Both products share the same vetted contractor network and the same standards. The same cleaner who cleans a Didsbury family home on Wednesday morning may clean a Spinningfields office on Wednesday evening. The work is the same. The standards are the same. The pay is the same.
          </p>
        </Prose>

        <Prose eyebrow="What we believe" heading="Three commitments. No deviation." background="bone-soft">
          <h3>The same cleaner, every visit</h3>
          <p>
            Cleaning is intimate work. The person who knows your home shouldn&apos;t change every week. Every Tarnshire recurring customer is matched to a single named cleaner for the long term. If that cleaner is on holiday or unwell, you&apos;re told before the visit — not surprised at the door.
          </p>
          <h3>Transparent pricing</h3>
          <p>
            Every domestic rate is published on the pricing page. Every commercial engagement runs on a documented timeline: quote within 24 hours, walkthrough within five working days, contract signed before first clean. No quote-call gauntlet, no surprises, no &ldquo;depends on the site&rdquo; hedges.
          </p>
          <h3>Accreditations published, not boasted</h3>
          <p>
            Tarnshire holds DBS-checked operatives, £2M public liability insurance, COSHH training, and reference-verified contractors from day one. We&apos;re working toward ISO 9001, ISO 14001, BICSc, and SafeContractor through 2026 and early 2027. We publish both lists. We don&apos;t claim what we haven&apos;t earned.
          </p>
        </Prose>

        <Prose eyebrow="Where we work" heading="South Manchester first. Greater Manchester next.">
          <p>
            Tarnshire launches in three postcodes — <strong>M20 Didsbury, M21 Chorlton, and M14 Withington</strong> — the South Manchester premium triangle where recurring premium-domestic demand concentrates. From there we expand outward through 2026 and 2027: Sale, Altrincham, Hale, and Wilmslow in Q3 2026; central Manchester and Salford Quays for commercial work in Q4 2026; the outer Greater Manchester boroughs through a partner-operator model from 2027.
          </p>
          <p>
            Every Greater Manchester borough has a landing page on this site, even the ones where Tarnshire isn&apos;t operationally live yet. The pages where we are live show &ldquo;Available now&rdquo; and a booking link. The pages where we&apos;re not yet live show &ldquo;Coming soon&rdquo; and a waitlist. We don&apos;t pretend to operate in postcodes we don&apos;t cover.
          </p>
        </Prose>

        <Prose eyebrow="About the name" heading="Tarn and shire." background="bone-soft">
          <p>
            Tarn is the Cumbrian and Old English word for a small mountain lake — the still bodies of water that gather in the high places of the Lake District and the Yorkshire Dales. Shire is the Old English administrative suffix for a region: Lancashire, Yorkshire, Cheshire. The compound is coined: there is no real Tarnshire on the map of England, and the brand has the freedom to define what the name means.
          </p>
          <p>
            We chose it for what it carries: northern English heritage without parochialism, administrative gravitas for commercial procurement, the quiet reverence of the upland water for the domestic register. It also passed the only naming test that matters: both <strong>tarnshire.co.uk</strong> and <strong>tarnshire.com</strong> were available the day we needed them.
          </p>
        </Prose>
      </main>
      <SiteFooter />
    </>
  );
}
