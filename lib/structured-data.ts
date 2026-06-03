import { SITE_URL, absoluteUrl, LEGAL } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { DEEP_CLEAN_RATES, fromPrice } from "@/lib/booking";

// LocalBusiness structured data for the home brand. Every value here is REAL and
// verifiable. Search engines (and Google's spam systems) penalise fabricated
// structured data, and the site's own ethos forbids invented facts:
//   • address      → the registered office of Brushly Ltd (the legal entity)
//   • email        → a monitored inbox; NO telephone is claimed (line opens Q3 2026)
//   • areaServed   → the three launch postcode districts (lib/booking LAUNCH_POSTCODES)
//   • offers/prices→ the two genuinely bookable services, priced from the same
//                    engine the checkout charges from (lib/booking), so schema
//                    can never advertise a rate we would not honour
//   • NO aggregateRating/review → the reviews list is intentionally empty until
//                    real, consented reviews exist (lib/reviews)

const BUSINESS_ID = `${SITE_URL}/#business`;

/** Lowest published per-visit rate to the highest, both straight from the engine. */
const PRICE_FLOOR = fromPrice("standard"); // 35 (studio standard clean)
const PRICE_CEILING = Math.max(...Object.values(DEEP_CLEAN_RATES)); // 230 (5+ bed deep clean)

function gbpOffer(opts: {
  name: string;
  description: string;
  serviceType: string;
  minPrice: number;
  url: string;
}): Record<string, unknown> {
  return {
    "@type": "Offer",
    priceCurrency: "GBP",
    // "From" pricing: price varies by home size, so the offer states the floor.
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "GBP",
      minPrice: opts.minPrice,
    },
    availability: "https://schema.org/InStock",
    url: opts.url,
    itemOffered: {
      "@type": "Service",
      name: opts.name,
      description: opts.description,
      serviceType: opts.serviceType,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Manchester" },
    },
  };
}

/**
 * The LocalBusiness graph rendered on the homepage. `LocalBusiness` is the
 * canonical, validator-clean schema.org type for a service business (it cleanly
 * satisfies a "cleaning service" without an invalid/unknown @type).
 */
export function localBusinessSchema(): Record<string, unknown> {
  const office = LEGAL.registeredOffice;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: LEGAL.tradingName,
    legalName: LEGAL.legalName,
    description:
      "Premium recurring home cleaning across South Manchester. The same DBS-checked, fully insured cleaner every visit. Currently serving the M20, M21 and M14 postcode districts.",
    url: SITE_URL,
    image: absoluteUrl(IMAGES.heroHome),
    email: LEGAL.email,
    priceRange: `£${PRICE_FLOOR}–£${PRICE_CEILING}`,
    currenciesAccepted: "GBP",
    paymentAccepted: "Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: office.streetAddress,
      addressLocality: office.addressLocality,
      postalCode: office.postalCode,
      addressCountry: office.addressCountry,
    },
    // Service-area business: the three launch postcode districts and the city
    // they sit in. Locality names mirror the site's own published framing.
    areaServed: [
      { "@type": "City", name: "Manchester" },
      { "@type": "Place", name: "Didsbury, M20" },
      { "@type": "Place", name: "Chorlton, M21" },
      { "@type": "Place", name: "Withington, M14" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Domestic cleaning services",
      itemListElement: [
        gbpOffer({
          name: "Regular home cleaning",
          description:
            "Recurring weekly or fortnightly home cleaning with the same cleaner every visit. Priced by the size of your home.",
          serviceType: "Recurring domestic cleaning",
          minPrice: fromPrice("standard"),
          url: absoluteUrl("/home/pricing"),
        }),
        gbpOffer({
          name: "Tarnshire Deep Clean",
          description:
            "A one-off, top-to-bottom deep clean for move-in, move-out, post-renovation or pre-event. 4-hour minimum visit, flat price by home size.",
          serviceType: "One-off deep cleaning",
          minPrice: fromPrice("deep_clean"),
          url: absoluteUrl("/home/deep-clean"),
        }),
      ],
    },
  };
}
