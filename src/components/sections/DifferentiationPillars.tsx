import { iconMap } from "@/components/icons/iconMap";
import { cn } from "@/lib/cn";

export function DifferentiationPillars({
  items,
  className,
}: {
  items: readonly { icon: string; title: string; description: string }[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/20",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <li key={item.title} className="flex flex-col items-center px-4 text-center lg:px-8">
            {Icon && <Icon aria-hidden className="size-11 text-gold lg:size-[54px]" strokeWidth={1.5} />}
            <h3 className="mt-5 font-body text-[13.5px] font-bold uppercase tracking-[0.16em] text-white lg:text-[16px]">
              {item.title}
            </h3>
            <p className="mt-2 max-w-[240px] text-[14.5px] leading-snug text-white/85 lg:text-[16px]">{item.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
