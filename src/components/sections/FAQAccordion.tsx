"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function FAQAccordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <div className="divide-y divide-forest/12 border-y border-forest/12">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-heading text-[18px] font-medium text-forest transition-colors hover:text-heartwood lg:text-[20px]"
              >
                {item.question}
                <span
                  aria-hidden
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border border-forest/20 transition-all duration-200",
                    isOpen && "rotate-45 border-gold bg-gold",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="pb-6 pr-14">
              <p className="lead text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
