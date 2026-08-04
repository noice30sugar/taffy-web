import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

// Only the three public routes. /kit and /logo are internal design references
// and already opt out via `robots: { index: false }` in their own metadata.
//
// `lastModified` is the build timestamp — every deploy rebuilds these pages, and
// crawlers treat it as a weak recency hint rather than a precise content date.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
