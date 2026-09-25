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
          n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q),
      );
    });
  }, [notesByTerritory, query, filter]);

  return (