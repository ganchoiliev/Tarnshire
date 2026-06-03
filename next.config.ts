import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (≈20% smaller than WebP), falling back to WebP, then the
    // original. Cuts hero/LCP image weight on modern browsers at no quality cost.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
