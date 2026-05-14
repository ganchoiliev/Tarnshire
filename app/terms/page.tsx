import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { LegalPlaceholder } from "@/components/shared/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Terms — Tarnshire",
  description:
    "Tarnshire terms of service. Currently in placeholder form, being drafted with a UK solicitor for publication in Q3 2026.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Legal"
          headline="Terms of service."
          lede="The formal terms are being drafted with a UK solicitor and will be published before Tarnshire begins commercial trading."
        />
        <LegalPlaceholder
          lastUpdated="May 2026"
          intendedPolicy={[
            "Booking terms — what a customer commits to when they book, when they can cancel without charge, when they cannot.",
            "Service standards — what Tarnshire commits to deliver on every visit, including re-clean policy if standards are not met.",
            "Contractor terms — the basis on which contractors operate within the Tarnshire network, including pay schedule, insurance cover, and dispute resolution.",
            "Liability and indemnity — the financial limits of Tarnshire's responsibility, and the insurance backing that responsibility.",
            "Termination — how either party can end a recurring arrangement, with notice periods and break clauses.",
            "Jurisdiction — English and Welsh law, English courts.",
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
