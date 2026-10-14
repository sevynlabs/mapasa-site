import Image from "next/image";
import { logoAssets, type LogoVariant } from "@/config/brand";
import { publicFileExists } from "@/lib/assets-server";
import { cn } from "@/lib/cn";

/**
 * Logotipo MAPASA a partir dos arquivos de /public/assets/brand/ (ver src/config/brand.ts).
 * A altura é responsiva (`heights`), a largura acompanha a proporção original do arquivo.
 * Sem o arquivo, exibe um espaço reservado identificado — nunca uma recriação do logotipo.
 */
export function Logo({
  variant = "principal",
  className,
  heights = { base: 40, lg: 46 },
  priority,
}: {
  variant?: LogoVariant;
  className?: string;
  heights?: { base: number; lg: number };
  priority?: boolean;
}) {
  const asset = logoAssets[variant];
  const wBase = Math.round(asset.ratio * heights.base);
  const wLg = Math.round(asset.ratio * heights.lg);
  const sizeVars = {
    "--logo-h": `${heights.base}px`,
    "--logo-w": `${Math.max(wBase, 120)}px`,
    "--logo-h-lg": `${heights.lg}px`,
    "--logo-w-lg": `${Math.max(wLg, 120)}px`,
  } as React.CSSProperties;
  const sizeClasses = "h-[var(--logo-h)] w-[var(--logo-w)] lg:h-[var(--logo-h-lg)] lg:w-[var(--logo-w-lg)]";

  if (publicFileExists(asset.src)) {
    return (
      <Image
        src={asset.src}
        alt="MAPASA Eucaliptos & Planejados"
        width={wLg}
        height={heights.lg}
        priority={priority}
        unoptimized
        className={cn("block max-w-none shrink-0", sizeClasses, className)}
        style={sizeVars}
      />
    );
  }

  const dark = variant === "negativa";
  const fileName = asset.src.split("/").pop();
  return (
    <span
      className={cn(
        "inline-flex flex-col justify-center rounded-[6px] border border-dashed px-3 leading-tight",
        dark ? "border-gold/70 text-white" : "border-heartwood/60 text-forest",
        sizeClasses,
        className,
      )}
      style={sizeVars}
      title={`Inserir arquivo oficial: public${asset.src}`}
    >
      <span className={cn("text-[9px] font-bold uppercase tracking-[0.16em]", dark ? "text-gold" : "text-heartwood")}>
        Logotipo oficial
      </span>
      <span className="truncate font-mono text-[10px] opacity-75">{fileName}</span>
      <span className="sr-only">MAPASA Eucaliptos &amp; Planejados</span>
    </span>
  );
}
