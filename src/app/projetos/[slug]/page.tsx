import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { categoryLabel, getProjectBySlug, publishedProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CallToAction } from "@/components/sections/CallToAction";

/** Páginas geradas somente para projetos reais aprovados. Qualquer outro slug retorna 404. */
export const dynamicParams = false;

/** Slug técnico usado apenas no build estático enquanto não há projetos (removido por scripts/post-export.mjs). */
const EXPORT_PLACEHOLDER_SLUG = "__sem-projetos";

export function generateStaticParams() {
  const params = publishedProjects().map((p) => ({ slug: p.slug }));
  // A exportação estática exige ao menos uma rota; sem projetos aprovados, gera um placeholder que é apagado depois.
  if (params.length === 0 && process.env.STATIC_EXPORT === "1") return [{ slug: EXPORT_PLACEHOLDER_SLUG }];
  return params;
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projetos/${project.slug}`,
    image: project.coverImage,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="bg-forest">
        <div className="container-site pb-10 pt-10 lg:pb-14 lg:pt-14">
          <Link href="/projetos" className="inline-flex items-center gap-2 text-[13px] font-bold text-gold hover:underline">
            <ArrowLeft aria-hidden className="size-4" /> Todos os projetos
          </Link>
          <p className="eyebrow mt-8 text-gold">{categoryLabel(project.category)}</p>
          <h1 className="mt-3 max-w-[820px] text-[clamp(34px,8.5vw,46px)] font-semibold text-white lg:text-[56px]">
            {project.title}
          </h1>
          <p className="lead mt-4 max-w-[640px] text-white/85">{project.summary}</p>
        </div>
      </section>

      <section className="bg-sand pb-14 lg:pb-20">
        <div className="container-site">
          <div className="relative -mt-0 aspect-[16/9] overflow-hidden rounded-b-[8px] lg:aspect-[21/9]">
            <Image src={project.coverImage} alt={project.title} fill priority sizes="100vw" className="object-cover" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <p className="lead text-muted">{project.description}</p>
              {project.clientNeed && (
                <div className="mt-10">
                  <Eyebrow className="mb-2">Necessidade do cliente</Eyebrow>
                  <p className="lead text-muted">{project.clientNeed}</p>
                </div>
              )}
              {project.solution && (
                <div className="mt-8">
                  <Eyebrow className="mb-2">Solução desenvolvida</Eyebrow>
                  <p className="lead text-muted">{project.solution}</p>
                </div>
              )}
            </div>
            <aside className="h-fit rounded-[8px] bg-white p-7">
              <dl className="space-y-4 text-[14.5px]">
                <div>
                  <dt className="eyebrow text-heartwood">Categoria</dt>
                  <dd className="mt-1 font-semibold text-forest">{categoryLabel(project.category)}</dd>
                </div>
                {project.materials && project.materials.length > 0 && (
                  <div>
                    <dt className="eyebrow text-heartwood">Materiais</dt>
                    <dd className="mt-1 text-forest">{project.materials.join(", ")}</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>

          {project.images.length > 0 && (
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {project.images.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
                  <Image
                    src={src}
                    alt={`${project.title} — foto ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CallToAction
        title="Seu projeto pode ser o próximo."
        actions={[{ label: "Conversar sobre móveis planejados", href: "/moveis-planejados#orcamento" }]}
      />
    </>
  );
}
