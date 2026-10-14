import { WhatsAppIcon } from "@/components/icons/SocialIcons";

/** Atalho fixo do WhatsApp no celular — renderizado somente quando o número oficial está configurado. */
export function StickyWhatsApp({ url }: { url: string | null }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-forest text-white shadow-[0_10px_30px_-8px_rgba(15,42,29,0.6)] ring-2 ring-gold/70 md:hidden"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
