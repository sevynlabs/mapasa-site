import type { Metadata } from "next";
import { publishedProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { InternalHeading } from "@/components/sections/InternalHero";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CallToAction } from "@/components/sections/CallToAction";

export const metadata: Metadata = pageMetadata({
  title: "Projetos Realizados",
  description: "Conheça ambientes e soluções em móveis planejados desenvolvidos pela MAPASA.",
  path: "/projetos",
});

export default function ProjetosPage() {
  return (
    <>
      <InternalHeading
        eyebrow="PORTFÓLIO MAPASA"
        title="Projetos que ganham vida."
        description="Conheça ambientes e soluções desenvolvidos pela MAPASA."
      />
      <section aria-label="Galeria de projetos" className="section-y bg-sand">
        <div className="container-site">
          <ProjectGallery
            projects={publishedProjects()}
            emptyText="O portfólio está sendo preparado. Entre em contato para conhecer os trabalhos disponíveis."
          />
        </div>
      </section>
      <CallToAction
        title="Seu projeto pode ser o próximo."
        description="Conte qual ambiente você deseja planejar e vamos conversar."
        actions={[{ label: "Conversar sobre móveis planejados", href: "/moveis-planejados#orcamento" }]}
      />
    </>
  );
}
