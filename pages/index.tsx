import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPinned, Search } from "lucide-react";
import { TerritoryTile } from "@/components/territory-tile";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRevisitasStore, type Note } from "@/lib/store";
import { MAX_NOTES, TERRITORY_COUNT, TERRITORY_IDS } from "@/lib/territories";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

type FilterId = "all" | "pending" | "done" | "empty";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "pending", label: "Pendientes" },
  { id: "done", label: "Realizados" },
  { id: "empty", label: "Vacíos" },
];

function Home() {
  const notesByTerritory = useRevisitasStore((s) => s.notesByTerritory);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");

  const stats = useMemo(() => summarize(notesByTerritory), [notesByTerritory]);

  const visibleIds = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TERRITORY_IDS.filter((id) => {
      const notes = notesByTerritory[String(id)] ?? [];
      const total = notes.length;
      const pending = notes.filter((n) => !n.done).length;
      const matchesFilter =
        filter === "all" ||
        (filter === "pending" && pending > 0) ||
        (filter === "done" && total > 0 && pending === 0) ||
        (filter === "empty" && total === 0);
      if (!matchesFilter) return false;
      if (!q) return true;
      if (String(id).includes(q)) return true;
      return notes.some(
        (n) =>
          n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q),
      );
    });
  }, [notesByTerritory, query, filter]);

  return (
    <main className="paper-grid min-h-dvh">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 pb-16 sm:px-6 sm:py-10">
        <header className="flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <span className="mt-1 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lift">
              <MapPinned className="size-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Cuaderno de campo
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                Revisitas
              </h1>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                {TERRITORY_COUNT} territorios. Hasta {MAX_NOTES} notas
                personales en cada uno, con fecha cuando la visita se completa.
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatCard label="Pendientes" value={stats.pending} />
            <StatCard label="Realizadas" value={stats.done} />
            <StatCard
              label="Territorios"
              value={stats.active}
              hint={`/ ${TERRITORY_COUNT}`}
            />
          </dl>
        </header>

        <section
          className="flex flex-col gap-4"
          aria-labelledby="territorios-heading"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="territorios-heading"
                className="font-display text-2xl font-medium tracking-tight"
              >
                Territorios
              </h2>
              <p className="text-sm text-muted-foreground">
                Elige un número para ver o añadir revisitas.
              </p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar territorio o nota"
                className="h-10 pl-9"
                aria-label="Buscar territorio o nota"
              />
            </div>
          </div>

          <div
            className="flex gap-1 overflow-x-auto rounded-xl bg-secondary p-1"
            role="tablist"
            aria-label="Filtrar territorios"
          >
            {FILTERS.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "h-9 min-w-0 flex-1 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-[background-color,color] duration-150",
                    active
                      ? "bg-card text-foreground shadow-lift"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {visibleIds.length === 0 ? (
            <p className="rounded-xl bg-card px-4 py-8 text-center text-sm text-muted-foreground shadow-lift">
              Ningún territorio coincide con esa búsqueda.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-2.5 md:grid-cols-6 lg:grid-cols-11">
              {visibleIds.map((id) => (
                <TerritoryTile
                  key={id}
                  id={id}
                  notes={notesByTerritory[String(id)] ?? []}
                  highlighted={query.trim().length > 0}
                />
              ))}
            </div>
          )}
        </section>

        <Separator />
        <p className="text-center text-xs text-muted-foreground">
          Las notas se guardan en este dispositivo.
        </p>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl bg-card px-3 py-3 shadow-lift sm:px-4 sm:py-4">
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl leading-none tracking-tight tabular-nums sm:text-3xl">
        {value}
        {hint ? (
          <span className="ml-1 text-base text-muted-foreground">{hint}</span>
        ) : null}
      </dd>
    </div>
  );
}

function summarize(notesByTerritory: Record<string, Note[]>) {
  let pending = 0;
  let done = 0;
  let active = 0;
  for (const notes of Object.values(notesByTerritory)) {
    if (!notes.length) continue;
    active += 1;
    for (const note of notes) {
      if (note.done) done += 1;
      else pending += 1;
    }
  }
  return { pending, done, active };
}

export default Home;
