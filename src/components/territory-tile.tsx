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

export function TerritoryTile({ id, notes, highlighted }: TerritoryTileProps) {
  const total = notes.length;
  const done = notes.filter((n) => n.done).length;
  const pending = total - done;
  const allDone = total > 0 && pending === 0;
  const hasNotes = total > 0;

  return (
    <Link
      to="/territorio/$id"
      params={{ id: String(id) }}
      aria-label={
        hasNotes
          ? `Territorio ${id}, ${total} ${total === 1 ? "nota" : "notas"}, ${pending} pendientes`
          : `Territorio ${id}, sin notas`
      }
      className={cn(
        "group relative flex min-h-20 flex-col justify-between rounded-xl p-3 shadow-lift outline-none transition-[box-shadow,transform,background-color] duration-150 ease-[var(--ease-smooth-out)] sm:min-h-24",
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
        <div className="text-xs text-muted-foreground tabular-nums">
          {total}/{MAX_NOTES}
          {pending > 0 ? (
            <span className="hidden sm:inline"> · {pending} pend.</span>
          ) : (
            <span className="hidden sm:inline"> · hechas</span>
          )}
        </div>
      ) : (
        <div className="h-4" aria-hidden="true" />
      )}
    </Link>
  );
}
