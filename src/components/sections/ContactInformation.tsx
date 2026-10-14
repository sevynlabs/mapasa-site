import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteSettings, socialLinks } from "@/config/site";
import { buildWhatsAppUrl, defaultGreeting, getWhatsAppDisplay } from "@/lib/whatsapp";
import { socialIconMap, WhatsAppIcon } from "@/components/icons/SocialIcons";

/** Exibe somente informações confirmadas em src/config/site.ts. */
export function ContactInformation({ pendingText }: { pendingText: string }) {
  const s = siteSettings;
  const whatsapp = buildWhatsAppUrl(defaultGreeting);
  const location = [s.address, [s.city, s.state].filter(Boolean).join(" - ")].filter(Boolean).join(", ");
  const items = [
    whatsapp && { icon: <WhatsAppIcon className="size-5" />, label: "WhatsApp", value: getWhatsAppDisplay() ?? "Iniciar conversa", href: whatsapp, external: true },
    s.phone && { icon: <Phone aria-hidden className="size-5" />, label: "Telefone", value: s.phone, href: `tel:${s.phone.replace(/\D/g, "")}` },
    s.email && { icon: <Mail aria-hidden className="size-5" />, label: "E-mail", value: s.email, href: `mailto:${s.email}` },
    location && { icon: <MapPin aria-hidden className="size-5" />, label: "Endereço", value: location, href: s.googleMapsUrl ?? undefined, external: true },
    s.businessHours && { icon: <Clock aria-hidden className="size-5" />, label: "Horário de atendimento", value: s.businessHours },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href?: string; external?: boolean }[];
  const social = socialLinks();

  return (
    <aside aria-labelledby="canais" className="h-fit rounded-[8px] bg-forest p-7 text-white lg:p-9">
      <p className="eyebrow text-gold">Atendimento</p>
      <h2 id="canais" className="mt-3 text-[26px] font-semibold">
        Canais oficiais
      </h2>
      {items.length > 0 ? (
        <ul className="mt-6 space-y-5">
          {items.map((item) => (
            <li key={item.label} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-forest">{item.icon}</span>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[15px] font-semibold hover:text-gold"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[15px] font-semibold">{item.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-[15px] leading-relaxed text-white/80">{pendingText}</p>
      )}
      {social.length > 0 && (
        <ul className="mt-8 flex gap-3 border-t border-white/15 pt-6">
          {social.map((sl) => {
            const Icon = socialIconMap[sl.key];
            return (
              <li key={sl.key}>
                <a
                  href={sl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MAPASA no ${sl.label}`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 hover:border-gold hover:text-gold"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-8 border-t border-white/15 pt-6 text-[14px] leading-relaxed text-white/75">
        <p className="font-semibold text-white">Eucalipto ou planejados?</p>
        <p className="mt-1">Selecione a especialidade no formulário: os campos se ajustam à sua necessidade.</p>
      </div>
    </aside>
  );
}
