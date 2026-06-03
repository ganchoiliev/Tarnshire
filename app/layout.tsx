import type { Metadata } from "next";
import { playfair, dmSans } from "./fonts";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tarnshire · Premium domestic cleaning in Greater Manchester",
    template: "%s · Tarnshire",
  },
  description:
    "Premium recurring home cleaning in Greater Manchester, currently serving M20, M21 and M14. The same cleaner every visit, DBS-checked and fully insured.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Tarnshire",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${dmSans.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-sans-loaded), var(--font-sans)",
        }}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
