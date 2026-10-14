import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";
import type { AssetKey } from "@/content/assets";
import { cn } from "@/lib/cn";

export function PhotographicSpecialtyCard({
  label,
  title,
  description,
  image,
  href,
  button,
  buttonVariant = "gold",
}: {
  label: string;
  title: string;
  description: string;
  image: AssetKey;
  href: string;
  button: string;
  buttonVariant?: "gold" | "white";
}) {
  return (
    <article className="group relative isolate flex min-h-[460px] overflow-hidden rounded-[8px] bg-forest md:min-h-[480px] lg:h-[500px]">
      <SiteImage
        asset={image}
        sizes="(min-width: 768px) 50vw, 100vw"
        badge="top-right"
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(15,42,29,0.95) 0%, rgba(15,42,29,0.85) 38%, rgba(20,52,36,0.5) 64%, rgba(31,77,54,0) 88%)",
        }}
      />
      <div className="relative z-10 mt-auto max-w-[540px] p-7 md:p-9 lg:p-11">
        <p className="eyebrow text-gold">{label}</p>
        <h3 className="mt-3 text-[27px] font-semibold text-white md:text-[32px] lg:text-[38px]">{title}</h3>
        <p className="mt-3.5 max-w-[440px] text-[15px] leading-[1.6] text-white/90 lg:text-[16.5px]">{description}</p>
        <Link
          href={href}
          className={cn(
            "mt-7 inline-flex min-h-11 items-center gap-2.5 rounded-full px-7 text-[13.5px] font-bold transition-all duration-200 hover:-translate-y-0.5",
            buttonVariant === "gold" ? "bg-gold text-forest hover:bg-gold-hover" : "bg-white text-forest hover:bg-sand",
          )}
        >
          {button}
          <ArrowRight aria-hidden className="size-4" strokeWidth={2.25} />
        </Link>
      </div>
    </article>
  );
}
