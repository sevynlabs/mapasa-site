/**
 * CONFIGURAÇÃO EMPRESARIAL CENTRAL — MAPASA
 * ------------------------------------------------------------
 * Todos os dados de contato do site saem DESTE arquivo.
 *
 * Dados confirmados pela MAPASA em 13/10/2026: WhatsApp, Instagram e endereço.
 * Os demais continuam `null` até confirmação — NÃO preencha com dados de exemplo.
 * Enquanto um campo estiver `null`:
 *   - ele não aparece no site;
 *   - botões de WhatsApp levam para a página /contato;
 *   - formulários oferecem a opção de copiar a solicitação (sem simular envio);
 *   - o mapa e os dados estruturados (LocalBusiness) não são publicados.
 *
 * Como preencher:
 *   whatsappE164: somente dígitos com DDI e DDD. Ex.: "5534999999999"
 *   phone:        formato de exibição. Ex.: "(34) 3333-3333"
 *   instagram:    URL completa do perfil.
 *   googleMapsUrl: link "Compartilhar" do Google Maps da empresa.
 *   domain:       URL pública final, sem barra no final. Ex.: "https://www.mapasa.com.br"
 */
export type SiteSettings = {
  companyName: string;
  /** Razão social e CNPJ — exibidos na Política de Privacidade quando preenchidos. */
  legalName: string | null;
  cnpj: string | null;
  phone: string | null;
  whatsappE164: string | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  businessHours: string | null;
  googleMapsUrl: string | null;
  domain: string | null;
};

export const siteSettings: SiteSettings = {
  companyName: "MAPASA",
  legalName: null,
  cnpj: null,
  phone: null,
  whatsappE164: "5534999131919", // (34) 99913-1919
  email: null,
  instagram: "https://www.instagram.com/mapasa/",
  facebook: null,
  youtube: null,
  address: "Av. Anselmo Alves dos Santos, 1055 - Santa Mônica",
  city: "Uberlândia",
  state: "MG",
  businessHours: null,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Anselmo+Alves+dos+Santos%2C+1055+-+Santa+M%C3%B4nica%2C+Uberl%C3%A2ndia+-+MG",
  domain: null,
};

export const brandCopy = {
  descriptor: "EUCALIPTOS & PLANEJADOS",
  positioning: "Relações de confiança, projetos que ganham vida.",
  visualConcept: "Da floresta ao projeto.",
};

/** Exibe o selo "Imagem ilustrativa" sobre fotos provisórias. Mantenha `true` até todas as fotos serem reais. */
export const SHOW_PLACEHOLDER_BADGES = false;

/**
 * URL pública do site. Ordem: `domain` acima → NEXT_PUBLIC_SITE_URL → domínio de produção da Vercel.
 * Retorna null enquanto nenhum domínio for conhecido: nesse caso canonical, og:url e sitemap não são gerados,
 * para nunca publicar endereços de teste (localhost).
 */
export function getSiteUrl(): string | null {
  const fromSettings = siteSettings.domain;
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null;
  const url = fromSettings || fromEnv || fromVercel;
  return url ? url.replace(/\/$/, "") : null;
}

/** Indexação só é liberada explicitamente, depois da aprovação do conteúdo real. */
export function isIndexingAllowed(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export const socialLinks = () =>
  (
    [
      { key: "instagram", label: "Instagram", href: siteSettings.instagram },
      { key: "facebook", label: "Facebook", href: siteSettings.facebook },
      { key: "youtube", label: "YouTube", href: siteSettings.youtube },
    ] as const
  ).filter((s): s is typeof s & { href: string } => Boolean(s.href));
