import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { BookingFlow } from "@/components/home/book/BookingFlow";

export const metadata: Metadata = {
  title: "Book your first clean · Tarnshire",
  description:
    "Book a Tarnshire clean in Didsbury, Chorlton, or Withington. Transparent pricing, same cleaner every visit, four-step booking.",
  openGraph: {
    title: "Tarnshire — Book your first clean",
    description:
      "Transparent pricing, same cleaner every visit, instant booking across M20, M21, and M14.",
    images: ["/img/1-3.jpg"],
  },
};

export default function BookingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Book your first clean"
          headline="Four steps. Then we visit."
          lede="Tell us your postcode, your home, when we should visit, and where to send the confirmation. Estimated price updates as you go. We respond within 24 working hours to confirm the cleaner."
        />
        <BookingFlow />
      </main>
      <SiteFooter />
    </>
  );
}
