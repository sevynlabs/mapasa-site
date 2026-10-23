import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/home";
import { assets } from "@/content/assets";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { PhotographicSpecialtyCard } from "@/components/sections/PhotographicSpecialtyCard";
import { DifferentiationPillars } from "@/components/sections/DifferentiationPillars";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DemoProjectCard, ProjectCard } from "@/components/projects/ProjectCard";
import { publishedProjects } from "@/data/projects";

/* BLOCO 3 — Duas especialidades */
export function Specialties() {
  const c = homeContent.specialties;
  return (
    <section aria-labelledby="especialidades" className="bg-sand pb-12 pt-12 lg:pb-[30px] lg:pt-[42px]">
      <div className="container-site">
        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,470px)] lg:items-end lg:gap-16 lg:px-[34px]">
          <div>
            <Eyebrow className="mb-3">{c.eyebrow}</Eyebrow>
            <h2 id="especialidades" className="text-h2 text-forest">
              <span className="lg:block">{c.title[0]}</span> <span className="lg:block">{c.title[1]}</span>
            </h2>
          </div>
          <p className="lead pb-1 text-muted lg:self-start lg:pt-9">{c.description}</p>
        </div>
        <div className="mt-8 grid gap-[18px] md:grid-cols-2 lg:mt-[34px]">
          {c.cards.map((card) => (
            <PhotographicSpecialtyCard key={card.href} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* BLOCO 4 — Diferencial */
export function Differentiation() {
  const c = homeContent.differentiation;
  return (
    <section aria-labelledby="diferencial" className="bg-forest py-12 lg:pb-[34px] lg:pt-[40px]">
      <div className="container-site lg:px-[82px]">
        <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,530px)] lg:gap-16">
          <div>
            <Eyebrow tone="dark" className="mb-3">
              {c.eyebrow}
            </Eyebrow>
            <h2 id="diferencial" className="text-h2 text-white">
              <span className="lg:block">{c.title[0]}</span> <span className="lg:block">{c.title[1]}</span>
            </h2>
          </div>
          <p className="lead text-white/85 lg:pt-8">{c.description}</p>
        </div>
        <DifferentiationPillars items={c.items} className="mt-10 lg:mt-9" />
      </div>
    </section>
  );
}

/* BLOCO 5 — Móveis planejados */
export function PlannedFeature() {
  const c = homeContent.planned;
  const thumbs = ["plannedThumb1", "plannedThumb2", "plannedThumb3"] as const;
  return (
    <section aria-labelledby="planejados-home" className="bg-sand py-12 lg:py-[32px]">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
        <div className="lg:pl-[6px]">
          <Eyebrow className="mb-3">{c.eyebrow}</Eyebrow>
          <h2 id="planejados-home" className="text-h2 text-forest">
            <span className="lg:block">{c.title[0]}</span> <span className="lg:block">{c.title[1]}</span>
          </h2>
          <p className="lead mt-4 max-w-[480px] text-muted">{c.description}</p>
          <ButtonLink href={c.cta.href} className="mt-7">
            {c.cta.label}
          </ButtonLink>
        </div>
        <div className="grid grid-cols-[1fr_minmax(0,0.29fr)] gap-3 lg:h-[376px] lg:gap-4">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[8px] lg:aspect-auto">
            <SiteImage asset="plannedKitchen" sizes="(min-width: 1024px) 42vw, 75vw" />
          </div>
          <div className="grid grid-rows-3 gap-3 lg:gap-4">
            {thumbs.map((t) => (
              <div key={t} className="relative overflow-hidden rounded-[8px]">
                <SiteImage asset={t} sizes="(min-width: 1024px) 12vw, 25vw" badge={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* BLOCO 6 — Eucalipto */
export function EucalyptusFeature() {
  const c = homeContent.eucalyptus;
  return (
    <section aria-labelledby="eucalipto-home" className="relative overflow-hidden bg-forest lg:min-h-[376px]">
      <div className="relative h-[280px] md:h-[360px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[56%]">
        <SiteImage asset="eucalyptusDetail" sizes="(min-width: 1024px) 56vw, 100vw" badge="top-left" focus="40% 60%" />
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(31,77,54,0) 0%, rgba(31,77,54,0) 62%, rgba(31,77,54,0.65) 84%, #1F4D36 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(180deg, rgba(31,77,54,0) 55%, #1F4D36 100%)" }}
        />
      </div>
      <div className="container-site relative z-10 py-10 lg:flex lg:min-h-[376px] lg:items-center lg:justify-end lg:py-9">
        <div className="max-w-[580px] lg:w-[44%] lg:max-w-none lg:pl-4">
          <Eyebrow tone="dark" className="mb-3 text-white/90">
            {c.eyebrow}
          </Eyebrow>
          <h2 id="eucalipto-home" className="text-h2 text-white">
            <span className="lg:block">{c.title[0]}</span> <span className="lg:block">{c.title[1]}</span>
          </h2>
          <p className="lead mt-4 max-w-[560px] text-white/88">{c.description}</p>
          <ButtonLink href={c.cta.href} className="mt-7">
            {c.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* BLOCO 7 — Nossa história */
export function CompanyStory() {
  const c = homeContent.story;
  return (
    <section aria-labelledby="historia-home" className="bg-sand py-12 lg:py-[24px]">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="lg:pl-[6px]">
          <Eyebrow className="mb-3">{c.eyebrow}</Eyebrow>
          <h2 id="historia-home" className="text-h2 text-forest">
            <span className="lg:block">{c.title[0]}</span> <span className="lg:block">{c.title[1]}</span>
          </h2>
          <p className="lead mt-4 max-w-[600px] text-muted">{c.description}</p>
          <ButtonLink href={c.cta.href} className="mt-7">
            {c.cta.label}
          </ButtonLink>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] lg:aspect-auto lg:h-[356px]">
          <SiteImage asset="companyExterior" sizes="(min-width: 1024px) 45vw, 100vw" focus="55% 42%" />
        </div>
      </div>
    </section>
  );
}

/* BLOCO 8 — Projetos */
export function FeaturedProjects() {
  const c = homeContent.projects;
  const real = publishedProjects().slice(0, 4);
  return (
    <section aria-labelledby="projetos-home" className="bg-sand pb-12 pt-10 lg:pb-[20px] lg:pt-[28px]">
      <div className="container-site lg:px-[70px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow className="mb-2">{c.eyebrow}</Eyebrow>
            <h2 id="projetos-home" className="text-h2 text-forest">
              {c.title}
            </h2>
          </div>
          <Link
            href={c.showAll.href}
            className="group inline-flex items-center gap-2 pb-2 text-[13.5px] font-bold text-forest hover:text-heartwood"
          >
            {c.showAll.label}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:mt-5 lg:grid-cols-4 lg:gap-[14px]">
          {real.length > 0
            ? real.map((p) => <ProjectCard key={p.slug} project={p} />)
            : c.demoCards.map((card) => <DemoProjectCard key={card.title} {...card} />)}
        </div>
        {real.length === 0 && <p className="mt-4 text-[12px] text-muted/90">{c.demoNotice}</p>}
      </div>
    </section>
  );
}

/* BLOCO 9 — O jeito MAPASA de atender */
export function RelationshipProcess() {
  const c = homeContent.process;
  return (
    <section aria-labelledby="atendimento-home" className="bg-heartwood/[0.07] py-12 lg:pb-[36px] lg:pt-[30px]">
      <div className="container-site lg:px-[70px]">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} description={c.description} split />
        <ProcessSteps steps={c.steps} className="mt-9 lg:mt-10" />
      </div>
    </section>
  );
}

/* BLOCO 10 — Contato */
export function FinalCta() {
  const c = homeContent.contact;
  const portraitPending = assets.contactTeamMember.status === "pending";
  return (
    <section aria-labelledby="contato-home" className="relative overflow-hidden bg-sand">
      <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        {/* Sem retrato autorizado da equipe, a faixa usa a foto real do pátio. Com o retrato (contactTeamMember: "real"), ele assume. */}
        {portraitPending ? (
          <SiteImage asset="eucalyptusLogs" sizes="52vw" badge="bottom-right" focus="65% 62%" />
        ) : (
          <SiteImage asset="contactTeamMember" sizes="52vw" />
        )}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #F3F1EA 0%, rgba(243,241,234,0.85) 18%, rgba(243,241,234,0.25) 42%, rgba(243,241,234,0) 60%)",
          }}
        />
      </div>
      <div className="container-site relative z-10 py-12 lg:flex lg:min-h-[320px] lg:items-center lg:py-[26px]">
        <div className="max-w-[720px] lg:pl-[24px]">
          <Eyebrow className="mb-3">{c.eyebrow}</Eyebrow>
          <h2 id="contato-home" className="text-h2 text-forest">
            <span className="lg:block">{c.title[0]}</span> <span className="lg:block">{c.title[1]}</span>
          </h2>
          <p className="lead mt-4 max-w-[640px] text-forest/85">{c.description}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:gap-4">
            {c.actions.map((a) => (
              <ButtonLink key={a.href} href={a.href} variant={a.variant} className="w-full sm:w-auto">
                {a.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
