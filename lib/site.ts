// Single source of truth for the site's public origin and real, verifiable
// business facts. Everything here must stay TRUTHFUL: these values feed
// canonical URLs, the sitemap, robots, and LocalBusiness structured data, all
// of which search engines (and Google's spam systems) hold us to.

/** Canonical production origin, no trailing slash. Override per-environment. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tarnshire.co.uk"
).replace(/\/+$/, "");

/** Absolute URL for a site-relative path (e.g. absoluteUrl("/home/book")). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString().replace(/\/$/, "") || SITE_URL;
}

/**
 * Date this content/SEO pass was finalised for launch. Used as a stable
 * `lastModified` for the sitemap: a fixed, honest revision date is better for
 * crawlers than a build timestamp that changes on every deploy.
 */
export const CONTENT_REVISION = "2026-06-03";

/** The registered legal entity behind the Tarnshire trading name. */
export const LEGAL = {
  tradingName: "Tarnshire",
  legalName: "Brushly Ltd",
  companyNumber: "17056861",
  registeredOffice: {
    streetAddress: "18 Howard Road",
    addressLocality: "Reigate",
    postalCode: "RH2 7JE",
    addressCountry: "GB",
  },
  /** Real, monitored inbox. No phone line exists yet (opens Q3 2026). */
  email: "hello@tarnshire.co.uk",
} as const;
