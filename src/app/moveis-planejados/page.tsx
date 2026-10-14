import type { Metadata } from "next";
import { Check, LayoutGrid, Quote, Store } from "lucide-react";
import { planejadosContent as c } from "@/content/planejados";
import { publishedProjects } from "@/data/projects";
import { confirmedFinishes } from "@/data/finishes";
import { approvedTestimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/seo";
import { InternalHero } from "@/components/sections/InternalHero";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import type { AssetKey } from "@/content/assets";

export const metadata: Metadata = pageMetadata({
  ...c.meta,
  path: "/moveis-planejados",
  image: "/assets/images/planejados/cozinha-projeto.jpg",
});

export default function MoveisPlanejadosPage() {
  const projects = publishedProjects().slice(0, 3);
  const finishes = confirmedFinishes;
  const testimonials = approvedTestimonials();
  const environments = c.environments.items.filter((e) => e.confirmed);

  return (
    <>
      <InternalHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.description}
        image="plannedKitchen"
        actions={[c.hero.cta, c.hero.secondary]}
      />

      {/* Introdução */}
      <section aria-labelledby="intro" className="section-y bg-sand">
        <div className="container-site grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div className="lg:pl-[6px]">
            <Eyebrow className="mb-3">{c.intro.eyebrow}</Eyebrow>
            <h2 id="intro" className="text-h2 max-w-[640px] text-forest">
              {c.intro.title}
            </h2>
          </div>
          <div>
            <p className="lead text-muted">{c.intro.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.intro.pillars.map((p) => (
                <li key={p} className="rounded-full border border-forest/20 bg-white px-4 py-2 text-[13px] font-bold text-forest">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ambientes */}
      <section aria-labelledby="ambientes" className="bg-sand pb-12 lg:pb-[72px]">
        <div className="container-site">
          <div className="lg:pl-[6px]">
            <Eyebrow className="mb-3">{c.environments.eyebrow}</Eyebrow>
            <h2 id="ambientes" className="text-h2 text-forest">
              {c.environments.title}
            </h2>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {environments.map((env) => (
              <li key={env.key} className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-forest">
                {env.image ? (
                  <SiteImage asset={env.image as AssetKey} sizes="(min-width: 1024px) 20vw, 50vw" badge="top-left" />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.12]"
                    style={{ backgroundImage: "repeating-linear-gradient(90deg, #D4B46A 0 3px, transparent 3px 26px)" }}
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(0deg, rgba(15,42,29,0.9) 0%, rgba(15,42,29,0.2) 50%, rgba(15,42,29,0) 70%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                  {!env.image && <Store aria-hidden className="mb-3 size-7 text-gold" strokeWidth={1.5} />}
                  <span className="font-heading text-[18px] font-medium text-white lg:text-[21px]">{env.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projetos selecionados */}
      <section aria-labelledby="projetos-selecionados" className="section-y border-t border-border bg-sand">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4 lg:pl-[6px]">
            <div>
              <Eyebrow className="mb-3">{c.projects.eyebrow}</Eyebrow>
              <h2 id="projetos-selecionados" className="text-h2 text-forest">
                {c.projects.title}
              </h2>
            </div>
            {projects.length > 0 && (
              <ButtonLink href={c.projects.cta.href} variant="outlineDark">
                {c.projects.cta.label}
              </ButtonLink>
            )}
          </div>
          {projects.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} showSummary />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-10"
              icon={<LayoutGrid aria-hidden className="size-6" />}
              text={c.projects.emptyText}
              action={{ label: "Conversar sobre meu projeto", href: "#orcamento" }}
            />
          )}
        </div>
      </section>

      {/* Diferencial de atendimento */}
      <section aria-labelledby="atendimento" className="relative overflow-hidden bg-forest">
        <div className="grid lg:grid-cols-2">
          <div className="container-site py-14 lg:mx-0 lg:max-w-none lg:py-20 lg:pl-[max(48px,calc((100vw-1408px)/2+54px))] lg:pr-16">
            <Eyebrow tone="dark" className="mb-3">
              {c.differentiation.eyebrow}
            </Eyebrow>
            <h2 id="atendimento" className="text-h2 text-white">
              {c.differentiation.title}
            </h2>
            <p className="lead mt-4 max-w-[500px] text-white/85">{c.differentiation.description}</p>
            <ul className="mt-8 grid gap-3">
              {c.differentiation.items.map((item) => (
                <li key={item} className="flex items-center gap-3.5 border-b border-white/12 pb-3 text-[16px] font-medium text-white">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-forest">
                    <Check aria-hidden className="size-4" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <SiteImage asset="galleryLiving" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" aria-labelledby="processo-titulo" className="section-y bg-heartwood/[0.07]">
        <div className="container-site">
          <div className="lg:pl-[6px]">
            <Eyebrow className="mb-3">{c.process.eyebrow}</Eyebrow>
            <h2 id="processo-titulo" className="text-h2 text-forest">
              {c.process.title}
            </h2>
          </div>
          <ProcessSteps
            steps={c.process.steps.map((title) => ({ title }))}
            variant="numbers"
            columns={6}
            className="mt-10"
          />
        </div>
      </section>

      {/* Acabamentos — exibido apenas com itens confirmados */}
      {finishes.length > 0 && (
        <section aria-labelledby="acabamentos" className="section-y bg-sand">
          <div className="container-site">
            <Eyebrow className="mb-3">{c.finishes.eyebrow}</Eyebrow>
            <h2 id="acabamentos" className="text-h2 text-forest">
              {c.finishes.title}
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {finishes.map((f) => (
                <li key={f.id} className="rounded-[8px] border border-border bg-white p-6">
                  <h3 className="text-[19px] font-semibold text-forest">{f.name}</h3>
                  {f.description && <p className="mt-2 text-[14.5px] text-muted">{f.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Depoimentos — ocultos sem depoimentos autorizados */}
      {testimonials.length > 0 && (
        <section aria-labelledby="depoimentos" className="section-y bg-sand">
          <div className="container-site">
            <Eyebrow className="mb-3">{c.testimonials.eyebrow}</Eyebrow>
            <h2 id="depoimentos" className="text-h2 text-forest">
              {c.testimonials.title}
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li key={t.id} className="rounded-[8px] bg-white p-7">
                  <Quote aria-hidden className="size-7 text-gold" />
                  <blockquote className="mt-4 text-[16px] leading-relaxed text-forest">{t.quote}</blockquote>
                  <p className="mt-5 text-[14px] font-bold text-forest">{t.author}</p>
                  {t.context && <p className="text-[13px] text-muted">{t.context}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <LeadFormSection
        eyebrow={c.form.eyebrow}
        title={c.form.title}
        description={c.form.description}
        service="planejados"
        highlights={["Desenvolvimento do projeto", "Fabricação", "Instalação", "Personalização"]}
      />
    </>
  );
}
