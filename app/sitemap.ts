import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vorlos.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
