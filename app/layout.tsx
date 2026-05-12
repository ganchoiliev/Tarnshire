import type { Metadata } from "next";
import { playfair, dmSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tarnshire — Premium cleaning across Greater Manchester",
    template: "%s · Tarnshire",
  },
  description:
    "Premium domestic housekeeping and accredited commercial cleaning across Greater Manchester. Same cleaner every visit. ISO 9001, BICSc, DBS-checked.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tarnshire.co.uk"
  ),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Tarnshire",
  },
  robots: {
    index: false,
    follow: false,
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
        {children}
      </body>
    </html>
  );
}
