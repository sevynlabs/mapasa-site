"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainMenu, primaryCta } from "@/config/navigation";
import { WhatsAppAction } from "./WhatsAppAction";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ logo, whatsappUrl }: { logo: React.ReactNode; whatsappUrl: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-sand transition-shadow duration-200",
        scrolled && "shadow-[0_1px_0_rgba(31,77,54,0.08),0_6px_20px_-12px_rgba(31,77,54,0.25)]",
      )}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <div className="container-site flex h-[68px] items-center justify-between gap-6 lg:h-[88px]">
        <Link href="/" aria-label="MAPASA — página inicial" className="flex shrink-0 items-center">
          {logo}
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {mainMenu.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-[13.5px] transition-colors hover:text-forest",
                      active ? "font-bold text-forest" : "font-medium text-forest/75",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gold" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5 lg:gap-3.5">
          <Link
            href={primaryCta.href}
            className="hidden min-h-11 items-center rounded-full bg-heartwood px-6 text-[13.5px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5c3f27] md:inline-flex lg:px-7"
          >
            {primaryCta.label}
          </Link>
          <WhatsAppAction url={whatsappUrl} />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-forest/15 text-forest lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-sand lg:hidden"
      >
        <nav aria-label="Navegação principal (celular)" className="container-site flex min-h-full flex-col pb-10 pt-4">
          <ul className="divide-y divide-border border-y border-border">
            {mainMenu.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-heading text-[22px] font-medium",
                      active ? "text-forest" : "text-forest/80",
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden className="size-2 rounded-full bg-gold" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href="/eucalipto#orcamento"
              className="flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-[14px] font-bold text-forest"
            >
              Orçamento de eucalipto
            </Link>
            <Link
              href="/moveis-planejados#orcamento"
              className="flex min-h-12 items-center justify-center rounded-full bg-forest px-6 text-[14px] font-bold text-white"
            >
              Projeto de móveis planejados
            </Link>
          </div>
          <p className="mt-auto pt-10 text-center text-[12px] uppercase tracking-[0.2em] text-heartwood">
            Da floresta ao projeto
          </p>
        </nav>
      </div>
    </header>
  );
}
