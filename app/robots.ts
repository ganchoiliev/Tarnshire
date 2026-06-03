import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Launch-state robots policy. Crawling of the public domestic site is allowed;
// the operational surfaces stay out of bounds:
//   /admin:    internal ops console (also auth-gated)
//   /business: the B2B subtree, intentionally unlinked and noindex pre-launch
//
// Note: site-wide *indexing* is still suppressed by the root layout's
// `robots: { index: false }` meta until launch (Stage 5). robots.txt governs
// crawling, not indexing, so the two are deliberately separate. Flipping the
// one meta boolean at launch is all that's needed to go live.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/business"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
