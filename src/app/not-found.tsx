import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { mainMenu } from "@/config/navigation";

export const metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/2 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, #D4B46A 0 3px, transparent 3px 34px)" }}
      />
      <div className="container-site relative py-20 lg:py-28">
        <div className="max-w-[640px] lg:pl-[44px]">
          <p className="eyebrow text-gold">Erro 404</p>
          <h1 className="mt-4 text-[clamp(34px,8.5vw,56px)] font-semibold text-white">
            Esta página não foi encontrada.
          </h1>
          <p className="lead mt-5 text-white/85">
            O endereço pode ter mudado ou o conteúdo ainda não foi publicado. Escolha um caminho abaixo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Voltar ao início</ButtonLink>
            <ButtonLink href="/contato" variant="outlineLight">
              Falar com a MAPASA
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            {mainMenu.slice(1).map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="text-white/75 underline-offset-4 hover:text-gold hover:underline">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
