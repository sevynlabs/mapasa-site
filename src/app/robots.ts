export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexingAllowed } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  const siteUrl = getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
