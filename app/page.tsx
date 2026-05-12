import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RouteSplit } from "@/components/home/RouteSplit";
import { TrustStrip } from "@/components/home/TrustStrip";

export const metadata: Metadata = {
  title: "Tarnshire — Premium cleaning across Greater Manchester",
  description:
    "Premium domestic housekeeping with instant booking, plus accredited commercial cleaning across Greater Manchester. Same cleaner every visit. DBS-checked. Fully insured.",
  openGraph: {
    title: "Tarnshire — Premium cleaning across Greater Manchester",
    description:
      "Premium domestic housekeeping and accredited commercial cleaning across Greater Manchester. Same cleaner every visit.",
    images: ["/img/1-3.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <RouteSplit />
        <TrustStrip />
      </main>
      <SiteFooter />
    </>
  );
}
