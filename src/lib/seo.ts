import type { Metadata } from "next";
import { getSiteUrl } from "@/config/site";

export function pageMetadata({
  title,
  description,
  path,
  image = "/assets/images/home/cozinha-hero.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  return {
    title,
    description,
    // canonical, og:url e og:image absolutos só existem com o domínio oficial configurado
    ...(siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "MAPASA",
      title,
      description,
      ...(siteUrl ? { url: `${siteUrl}${path}`, images: [{ url: image }] } : {}),
    },
  };
}
