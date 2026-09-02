import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

// Everything on taffybuckets.com is public marketing + legal copy, so the whole
// site is crawlable. /kit and /logo are internal design references and opt out
// individually via `robots: { index: false }` in their own metadata.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
