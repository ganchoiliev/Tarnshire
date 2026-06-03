import type { MetadataRoute } from "next";
import { absoluteUrl, CONTENT_REVISION } from "@/lib/site";

// Public, launch-ready domestic URLs only. Deliberately excluded:
//   /home:        308-redirects to "/" (no duplicate in the index)
//   /business/**: unlinked B2B subtree, noindex
//   /admin/**:    auth-gated ops console
// Indexing is still gated by the root layout's noindex meta until launch; this
// file is the index-time map that becomes live the moment that meta flips.
type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ROUTES: Entry[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/home/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/home/deep-clean", changeFrequency: "monthly", priority: 0.9 },
  { path: "/home/book", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/our-cleaners", changeFrequency: "yearly", priority: 0.4 },
  { path: "/the-almanac", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_REVISION,
    changeFrequency,
    priority,
  }));
}
