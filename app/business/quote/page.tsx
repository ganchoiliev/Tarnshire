import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { QuoteFlow } from "@/components/business/quote/QuoteFlow";

export const metadata: Metadata = {
  title: "Request a quote · Tarnshire For Business",
  description:
    "Request a commercial cleaning quote from Tarnshire. Six-step form, response within 24 working hours, walkthrough within five working days.",
  openGraph: {
    title: "Tarnshire — Request a quote",
    description:
      "Commercial cleaning across Greater Manchester. Quote within 24 hours, walkthrough within 5 working days.",
    images: ["/img/1-4.jpg"],
  },
};

export default function QuotePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Request a quote"
          headline="Six steps, then a walkthrough."
          lede="The form below captures everything we need to bring a documented quote to your walkthrough. We respond within 24 working hours, and we'll be on site within five working days."
        />
        <QuoteFlow />
      </main>
      <SiteFooter />
    </>
  );
}
