import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { LegalPlaceholder } from "@/components/shared/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Privacy — Tarnshire",
  description:
    "Tarnshire privacy policy. Currently in placeholder form, being drafted alongside our terms for publication in Q3 2026.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Legal"
          headline="Privacy policy."
          lede="The formal GDPR-compliant privacy policy is being drafted with our data-protection adviser and will be published before any personal data is collected at scale."
        />
        <LegalPlaceholder
          lastUpdated="May 2026"
          intendedPolicy={[
            "Data minimisation — Tarnshire collects only the data needed to deliver the service: postcode, contact details, booking history, payment method. No more.",
            "Purpose limitation — booking data is used to deliver the booking. Payment data is used to take payment. Contact data is used to contact you about your service. Nothing else.",
            "Storage and security — data held in Supabase London region (eu-west-2), encrypted at rest, accessed only via authenticated requests. Row-Level Security policies ensure customers see only their own data.",
            "Third-party processors — Stripe for payments, Resend for transactional email, Vercel for hosting. All UK or EU-based or with UK adequacy decisions in place.",
            "Your rights — access, rectification, erasure, portability, objection. Email hello@tarnshire.co.uk and we respond within 30 days as the UK GDPR requires.",
            "Cookies and analytics — see the separate cookies policy. Tarnshire does not use behavioural advertising trackers.",
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
