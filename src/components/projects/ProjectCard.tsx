import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteImage, IllustrativeBadge } from "@/components/ui/SiteImage";
import type { AssetKey } from "@/content/assets";
import { categoryLabel, type Project } from "@/data/projects";

/** Card de projeto real (com página própria). */
export function ProjectCard({ project, showSummary = false }: { project: Project; showSummary?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-[8px] bg-white shadow-[0_1px_2px_rgba(31,77,54,0.06),0_8px_24px_-16px_rgba(31,77,54,0.25)]">
      <Link href={`/projetos/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="px-5 py-4">
          <h3 className="font-body text-[14.5px] font-bold text-forest">{project.title}</h3>
          <p className="mt-0.5 text-[12.5px] text-muted">{categoryLabel(project.category)}</p>
          {showSummary && <p className="mt-3 text-[14px] leading-relaxed text-muted">{project.summary}</p>}
          {showSummary && (
            <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-forest">
              Ver projeto <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}

/** Card de demonstração: imagem ilustrativa, claramente identificada, sem página de detalhe. */
export function DemoProjectCard({ title, category, image }: { title: string; category: string; image: AssetKey }) {
  return (
    <article className="overflow-hidden rounded-[8px] bg-white shadow-[0_1px_2px_rgba(31,77,54,0.06),0_8px_24px_-16px_rgba(31,77,54,0.25)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SiteImage asset={image} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" badge={false} />
        <IllustrativeBadge position="top-left" label="Demonstração" />
      </div>
      <div className="px-3.5 py-3 md:px-5 md:py-4">
        <h3 className="font-body text-[13.5px] font-bold text-forest md:text-[15px]">{title}</h3>
        <p className="mt-0.5 text-[12.5px] text-muted">{category}</p>
      </div>
    </article>
  );
}
