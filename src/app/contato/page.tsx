import type { Metadata } from "next";
import { contatoContent as c } from "@/content/contato";
import { pageMetadata } from "@/lib/seo";
import { InternalHeading } from "@/components/sections/InternalHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactInformation } from "@/components/sections/ContactInformation";
import { MapEmbed } from "@/components/sections/MapEmbed";

export const metadata: Metadata = pageMetadata({ ...c.meta, path: "/contato" });

export default function ContatoPage() {
  return (
    <>
      <InternalHeading eyebrow={c.heading.eyebrow} title={c.heading.title} description={c.heading.description} />
      <section aria-label="Formulário de orçamento" className="section-y bg-sand">
        <div className="container-site grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          <LeadForm allowServiceChoice readServiceFromUrl />
          <ContactInformation pendingText={c.pendingChannels} />
        </div>
      </section>
      <MapEmbed />
    </>
  );
}
