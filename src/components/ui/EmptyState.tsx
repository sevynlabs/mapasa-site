import { ButtonLink } from "./Button";
import { cn } from "@/lib/cn";

export function EmptyState({
  icon,
  title,
  text,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title?: string;
  text: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-[8px] border border-dashed border-forest/25 bg-white/60 px-6 py-12 text-center lg:py-16",
        className,
      )}
    >
      {icon && <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-forest text-gold">{icon}</span>}
      {title && <h3 className="text-h3 text-forest">{title}</h3>}
      <p className="lead mt-3 max-w-[520px] text-muted">{text}</p>
      {action && (
        <ButtonLink href={action.href} className="mt-7">
          {action.label}
        </ButtonLink>
      )}
    </div>
  );
}
