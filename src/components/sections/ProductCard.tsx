import Image from "next/image";
import Link from "next/link";
import { Trees } from "lucide-react";
import type { EucalyptusProduct } from "@/data/eucalyptus-products";
import { IllustrativeBadge } from "@/components/ui/SiteImage";

/** Card de produto de eucalipto — exibe apenas especificações confirmadas. */
export function ProductCard({ product }: { product: EucalyptusProduct }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[8px] border border-border bg-white">
      <div className="relative aspect-[4/3] bg-forest">
        {product.image ? (
          <>
            <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            {product.imageStatus === "illustrative" && <IllustrativeBadge />}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gold">
            <Trees aria-hidden className="size-10" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[21px] font-semibold text-forest">{product.name}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{product.description}</p>
        {product.specifications.length > 0 && (
          <dl className="mt-4 divide-y divide-border border-y border-border text-[13.5px]">
            {product.specifications.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 py-2">
                <dt className="font-semibold text-forest">{s.label}</dt>
                <dd className="text-right text-muted">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {product.applications.length > 0 && (
          <p className="mt-4 text-[13px] text-muted">
            <span className="font-semibold text-forest">Aplicações: </span>
            {product.applications.join(", ")}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="rounded-full bg-sand px-3 py-1 text-[12px] font-semibold text-heartwood">
            Disponibilidade: {product.availability}
          </span>
          <Link href="#orcamento" className="text-[13px] font-bold text-forest underline underline-offset-4">
            Consultar
          </Link>
        </div>
      </div>
    </article>
  );
}
