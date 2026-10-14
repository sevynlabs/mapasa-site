import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string | readonly string[];
  description?: string;
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "h2" | "h3";
  className?: string;
  /** Exibe a descrição à direita do título no desktop, como na referência. */
  split?: boolean;
  align?: "left" | "center";
};

export function Eyebrow({ children, tone = "light", className }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={cn("eyebrow", tone === "dark" ? "text-gold" : "text-heartwood", className)}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  as: Tag = "h2",
  size = "h2",
  className,
  split = false,
  align = "left",
}: Props) {
  const lines = typeof title === "string" ? [title] : title;
  const heading = (
    <div className={cn(align === "center" && "text-center")}>
      {eyebrow && <Eyebrow tone={tone} className="mb-3 lg:mb-3.5">{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          size === "hero" ? "text-hero" : size === "h2" ? "text-h2" : "text-h3",
          tone === "dark" ? "text-white" : "text-forest",
        )}
      >
        {lines.map((line, i) => (
          <span key={i} className={cn(lines.length > 1 && "lg:block")}>
            {line}
            {i < lines.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    </div>
  );

  const desc = description ? (
    <p
      className={cn(
        "lead max-w-[520px]",
        tone === "dark" ? "text-white/85" : "text-muted",
        align === "center" && "mx-auto text-center",
        split ? "mt-4 lg:mt-0 lg:pt-8" : "mt-4",
      )}
    >
      {description}
    </p>
  ) : null;

  if (split) {
    return (
      <div className={cn("grid gap-0 lg:grid-cols-[1fr_minmax(0,500px)] lg:items-start lg:gap-16", className)}>
        {heading}
        {desc}
      </div>
    );
  }
  return (
    <div className={className}>
      {heading}
      {desc}
    </div>
  );
}
