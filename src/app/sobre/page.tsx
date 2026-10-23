import type { Metadata } from "next";
import { sobreContent as c } from "@/content/sobre";
import { pageMetadata } from "@/lib/seo";
import { InternalHero } from "@/components/sections/InternalHero";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { iconMap } from "@/components/icons/iconMap";
import { CallToAction } from "@/components/sections/CallToAction";
import { assets } from "@/content/assets";

export const metadata: Metadata = pageMetadata({ ...c.meta, path: "/sobre" });

function EvolutionPath() {
  return (
    <div className="mt-8 flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.18em] text-heartwood">
      <span>Eucalipto</span>
      <span aria-hidden className="h-px w-12 bg-gold" />
      <span>Móveis planejados</span>
    </div>
  );
}

function EvolutionText() {
  return (
    <>
      <Eyebrow className="mb-3">{c.evolution.eyebrow}</Eyebrow>
      <h2 id="evolucao" className="text-h2 text-forest">
        {c.evolution.title}
      </h2>
      <p className="lead mt-4 max-w-[520px] text-muted">{c.evolution.description}</p>
      <EvolutionPath />
    </>
  );
}

export default function SobrePage() {
  const hasTeamPhoto = assets.companyTeam.status !== "pending";
  return (
    <>
      <InternalHero eyebrow={c.hero.eyebrow} title={c.hero.title} image="companyExterior" />

      {/* Origem */}
      <section aria-labelledby="origem" className="section-y bg-sand">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pl-[6px]">
            <Eyebrow className="mb-3">{c.story.eyebrow}</Eyebrow>
            <h2 id="origem" className="text-h2 text-forest">
              {c.story.title}
            </h2>
            <p className="lead mt-4 max-w-[520px] text-muted">{c.story.description}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
            <SiteImage asset="eucalyptusLogs" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Evolução — a foto da equipe só aparece quando companyTeam tiver status "real" em src/content/assets.ts */}
      <section aria-labelledby="evolucao" className="section-y border-t border-border bg-sand">
        {hasTeamPhoto ? (
          <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 aspect-[16/10] overflow-hidden rounded-[8px] lg:order-1">
              <SiteImage asset="companyTeam" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <div className="order-1 lg:order-2">
              <EvolutionText />
            </div>
          </div>
        ) : (
          <div className="container-site grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="lg:pl-[6px]">
              <Eyebrow className="mb-3">{c.evolution.eyebrow}</Eyebrow>
              <h2 id="evolucao" className="text-h2 max-w-[560px] text-forest">
                {c.evolution.title}
              </h2>
            </div>
            <div className="lg:pt-8">
              <p className="lead max-w-[560px] text-muted">{c.evolution.description}</p>
              <EvolutionPath />
            </div>
          </div>
        )}
      </section>

      {/* Valores */}
      <section aria-labelledby="valores" className="section-y bg-forest">
        <div className="container-site">
          <div className="text-center">
            <Eyebrow tone="dark" className="mb-3">
              {c.values.eyebrow}
            </Eyebrow>
            <h2 id="valores" className="text-h2 text-white">
              {c.values.title}
            </h2>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/15">
            {c.values.items.map((v) => {
              const Icon = iconMap[v.icon];
              return (
                <li key={v.label} className="flex flex-col items-center px-4 text-center">
                  {Icon && <Icon aria-hidden className="size-11 text-gold" strokeWidth={1.5} />}
                  <span className="mt-4 text-[14px] font-bold uppercase tracking-[0.16em] text-white">{v.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Manifesto */}
      <section aria-labelledby="manifesto" className="section-y bg-sand">
        <div className="container-site">
          <div className="mx-auto max-w-[880px] text-center">
            <Eyebrow className="mb-4">{c.manifesto.eyebrow}</Eyebrow>
            <h2 id="manifesto" className="text-[clamp(30px,7vw,40px)] font-semibold text-forest lg:text-[52px]">
              Relações de confiança, <span className="text-heartwood">projetos que ganham vida.</span>
            </h2>
            <span aria-hidden className="mx-auto mt-8 block h-[2px] w-16 bg-gold" />
            <p className="lead mx-auto mt-8 max-w-[680px] text-muted">{c.manifesto.description}</p>
          </div>
        </div>
      </section>

      <CallToAction
        title={c.cta.title}
        description={c.cta.description}
        actions={[{ label: c.cta.label, href: c.cta.href }]}
      />
    </>
  );
}
