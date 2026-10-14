import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { cn } from "@/lib/cn";

/**
 * Botão circular do WhatsApp.
 * Com número configurado: abre o WhatsApp oficial.
 * Sem número configurado: leva à página de contato (não há link falso).
 */
export function WhatsAppAction({ url, className }: { url: string | null; className?: string }) {
  const classes = cn(
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-deep",
    className,
  );
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp" className={classes}>
        <WhatsAppIcon className="size-[22px]" />
      </a>
    );
  }
  return (
    <Link
      href="/contato"
      aria-label="WhatsApp oficial em configuração — ir para a página de contato"
      title="WhatsApp oficial em configuração"
      className={classes}
    >
      <WhatsAppIcon className="size-[22px]" />
    </Link>
  );
}
