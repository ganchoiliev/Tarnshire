import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { Prose } from "@/components/shared/Prose";
import { AccreditationsStrip } from "@/components/business/AccreditationsStrip";
import {
  AccreditationDetails,
  type AccreditationDetail,
} from "@/components/business/AccreditationDetails";
import { BusinessFinalCTA } from "@/components/business/BusinessFinalCTA";

const details: AccreditationDetail[] = [
  {
    title: "DBS-checked operatives",
    status: "in-place",
    body: [
      "Every Tarnshire operative passes a Disclosure and Barring Service (DBS) check before their first paid clean. Standard DBS for commercial environments without enhanced safeguarding requirements; Enhanced DBS for any operative entering an education setting under the Safeguarding Vulnerable Groups Act 2006.",
      "DBS checks are renewed every three years for active operatives, and the certificate number is held on file alongside the operative's vetting record. Documentation is available for client audits within 24 hours of any request.",
    ],
    evidence:
      "DBS certificate copies on the operative's vetting file; held by Tarnshire and presentable on procurement request.",
  },
  {
    title: "£2M public liability insurance",
    status: "in-place",
    body: [
      "Tarnshire holds £2 million public liability insurance cover for every commercial engagement, with no exclusions for the cleaning categories we operate. Cover extends to accidental damage to client property, third-party injury on client premises during scheduled work, and consequential loss within the policy limit.",
      "Insurance documentation — policy schedule, certificate of currency, claims history — is supplied as a standard onboarding pack to every commercial client at contract signing. Renewal date is monitored centrally; cover never lapses between renewals.",
    ],
    evidence: "Insurance schedule and certificate of currency, supplied at contract signing and on annual renewal.",
  },
  {
    title: "COSHH-trained operatives",
    status: "in-place",
    body: [
      "Control of Substances Hazardous to Health (COSHH) Regulations 2002 require every operative handling cleaning chemicals to be trained in safe storage, use, dilution, and disposal. Every Tarnshire operative completes COSHH training before first paid work, with refresher training annually.",
      "Training records, chemical safety data sheets, and the operative's COSHH competence assessment are held on file. Risk assessments specific to each client site are produced during the walkthrough phase and signed off before first clean.",
    ],
    evidence:
      "Training certificates and site-specific COSHH risk assessments on file; presentable on procurement request.",
  },
  {
    title: "Reference-verified network",
    status: "in-place",
    body: [
      "Every operative joining the Tarnshire network is reference-verified against a minimum of two prior employers in housekeeping or commercial cleaning. References are contacted by the standards lead, not by automated systems, and the conversation is logged.",
      "Reference checks are dated, the contact details of the referee are held on file, and the operative's vetting record is incomplete until both references are confirmed positively. No exceptions for operative supply pressure.",
    ],
    evidence: "Reference contact log on each operative's vetting file.",
  },
  {
    title: "SafeContractor accreditation",
    status: "working-toward",
    targetDate: "Q3 2026",
    body: [
      "SafeContractor is one of the UK's most widely-recognised health-and-safety pre-qualification schemes. Accreditation requires demonstration of compliant health-and-safety policies, risk assessments, accident reporting procedures, and training records.",
      "Tarnshire's application for SafeContractor accreditation is targeted for Q3 2026, alongside the first cornerstone commercial contracts. Once granted, the SafeContractor badge appears on this page and in commercial proposal documents.",
    ],
  },
  {
    title: "BICSc training certification",
    status: "working-toward",
    targetDate: "Q4 2026",
    body: [
      "The British Institute of Cleaning Science (BICSc) is the UK's professional body for the cleaning industry. BICSc Certification of Professional Standards demonstrates that operatives have been trained against an audited, sector-recognised curriculum covering cleaning chemistry, surface science, infection control, and equipment operation.",
      "Tarnshire is enrolling its first operative cohort in BICSc Cleaning Operators Proficiency Certification (COPC) starting Q3 2026, with target full certification across the active operative base by Q4 2026.",
    ],
  },
  {
    title: "ISO 9001 quality management",
    status: "working-toward",
    targetDate: "Q4 2026",
    body: [
      "ISO 9001:2015 is the international standard for quality management systems. Certification requires documented processes, measurable quality objectives, internal auditing, and continuous improvement procedures — all assessed by a UKAS-accredited certification body.",
      "Tarnshire's quality management system is being built through 2026 against ISO 9001 requirements, with a target external audit and initial certification in Q4 2026. Until certification lands, our processes follow ISO 9001 principles without claiming the certification itself.",
    ],
  },
  {
    title: "ISO 14001 environmental management",
    status: "working-toward",
    targetDate: "Q1 2027",
    body: [
      "ISO 14001:2015 is the international standard for environmental management systems. Certification requires documented environmental policies, impact assessments, regulatory compliance, and reduction targets for waste, water, energy, and chemical use.",
      "Tarnshire's environmental management system follows behind the ISO 9001 work by approximately one quarter, with target certification in Q1 2027. Cleaning is a chemical- and water-intensive industry; ISO 14001 sits at the heart of any premium positioning in the category.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Accreditations · Tarnshire For Business",
  description:
    "Tarnshire publishes what we hold and what we're earning. DBS, £2M insurance, COSHH, reference-verified in place day one. SafeContractor, BICSc, ISO 9001, ISO 14001 in progress through 2026 and into 2027.",
  openGraph: {
    title: "Tarnshire — Accreditations",
    description: "What's in place. What's coming. Procurement-grade transparency.",
    images: ["/img/1-4.jpg"],
  },
};

export default function AccreditationsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Accreditations"
          headline="What's in place. What's coming."
          lede="Tarnshire holds four credentials at the day-one launch standard: DBS-checked operatives, £2M public liability insurance, COSHH-trained operatives, and a reference-verified contractor network. Four more — SafeContractor, BICSc, ISO 9001, ISO 14001 — are being earned through 2026 and into 2027. This page publishes the full status of both lists, with target dates."
        />

        <Prose
          eyebrow="Why we publish this"
          heading="Procurement teams shouldn't have to read between the lines."
          background="bone-soft"
        >
          <p>
            The standard pattern for cleaning brands is to surface every accreditation badge they might one day hold, accept, or be associated with — and to let the procurement reader assume the brand currently holds each one. The reader then has to verify each badge individually, often discovering that the cleaning brand is &ldquo;a member of&rdquo; a body that doesn&apos;t certify, or &ldquo;compliant with&rdquo; a standard they haven&apos;t been audited against.
          </p>
          <p>
            Tarnshire takes the opposite position. We publish what we currently hold, with the evidence file on hand, and we publish what we&apos;re working toward, with the target date and the auditing body. Procurement teams comparing Tarnshire to incumbent cleaning suppliers should find this page more useful than a competitor&apos;s accreditation page that lists ten badges without dates or evidence pointers.
          </p>
          <p>
            If you&apos;re evaluating a commercial cleaning bid, the questions worth asking any prospective supplier are: <strong>which accreditations do you currently hold</strong>, <strong>when was the most recent certification audit</strong>, and <strong>what&apos;s the renewal date</strong>. The answers to those three questions, for Tarnshire and for every supplier, should be findable on a page like this one — not requested by email, not promised on a call, not implied by a badge in a footer.
          </p>
        </Prose>

        <AccreditationsStrip />

        <AccreditationDetails details={details} />

        <BusinessFinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
