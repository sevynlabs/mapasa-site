import { getSiteUrl, siteSettings } from "@/config/site";

/**
 * Dados estruturados Organization/LocalBusiness.
 * Publicados SOMENTE com dados reais configurados em src/config/site.ts.
 */
export function StructuredData() {
  const s = siteSettings;
  const hasLocalData = Boolean(s.address && s.city && s.state);
  const sameAs = [s.instagram, s.facebook, s.youtube].filter(Boolean);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": hasLocalData ? "LocalBusiness" : "Organization",
    name: s.companyName,
    url: getSiteUrl() ?? undefined,
  };
  if (s.phone) data.telephone = s.phone;
  if (s.email) data.email = s.email;
  if (sameAs.length) data.sameAs = sameAs;
  if (hasLocalData) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: s.address,
      addressLocality: s.city,
      addressRegion: s.state,
      addressCountry: "BR",
    };
  }
  if (!s.domain) return null; // só publica após configuração do domínio oficial

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
