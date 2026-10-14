import { siteSettings } from "@/config/site";

/** Retorna o número do WhatsApp oficial somente com dígitos, ou null se não configurado. */
export function getWhatsAppNumber(): string | null {
  const raw = siteSettings.whatsappE164;
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 12 ? digits : null;
}

export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber() !== null;
}

/** https://wa.me/{WHATSAPP_E164}?text={ENCODED_MESSAGE} — null quando o número não foi configurado. */
export function buildWhatsAppUrl(message?: string): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultGreeting = "Olá, MAPASA! Gostaria de conversar com a equipe de atendimento.";

/** Número do WhatsApp formatado para exibição: (34) 99913-1919 */
export function getWhatsAppDisplay(): string | null {
  const n = getWhatsAppNumber();
  if (!n) return null;
  const local = n.startsWith("55") ? n.slice(2) : n;
  return local.length === 11
    ? `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`
    : `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
}
