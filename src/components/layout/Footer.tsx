import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { mainMenu } from "@/config/navigation";
import { brandCopy, siteSettings, socialLinks } from "@/config/site";
import { buildWhatsAppUrl, defaultGreeting, getWhatsAppDisplay } from "@/lib/whatsapp";
import { socialIconMap, WhatsAppIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(defaultGreeting);
  const social = socialLinks();
  const location = [siteSettings.address, [siteSettings.city, siteSettings.state].filter(Boolean).join(" - ")]
    .filter(Boolean)
    .join(", ");

  const contactItems = [
    siteSettings.phone && {
      icon: <Phone className="size-4" aria-hidden />,
      label: siteSettings.phone,
      href: `tel:${siteSettings.phone.replace(/\D/g, "")}`,
    },
    whatsappUrl && {
      icon: <WhatsAppIcon className="size-4" />,
      label: getWhatsAppDisplay() ?? "WhatsApp",
      href: whatsappUrl,
      external: true,
    },
    siteSettings.email && {
      icon: <Mail className="size-4" aria-hidden />,
      label: siteSettings.email,
      href: `mailto:${siteSettings.email}`,
    },
    location && {
      icon: <MapPin className="size-4" aria-hidden />,
      label: location,
      href: siteSettings.googleMapsUrl ?? undefined,
      external: true,
    },
    siteSettings.businessHours && {
      icon: <Clock className="size-4" aria-hidden />,
      label: siteSettings.businessHours,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href?: string; external?: boolean }[];

  return (
    <footer className="bg-forest text-white">
      <div className="container-site grid gap-10 pb-10 pt-14 md:grid-cols-2 lg:grid-cols-[1.45fr_0.75fr_1fr_0.7fr] lg:gap-8 lg:pb-12 lg:pt-16">
        <div>
          <Link href="/" aria-label="MAPASA — página inicial" className="inline-flex">
            <Logo variant="negativa" heights={{ base: 58, lg: 68 }} />
          </Link>
          <p className="mt-6 max-w-[340px] text-[14px] font-semibold text-white/95">{brandCopy.positioning}</p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-heading text-[15px] font-semibold">Navegação</h2>
          <ul className="mt-3.5 space-y-1">
            {mainMenu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[14px] leading-[1.75] text-white/80 transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-[15px] font-semibold">Contato</h2>
          {contactItems.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5 text-[13.5px] text-white/80">
                  <span className="mt-[3px] text-gold">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-gold"
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 max-w-[260px] text-[13.5px] text-white/75">
              <p>Canais oficiais de atendimento em configuração.</p>
              <Link href="/contato" className="mt-2 inline-block font-semibold text-gold hover:underline">
                Envie sua solicitação
              </Link>
            </div>
          )}
        </div>

        {social.length > 0 && (
          <div>
            <h2 className="font-heading text-[15px] font-semibold">Redes sociais</h2>
            <ul className="mt-4 flex gap-3">
              {social.map((s) => {
                const Icon = socialIconMap[s.key];
                return (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`MAPASA no ${s.label}`}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="container-site">
        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-[12px] text-white/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteSettings.companyName}. Todos os direitos reservados.
          </p>
          <Link href="/privacidade" className="transition-colors hover:text-gold">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
