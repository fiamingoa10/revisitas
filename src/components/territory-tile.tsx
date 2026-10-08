import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { Note } from "@/lib/store";
import { MAX_NOTES } from "@/lib/territories";
import { cn } from "@/lib/utils";

type TerritoryTileProps = {
  id: number;
  notes: Note[];
  highlighted?: boolean;
};

function formatLastUpdate(notes: Note[]): string {
  if (notes.length === 0) return "Sin revisitas";

  const latest = Math.max(...notes.map((note) => note.updatedAt));
  const date = new Date(latest);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(date, today)) return "Actualizado hoy";
  if (sameDay(date, yesterday)) return "Actualizado ayer";

  return `Actualizado ${new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date)}`;
}

export function TerritoryTile({ id, notes, highlighted }: TerritoryTileProps) {
  const total = notes.length;
  const done = notes.filter((note) => note.done).length;
  const pending = total - done;
  const allDone = total > 0 && pending === 0;
  const hasNotes = total > 0;
  const lastUpdate = formatLastUpdate(notes);

  return (
    <Link
      to="/territorio/$id"
      params={{ id: String(id) }}
      aria-label={
        hasNotes
          ? `Territorio ${id}, ${pending} pendientes, ${done} realizadas, ${lastUpdate}`
          : `Territorio ${id}, sin revisitas`
      }
      className={cn(
        "group relative flex min-h-28 flex-col rounded-xl p-3 shadow-lift outline-none transition-[box-shadow,transform,background-color] duration-150 ease-[var(--ease-smooth-out)]",
        "focus-visible:ring-ring/40 focus-visible:ring-[3px]",
        "active:scale-[0.98]",
        !hasNotes && "bg-card hover:shadow-lift-hover",
        hasNotes && !allDone && "bg-tile-pending hover:shadow-lift-hover",
        allDone && "bg-tile-done hover:shadow-lift-hover",
        highlighted && "ring-2 ring-ring/50",
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <span
          className={cn(
            "font-display text-2xl leading-none tracking-tight tabular-nums",
            hasNotes ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {id}
        </span>

        {allDone ? (
          <span className="flex size-5 items-center justify-center rounded-full bg-success text-success-foreground">
            <Check className="size-3" strokeWidth={3} />
          </span>
        ) : pending > 0 ? (
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold leading-none text-primary-foreground tabular-nums">
            {pending}
          </span>
        ) : null}
      </div>

      {hasNotes ? (
        <div className="mt-3 flex flex-1 flex-col justify-end gap-1">
          <div className="flex items-center justify-between gap-2 text-xs tabular-nums">
            <span className="text-muted-foreground">Pendientes</span>
            <strong className="font-semibold text-foreground">{pending}</strong>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs tabular-nums">
            <span className="text-muted-foreground">Realizadas</span>
            <strong className="font-semibold text-foreground">{done}</strong>
          </div>
          <div className="mt-1 border-t border-foreground/10 pt-1 text-[10px] leading-tight text-muted-foreground">
            {lastUpdate}
          </div>
        </div>
      ) : (
        <div className="mt-auto text-[11px] leading-tight text-muted-foreground">
          Sin revisitas
          <span className="mt-1 block text-[10px] opacity-75">
            0/{MAX_NOTES} notas
          </span>
        </div>
      )}
    </Link>
  );
}
