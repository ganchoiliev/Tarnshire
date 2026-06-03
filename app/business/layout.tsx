import type { Metadata } from "next";

// The commercial (B2B) surface is intentionally kept in the repo but unlinked
// from navigation and excluded from search. The root layout currently sets
// site-wide noindex pre-launch; defining robots here ensures the /business
// subtree stays noindex even after the root flips to index:true at launch
// (the nearest segment that defines `robots` wins).
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
