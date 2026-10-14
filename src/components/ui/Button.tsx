import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "gold" | "forest" | "brown" | "white" | "outlineLight" | "outlineDark";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold text-forest hover:bg-gold-hover",
  forest: "bg-forest text-white hover:bg-forest-deep",
  brown: "bg-heartwood text-white hover:bg-[#5c3f27]",
  white: "bg-white text-forest hover:bg-sand",
  outlineLight: "border border-white/85 text-white hover:bg-white hover:text-forest",
  outlineDark: "border border-forest text-forest hover:bg-forest hover:text-white",
};

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[13px] font-bold leading-tight tracking-[0.01em] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-60 lg:px-7 lg:text-[14px]";

type CommonProps = {
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "gold",
  arrow = true,
  className,
  children,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2.25}
        />
      )}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant = "gold",
  arrow = false,
  className,
  children,
  ...rest
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden className="size-4 shrink-0" strokeWidth={2.25} />}
    </button>
  );
}
