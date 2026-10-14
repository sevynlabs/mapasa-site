export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { publishedProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  if (!base) return []; // sem domínio oficial, o sitemap fica vazio (evita URLs de teste)
  const routes = ["", "/eucalipto", "/moveis-planejados", "/projetos", "/sobre", "/contato", "/privacidade"];
  const now = new Date();
  return [
    ...routes.map((r) => ({
      url: `${base}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : r === "/privacidade" ? 0.3 : 0.8,
    })),
    ...publishedProjects().map((p) => ({
      url: `${base}/projetos/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
