"use client";

import { useMemo, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";

type Filter = "todos" | ProjectCategory;

export function ProjectGallery({ projects, emptyText }: { projects: Project[]; emptyText: string }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const filters: { key: Filter; label: string }[] = [
    { key: "todos", label: "Todos" },
    ...projectCategories.map((c) => ({ key: c.key, label: c.label })),
  ];
  const visible = useMemo(
    () => (filter === "todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );
  const counts = useMemo(() => {
    const map: Record<string, number> = { todos: projects.length };
    projects.forEach((p) => (map[p.category] = (map[p.category] ?? 0) + 1));
    return map;
  }, [projects]);

  return (
    <div>
      <div role="group" aria-label="Filtrar projetos por categoria" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-[13.5px] font-bold transition-colors",
                  active ? "border-forest bg-forest text-white" : "border-forest/20 bg-white text-forest hover:border-forest/50",
                )}
              >
                {f.label}
                <span className={cn("text-[11px] font-semibold", active ? "text-gold" : "text-muted")}>
                  {counts[f.key] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "projeto exibido" : "projetos exibidos"}
      </p>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} showSummary />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-8"
          icon={<LayoutGrid aria-hidden className="size-6" />}
          text={projects.length === 0 ? emptyText : "Ainda não há projetos publicados nesta categoria."}
          action={{ label: "Falar com a MAPASA", href: "/contato?servico=planejados" }}
        />
      )}
    </div>
  );
}
