import { useMemo, useState } from "react";
import { MapPinned, Search } from "lucide-react";
import { TerritoryTile } from "@/components/territory-tile";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRevisitasStore, type Note } from "@/lib/store";
import { MAX_NOTES, TERRITORY_COUNT, TERRITORY_IDS } from "@/lib/territories";
import { cn } from "@/lib/utils";

type FilterId = "all" | "pending" | "done" | "empty";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "pending", label: "Pendientes" },
  { id: "done", label: "Realizados" },
  { id: "empty", label: "Vacios" },
];

export default function HomeApp() {
  const notesByTerritory = useRevisitasStore((s) => s.notesByTerritory);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

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
          n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
      );
    });
  }, [notesByTerritory, query, filter]);

  return (
return (
  <div className="min-h-screen bg-background">
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Cuaderno de campo</h1>
        <p className="text-muted-foreground">Revisitas</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {TERRITORY_COUNT} territorios. Hasta {MAX_NOTES} notas personales en
          cada uno, con fecha cuando la visita se completa.
        </p>
      </header>

      <div className="mb-6 rounded-xl border bg-card p-4">
        <h2 className="mb-1 text-lg font-semibold">Territorios</h2>
        <p className="text-sm text-muted-foreground">
          Elige un número para ver o añadir revisitas.
        </p>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar territorio o nota"
            className="h-10 pl-9"
            aria-label="Buscar territorio o nota"
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-auto rounded-xl bg-muted p-1">
          {FILTERS.map((item) => {
            const active = filter === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "h-9 min-w-0 flex-1 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-[background-color,color] duration-150",
                  active
                    ? "bg-card text-foreground shadow-lift"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="my-6" />

      {visibleIds.length === 0 ? (
        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          Ningún territorio coincide con esa búsqueda.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleIds.map((id) => (
            <TerritoryTile
              key={id}
              territoryId={id}
              notes={notesByTerritory[String(id)] ?? []}
              hasPending={
                (notesByTerritory[String(id)] ?? []).filter(
                  (n) => !n.done
                ).length > 0
              }
            />
          ))}
        </div>
      )}

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        Las notas se guardan en este dispositivo.
      </footer>
    </div>
  </div>
);