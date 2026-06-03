import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/shared/PageHero";
import { BookingFlow } from "@/components/home/book/BookingFlow";
import type { ServiceType } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Book your first clean · Tarnshire",
  description:
    "Book a Tarnshire clean in Didsbury, Chorlton, or Withington. Transparent pricing, same cleaner every visit, four-step booking.",
  alternates: { canonical: "/home/book" },
  openGraph: {
    title: "Tarnshire — Book your first clean",
    description:
      "Transparent pricing, same cleaner every visit, instant booking across M20, M21, and M14.",
    url: "/home/book",
    images: ["/img/1-3.jpg"],
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BookingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const rawService = Array.isArray(sp.service) ? sp.service[0] : sp.service;
  const serviceType: ServiceType = rawService === "deep_clean" ? "deep_clean" : "standard";
  const isDeepClean = serviceType === "deep_clean";

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={isDeepClean ? "Book a deep clean" : "Book your first clean"}
          headline={isDeepClean ? "Four hours. Top to bottom." : "Four steps. Then we visit."}
          lede={
            isDeepClean
              ? "A one-off, intensive clean for move-in, move-out, post-renovation, or whenever your home needs the deepest possible reset. 4-hour minimum visit. Estimated price updates as you go."
              : "Tell us your postcode, your home, when we should visit, and where to send the confirmation. Estimated price updates as you go. We respond within 24 working hours to confirm the cleaner."
          }
        />
        <BookingFlow initialServiceType={serviceType} />
      </main>
      <SiteFooter />
    </>
  );
}
