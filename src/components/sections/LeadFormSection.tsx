import { Check } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { ServiceKey } from "@/content/forms";

export function LeadFormSection({
  id = "orcamento",
  eyebrow,
  title,
  description,
  service,
  highlights,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  service: ServiceKey;
  highlights: readonly string[];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="relative overflow-hidden bg-forest py-14 lg:py-20">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[40%] opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, #D4B46A 0 3px, transparent 3px 34px)" }}
      />
      <div className="container-site relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:pl-[6px] lg:pt-4">
          <Eyebrow tone="dark" className="mb-3">
            {eyebrow}
          </Eyebrow>
          <h2 id={`${id}-titulo`} className="text-h2 text-white">
            {title}
          </h2>
          <p className="lead mt-4 max-w-[440px] text-white/85">{description}</p>
          <ul className="mt-8 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-[15px] font-medium text-white/90">
                <span className="flex size-6 items-center justify-center rounded-full bg-gold text-forest">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <LeadForm initialService={service} tone="dark" />
      </div>
    </section>
  );
}
