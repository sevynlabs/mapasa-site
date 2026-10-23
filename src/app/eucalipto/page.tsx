import type { Metadata } from "next";
import { Trees } from "lucide-react";
import { eucaliptoContent as c } from "@/content/eucalipto";
import { eucalyptusProducts } from "@/data/eucalyptus-products";
import { pageMetadata } from "@/lib/seo";
import { InternalHero } from "@/components/sections/InternalHero";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { iconMap } from "@/components/icons/iconMap";
import { ProductCard } from "@/components/sections/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SiteImage } from "@/components/ui/SiteImage";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadFormSection } from "@/components/sections/LeadFormSection";

export const metadata: Metadata = pageMetadata({
  ...c.meta,
  path: "/eucalipto",
  image: "/assets/images/eucalipto/toras-patio.jpg",
});

export default function EucaliptoPage() {
  return (
    <>
      <InternalHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.description}
        image="eucalyptusLogs"
        actions={[c.hero.cta, c.hero.secondary]}
      />

      {/* Benefícios */}
      <section aria-labelledby="beneficios" className="section-y bg-sand">
        <div className="container-site">
          <SectionHeading eyebrow={c.benefits.eyebrow} title={c.benefits.title} as="h2" className="lg:pl-[6px]" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
            {c.benefits.items.map((b) => {
              const Icon = iconMap[b.icon];
              return (
                <li key={b.title} className="rounded-[8px] border border-border bg-white p-7 lg:p-8">
                  <span className="flex size-14 items-center justify-center rounded-full bg-gold text-white">
                    {Icon && <Icon aria-hidden className="size-6" strokeWidth={1.75} />}
                  </span>
                  <h3 className="mt-6 text-[21px] font-semibold text-forest">{b.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{b.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Catálogo */}
      <section aria-labelledby="catalogo" className="section-y border-t border-border bg-sand">
        <div className="container-site">
          <SectionHeading eyebrow={c.catalog.eyebrow} title={c.catalog.title} className="lg:pl-[6px]" />
          {eucalyptusProducts.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {eucalyptusProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-10"
              icon={<Trees aria-hidden className="size-6" />}
              title={c.catalog.emptyTitle}
              text={c.catalog.emptyText}
              action={{ label: "Consultar disponibilidade", href: "#orcamento" }}
            />
          )}
        </div>
      </section>

      {/* Aplicações */}
      <section aria-labelledby="aplicacoes" className="section-y bg-forest">
        <div className="container-site">
          <SectionHeading eyebrow={c.applications.eyebrow} title={c.applications.title} tone="dark" className="lg:pl-[6px]" />
          <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-white/15 lg:grid-cols-4">
            {c.applications.items.map((a) => {
              const Icon = iconMap[a.icon];
              return (
                <li key={a.label} className="flex flex-col items-start gap-5 bg-forest p-6 lg:p-8">
                  {Icon && <Icon aria-hidden className="size-9 text-gold" strokeWidth={1.5} />}
                  <span className="font-heading text-[18px] font-medium text-white lg:text-[21px]">{a.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Escolha presencial */}
      <section aria-labelledby="escolha" className="bg-sand">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px]">
            <SiteImage asset="eucalyptusDetail" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="flex items-center px-5 py-12 md:px-7 lg:px-20 lg:py-16">
            <div className="max-w-[520px]">
              <Eyebrow className="mb-3">{c.photoStory.eyebrow}</Eyebrow>
              <h2 id="escolha" className="text-h2 text-forest">
                {c.photoStory.title}
              </h2>
              <p className="lead mt-4 text-muted">{c.photoStory.description}</p>
              <ButtonLink href={c.photoStory.cta.href} className="mt-7">
                {c.photoStory.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Como comprar */}
      <section id="como-comprar" aria-labelledby="como-comprar-titulo" className="section-y bg-heartwood/[0.07]">
        <div className="container-site">
          <div className="lg:pl-[6px]">
            <Eyebrow className="mb-3">{c.process.eyebrow}</Eyebrow>
            <h2 id="como-comprar-titulo" className="text-h2 text-forest">
              {c.process.title}
            </h2>
          </div>
          <ProcessSteps steps={c.process.steps.map((title) => ({ title }))} variant="numbers" className="mt-10" />
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="section-y bg-sand">
        <div className="container-site grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:pl-[6px]">
            <Eyebrow className="mb-3">{c.faq.eyebrow}</Eyebrow>
            <h2 id="faq" className="text-h2 text-forest">
              {c.faq.title}
            </h2>
          </div>
          <FAQAccordion items={c.faq.items} />
        </div>
      </section>

      <LeadFormSection
        eyebrow={c.form.eyebrow}
        title={c.form.title}
        description={c.form.description}
        service="eucalipto"
        highlights={["Escolha presencial das peças", "Orientação na compra", "Consulta de retirada e entrega"]}
      />
    </>
  );
}
