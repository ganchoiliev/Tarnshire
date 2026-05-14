import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { Prose } from "@/components/shared/Prose";
import { CleanerShowcase } from "@/components/home/CleanerShowcase";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers — Tarnshire",
  description:
    "Become a Tarnshire cleaner. Self-employed, fairly paid, with your own recurring clients. We're hiring across Didsbury, Chorlton, and Withington.",
};

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Careers"
          headline="Become a Tarnshire cleaner."
          lede="Self-employed, fairly paid, with your own recurring clients in your own borough. Tarnshire is hiring our founding contractor cohort across Didsbury, Chorlton, and Withington now."
        >
          <Button
            href="mailto:careers@tarnshire.co.uk?subject=Application%20%E2%80%94%20Tarnshire%20cleaner"
            variant="primary"
            size="lg"
          >
            Apply to join the network
          </Button>
        </PageHero>

        <Prose eyebrow="What we offer" heading="The deal.">
          <ul>
            <li>
              <strong>Self-employed, not zero-hours.</strong> You&apos;re a contractor, not an employee. You set your weekly availability, you choose your recurring clients, you bill on a schedule that works for you.
            </li>
            <li>
              <strong>Fair pay.</strong> Our domestic rate to customers is £42 for two cleaners for one hour. Our contractors take home above the Manchester Living Wage on every paid hour. Documented, on the contract, no game.
            </li>
            <li>
              <strong>Recurring clients, not piecework.</strong> The same customers every week or fortnight. Build relationships. Get good at one home, then another, then another.
            </li>
            <li>
              <strong>Equipment supplied or reimbursed.</strong> Tarnshire-branded equipment kit on first day, or full reimbursement for your existing professional kit.
            </li>
            <li>
              <strong>Insurance covered.</strong> Public liability insurance for every visit, covered by Tarnshire as part of the contractor agreement.
            </li>
          </ul>
        </Prose>

        <Prose eyebrow="What we look for" heading="The standards we hire to." background="bone-soft">
          <ul>
            <li>
              <strong>Six months minimum housekeeping experience.</strong> No trainees on the network. Demonstrable paid work behind you.
            </li>
            <li>
              <strong>UK right-to-work.</strong> Required by law. Document checked at interview.
            </li>
            <li>
              <strong>DBS clearance.</strong> We pay for the check. Cleared before first job.
            </li>
            <li>
              <strong>Two prior employer references.</strong> Contacted by our standards lead before a contract is offered.
            </li>
            <li>
              <strong>In-person trial clean.</strong> Paid at standard rate. Worked alongside our standards lead so we both know how the work will land.
            </li>
          </ul>
        </Prose>

        <CleanerShowcase />

        <section className="py-20 md:py-28 bg-[var(--color-bone-soft)] border-t border-[var(--color-neutral-100)]">
          <Container width="narrow" className="text-center">
            <h2
              className="font-medium text-[var(--color-ink)] mb-5"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-lg)",
                lineHeight: 1.0,
                letterSpacing: "var(--tracking-display)",
              }}
            >
              Ready to apply?
            </h2>
            <p
              className="text-[var(--color-neutral-700)] mb-10 mx-auto max-w-[520px]"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            >
              Send us your name, the borough you&apos;d work in, your housekeeping experience to date, and a sentence about why you&apos;d choose Tarnshire over another cleaning brand.
            </p>
            <div className="inline-flex">
              <Button
                href="mailto:careers@tarnshire.co.uk?subject=Application%20%E2%80%94%20Tarnshire%20cleaner"
                variant="primary"
                size="lg"
              >
                Apply by email
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
