import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

// Everything on taffybuckets.com is public marketing + legal copy, so the whole
// site is crawlable. /api is disallowed only because it holds the waitlist POST
// route, which has nothing to index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
