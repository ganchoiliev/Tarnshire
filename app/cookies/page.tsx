import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { LegalPlaceholder } from "@/components/shared/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Cookies — Tarnshire",
  description:
    "Tarnshire cookie policy. Currently in placeholder form, being drafted alongside our terms and privacy policy for publication in Q3 2026.",
};

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Legal"
          headline="Cookies."
          lede="Tarnshire uses the smallest possible number of cookies. The formal policy will be published alongside the terms and privacy policy in Q3 2026."
        />
        <LegalPlaceholder
          lastUpdated="May 2026"
          intendedPolicy={[
            "Essential cookies only by default — session management, security, accessibility preferences. No consent required under UK PECR for these.",
            "Analytics cookies on opt-in only — privacy-respecting product analytics (Plausible or similar) loaded only after explicit consent. No Google Analytics, no Facebook Pixel.",
            "No behavioural advertising cookies — Tarnshire does not advertise on third-party networks that require tracking pixels.",
            "Consent banner — appears once on first visit, choice persists, withdrawable at any time from the footer link.",
            "Third-party cookies from embedded services (Stripe Elements during checkout, Vercel analytics) — disclosed individually with their own opt-in.",
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
