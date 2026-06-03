import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RouteSplit } from "@/components/home/RouteSplit";
import { TrustStrip } from "@/components/home/TrustStrip";

export const metadata: Metadata = {
  title: "Tarnshire · Premium domestic cleaning in Greater Manchester",
  description:
    "Premium recurring home cleaning for South Manchester households in M20, M21 and M14. The same cleaner every visit, DBS-checked and fully insured.",
  openGraph: {
    title: "Tarnshire · Premium domestic cleaning in Greater Manchester",
    description:
      "Premium recurring home cleaning in M20, M21 and M14. The same cleaner every visit, DBS-checked and fully insured.",
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
