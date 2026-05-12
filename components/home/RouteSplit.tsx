import { RouteSplitFunnel } from "./RouteSplitFunnel";
import { IMAGES } from "@/lib/images";

export function RouteSplit() {
  return (
    <section
      className="route-split grid grid-cols-1 md:grid-cols-[1fr_0.5px_1fr]"
      aria-label="Choose For Home or For Business"
    >
      <RouteSplitFunnel
        variant="home"
        label="For Home"
        headline="A quiet hour returned to your week."
        lede="Premium recurring housekeeping in M20, M21 and M14. Same cleaner every visit. Vetted, insured, and yours to keep."
        ctaLabel="Book in 90 seconds"
        ctaHref="/home"
        metaPrimary="From £42"
        metaSecondary="two cleaners, one hour · transparent pricing · cancel anytime"
        imageSrc={IMAGES.splitHome}
      />
      <div
        className="hidden md:block bg-[var(--color-neutral-100)]"
        aria-hidden
      />
      <RouteSplitFunnel
        variant="business"
        label="For Business"
        headline="Cleaning standards your facilities team can defend."
        lede="Commercial contracts across Greater Manchester. Accredited operatives, transparent pricing, walkthrough scheduled within five working days."
        ctaLabel="Request a quote"
        ctaHref="/business"
        metaPrimary="DBS · insured · COSHH"
        metaSecondary="compliance documented · response within 24 hours"
        imageSrc={IMAGES.splitBusiness}
      />
    </section>
  );
}
