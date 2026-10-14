import { ButtonLink } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeContent } from "@/content/home";

export function SplitHero() {
  const c = homeContent.hero;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-forest lg:h-[600px]">
      {/* Fotografia: topo no celular, lado direito no desktop */}
      <div className="relative h-[300px] md:h-[400px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[67%]">
        <SiteImage asset="heroKitchen" priority sizes="(min-width: 1024px) 67vw, 100vw" badge="top-right" />
        {/* Mobile/tablet: fusão inferior com o Verde Floresta */}
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(180deg, rgba(31,77,54,0) 45%, rgba(31,77,54,0.75) 80%, #1F4D36 100%)" }}
        />
      </div>

      {/* Desktop: overlay Verde Floresta intenso à esquerda com transição suave no centro */}
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, #163a28 0%, #1a432f 24%, rgba(31,77,54,0.97) 33%, rgba(31,77,54,0.82) 41%, rgba(31,77,54,0.45) 51%, rgba(31,77,54,0.12) 61%, rgba(31,77,54,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{ background: "linear-gradient(0deg, rgba(15,42,29,0.35) 0%, rgba(15,42,29,0) 30%)" }}
      />

      <div className="container-site relative z-10 -mt-14 pb-12 md:-mt-20 lg:mt-0 lg:flex lg:h-full lg:items-center lg:pb-0">
        <div className="max-w-[620px] lg:pl-[44px]">
          <p className="eyebrow text-gold">
            {c.eyebrow[0]}
            <br />
            {c.eyebrow[1]}
          </p>
          <h1 id="hero-title" className="text-hero mt-4 font-semibold text-white lg:mt-5">
            <span className="block">{c.headline.plain[0]}</span>
            <span className="block">{c.headline.plain[1]}</span>
            <span className="block text-gold">{c.headline.highlight[0]}</span>
            <span className="block text-gold">{c.headline.highlight[1]}</span>
          </h1>
          <p className="mt-5 max-w-[480px] text-[15px] leading-[1.65] text-white/90 lg:mt-6 lg:text-[17.5px]">
            {c.paragraph}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8 lg:gap-4">
            {c.actions.map((a) => (
              <ButtonLink key={a.href} href={a.href} variant={a.variant} className="w-full sm:w-auto">
                {a.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="absolute bottom-7 right-[max(48px,calc((100vw-1408px)/2+48px))] z-10 hidden text-right text-[12px] font-semibold uppercase leading-[1.55] tracking-[0.22em] text-white/90 lg:block"
      >
        {c.cornerLabel[0]}
        <br />
        {c.cornerLabel[1]}
      </p>
    </section>
  );
}
