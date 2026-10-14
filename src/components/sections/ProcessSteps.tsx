import { iconMap } from "@/components/icons/iconMap";
import { cn } from "@/lib/cn";

type Step = { title: string; description?: string; icon?: string };

/**
 * Etapas horizontais.
 * - variant "icons": ícones em círculos dourados (home, "O jeito MAPASA de atender").
 * - variant "numbers": números em círculos dourados (processos de compra/projeto).
 */
export function ProcessSteps({
  steps,
  variant = "icons",
  tone = "light",
  columns = 4,
  className,
}: {
  steps: readonly Step[];
  variant?: "icons" | "numbers";
  tone?: "light" | "dark";
  columns?: 3 | 4 | 6;
  className?: string;
}) {
  const dark = tone === "dark";
  const cols = {
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
    6: "md:grid-cols-3 lg:grid-cols-6",
  }[columns];
  return (
    <ol className={cn("grid gap-6", cols, className)}>
      {steps.map((step, i) => {
        const Icon = step.icon ? iconMap[step.icon] : undefined;
        return (
          <li
            key={step.title}
            className={cn(
              "flex items-start gap-4 lg:px-6 lg:first:pl-0",
              columns === 4 && "lg:border-l lg:first:border-l-0",
              columns === 6 && "lg:flex-col lg:px-4",
              dark ? "border-white/20" : "border-forest/15",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-14 shrink-0 items-center justify-center rounded-full bg-gold lg:size-16",
                variant === "numbers" ? "font-heading text-[20px] font-semibold text-forest" : "text-white",
              )}
            >
              {variant === "icons" && Icon ? (
                <Icon className="size-6 lg:size-7" strokeWidth={1.75} />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <div className={variant === "icons" ? "pt-1" : "pt-1 lg:pt-3"}>
              <h3
                className={cn(
                  variant === "icons"
                    ? "font-body text-[13.5px] font-bold uppercase tracking-[0.12em] lg:text-[15.5px]"
                    : "font-heading text-[18px] font-medium leading-snug lg:text-[19px]",
                  dark ? "text-white" : "text-forest",
                )}
              >
                {variant === "icons" ? `${i + 1}. ` : ""}
                {step.title}
              </h3>
              {step.description && (
                <p className={cn("mt-1.5 text-[14.5px] leading-snug lg:text-[15.5px]", dark ? "text-white/80" : "text-muted")}>
                  {step.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
