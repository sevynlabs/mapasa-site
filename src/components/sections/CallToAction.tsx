import { ButtonLink, type ButtonVariant } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function CallToAction({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions: { label: string; href: string; variant?: ButtonVariant }[];
}) {
  return (
    <section className="bg-sand py-12 lg:py-16">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[8px] bg-forest px-7 py-10 md:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16 lg:py-14">
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-1/2 opacity-[0.07]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, #D4B46A 0 3px, transparent 3px 30px)" }}
          />
          <div className="relative max-w-[640px]">
            {eyebrow && <Eyebrow tone="dark" className="mb-3">{eyebrow}</Eyebrow>}
            <h2 className="text-h2 text-white">{title}</h2>
            {description && <p className="lead mt-3 text-white/85">{description}</p>}
          </div>
          <div className="relative mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            {actions.map((a, i) => (
              <ButtonLink key={a.href} href={a.href} variant={a.variant ?? (i === 0 ? "gold" : "outlineLight")}>
                {a.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
