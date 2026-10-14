import { ButtonLink, type ButtonVariant } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import { assets, type AssetKey } from "@/content/assets";

type Action = { label: string; href: string; variant?: ButtonVariant };

/** Hero das páginas internas — mesma linguagem do hero da home, em altura reduzida. */
export function InternalHero({
  eyebrow,
  title,
  description,
  image,
  actions = [],
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: AssetKey;
  actions?: Action[];
}) {
  const hasPhoto = image && assets[image].status !== "pending";
  return (
    <section className="relative overflow-hidden bg-forest lg:min-h-[480px]">
      {hasPhoto ? (
        <>
          <div className="relative h-[240px] md:h-[340px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
            <SiteImage asset={image} priority sizes="(min-width: 1024px) 60vw, 100vw" badge="top-right" />
            <div
              aria-hidden
              className="absolute inset-0 lg:hidden"
              style={{ background: "linear-gradient(180deg, rgba(31,77,54,0) 40%, #1F4D36 100%)" }}
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, #163a28 0%, #1a432f 30%, rgba(31,77,54,0.95) 40%, rgba(31,77,54,0.6) 52%, rgba(31,77,54,0.1) 66%, rgba(31,77,54,0) 74%)",
            }}
          />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden w-[45%] opacity-[0.08] lg:block"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #D4B46A 0 3px, transparent 3px 34px)" }}
        />
      )}
      <div
        className={
          hasPhoto
            ? "container-site relative z-10 -mt-12 pb-12 md:-mt-16 lg:mt-0 lg:flex lg:min-h-[480px] lg:items-center lg:py-16"
            : "container-site relative z-10 py-16 lg:flex lg:min-h-[420px] lg:items-center lg:py-20"
        }
      >
        <div className={hasPhoto ? "max-w-[600px] lg:pl-[44px]" : "max-w-[860px] lg:pl-[44px]"}>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-4 text-[clamp(34px,8.5vw,46px)] font-semibold text-white lg:text-[clamp(44px,4vw,58px)]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-[500px] text-[15.5px] font-medium leading-[1.65] text-white/90 lg:text-[17px]">
              {description}
            </p>
          )}
          {actions.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:gap-4">
              {actions.map((a, i) => (
                <ButtonLink
                  key={a.href}
                  href={a.href}
                  variant={a.variant ?? (i === 0 ? "gold" : "outlineLight")}
                  className="w-full sm:w-auto"
                >
                  {a.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Cabeçalho de página interna sem fotografia (Projetos, Contato, Privacidade). */
export function InternalHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[55%] opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, #D4B46A 0 3px, transparent 3px 34px)" }}
      />
      <div className="container-site relative py-14 lg:py-20">
        <div className="max-w-[720px] lg:pl-[44px]">
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-4 text-[clamp(34px,8.5vw,46px)] font-semibold text-white lg:text-[clamp(44px,4vw,58px)]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-[560px] text-[15.5px] font-medium leading-[1.65] text-white/90 lg:text-[17px]">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
