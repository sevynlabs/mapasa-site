import type { Metadata } from "next";
import { FileWarning } from "lucide-react";
import { currentFormBehavior, privacyPolicy } from "@/content/privacy";
import { pageMetadata } from "@/lib/seo";
import { InternalHeading } from "@/components/sections/InternalHero";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Como a MAPASA trata os dados pessoais de quem visita o site e solicita orçamentos, em conformidade com a LGPD.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  const p = privacyPolicy;
  return (
    <>
      <InternalHeading eyebrow="DOCUMENTO" title="Política de Privacidade" />
      <section className="section-y bg-sand">
        <div className="container-site">
          <article className="mx-auto max-w-[820px] rounded-[8px] bg-white p-7 md:p-10 lg:p-14">
            {p.approved && p.sections.length > 0 ? (
              <>
                {p.lastUpdated && <p className="text-[13px] text-muted">Última atualização: {p.lastUpdated}</p>}
                {p.sections.map((s) => (
                  <section key={s.heading} className="mt-10">
                    <h2 className="text-[22px] font-semibold text-forest lg:text-[24px]">{s.heading}</h2>
                    {s.paragraphs.map((para, i) => (
                      <p key={i} className="lead mt-3 text-muted">
                        {para}
                      </p>
                    ))}
                    {s.list && (
                      <ul className="mt-3 space-y-2">
                        {s.list.map((item) => (
                          <li key={item} className="flex gap-3 text-[15.5px] leading-relaxed text-muted">
                            <span aria-hidden className="mt-[11px] size-1.5 shrink-0 rounded-full bg-gold" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </>
            ) : (
              <>
                <div className="flex items-start gap-4 rounded-[8px] border border-gold/60 bg-gold/10 p-5">
                  <FileWarning aria-hidden className="mt-0.5 size-6 shrink-0 text-heartwood" />
                  <div>
                    <p className="font-heading text-[19px] font-medium text-forest">Documento em revisão</p>
                    <p className="mt-1 text-[14.5px] text-muted">
                      A Política de Privacidade completa da MAPASA está em elaboração e será publicada nesta página após
                      revisão e aprovação.
                    </p>
                  </div>
                </div>
                <h2 className="mt-10 text-[24px] font-semibold text-forest">Como este site trata suas informações hoje</h2>
                <ul className="mt-4 space-y-3">
                  {currentFormBehavior.map((item) => (
                    <li key={item} className="flex gap-3 text-[15.5px] leading-relaxed text-muted">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
