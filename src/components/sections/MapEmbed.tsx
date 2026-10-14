import { siteSettings } from "@/config/site";

/** Mapa exibido somente após a confirmação do endereço oficial (endereço + cidade + UF). */
export function MapEmbed() {
  const s = siteSettings;
  if (!s.address || !s.city || !s.state) return null;
  const query = encodeURIComponent(`${s.address}, ${s.city} - ${s.state}`);
  return (
    <section aria-label="Localização" className="bg-sand pb-14 lg:pb-20">
      <div className="container-site">
        <div className="overflow-hidden rounded-[8px] border border-border">
          <iframe
            title="Localização da MAPASA no mapa"
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            className="h-[360px] w-full lg:h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
