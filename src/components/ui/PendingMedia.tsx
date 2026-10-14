import { Camera } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Área reservada para fotografia ainda não fornecida.
 * Nunca simula uma foto real: mostra claramente o que deve ser inserido e onde.
 */
export function PendingMedia({
  brief,
  file,
  tone = "light",
  className,
  compact = false,
}: {
  brief: string;
  file?: string;
  tone?: "light" | "dark";
  className?: string;
  compact?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Espaço reservado: ${brief}`}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center",
        dark ? "bg-forest text-white" : "bg-[#e8e3d6] text-forest",
        className,
      )}
    >
      {/* textura de ripas, referência discreta ao universo da madeira */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${dark ? "#D4B46A" : "#6B4A2F"} 0 2px, transparent 2px 26px)`,
        }}
      />
      <div className={cn("relative flex max-w-[320px] flex-col items-center px-6", compact ? "gap-2" : "gap-3")}>
        <span
          className={cn(
            "flex items-center justify-center rounded-full",
            compact ? "size-10" : "size-14",
            dark ? "bg-gold text-forest" : "bg-forest text-gold",
          )}
        >
          <Camera aria-hidden className={compact ? "size-5" : "size-6"} />
        </span>
        <p className="eyebrow text-[10px] text-current opacity-80">Fotografia pendente</p>
        <p className={cn("font-heading font-medium leading-snug", compact ? "text-[14px]" : "text-[17px]")}>{brief}</p>
        {file && !compact && (
          <p className="mt-1 font-mono text-[11px] opacity-70 break-all">public{file}</p>
        )}
      </div>
    </div>
  );
}
