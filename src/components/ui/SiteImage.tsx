import Image from "next/image";
import { assets, type AssetKey } from "@/content/assets";
import { SHOW_PLACEHOLDER_BADGES } from "@/config/site";
import { PendingMedia } from "./PendingMedia";
import { cn } from "@/lib/cn";

type Props = {
  asset: AssetKey;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  badge?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | false;
  pendingTone?: "light" | "dark";
  pendingCompact?: boolean;
  /** Enquadramento específico deste uso (CSS object-position). Sem ele, vale o `focus` do manifesto. */
  focus?: string;
};

/**
 * Imagem do manifesto (src/content/assets.ts).
 * O contêiner pai define a proporção; a imagem sempre preenche com object-cover,
 * garantindo o mesmo recorte quando a fotografia real substituir o placeholder.
 */
export function SiteImage({
  asset,
  sizes,
  priority,
  className,
  imgClassName,
  badge = "bottom-left",
  pendingTone = "light",
  pendingCompact,
  focus,
}: Props) {
  const a = assets[asset];
  if (a.status === "pending") {
    return (
      <div className={cn("absolute inset-0", className)}>
        <PendingMedia brief={a.brief} file={a.src} tone={pendingTone} compact={pendingCompact} />
      </div>
    );
  }
  return (
    <div className={cn("absolute inset-0", className)}>
      <Image
        src={a.src}
        alt={a.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
        style={{ objectPosition: focus ?? ("focus" in a ? a.focus : "50% 50%") }}
      />
      {a.status === "illustrative" && SHOW_PLACEHOLDER_BADGES && badge && <IllustrativeBadge position={badge} />}
    </div>
  );
}

export function IllustrativeBadge({
  position = "bottom-left",
  label = "Imagem ilustrativa",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  label?: string;
}) {
  const pos = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3",
    "bottom-left": "bottom-3 left-3",
    "bottom-right": "bottom-3 right-3",
  }[position];
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-[2] rounded-full bg-forest/80 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/90",
        pos,
      )}
    >
      {label}
    </span>
  );
}
