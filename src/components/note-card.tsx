import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Note } from "@/lib/store";
import { formatVisitDate } from "@/lib/territories";

type NoteCardProps = {
  note: Note;
  onToggleDone: (done: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function NoteCard({
  note,
  onToggleDone,
  onEdit,
  onDelete,
}: NoteCardProps) {
  return (
    <article className="rounded-xl bg-card p-4 shadow-lift transition-[box-shadow] duration-150">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={note.done}
          onCheckedChange={(value) => onToggleDone(value === true)}
          aria-label={
            note.done
              ? `Marcar ${note.title} como pendiente`
              : `Marcar ${note.title} como realizada`
          }
          className="mt-1"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium leading-snug text-foreground">
              {note.title}
            </h3>
            <div className="flex shrink-0 items-center">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Editar ${note.title}`}
                onClick={onEdit}
              >
                <Pencil />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Eliminar ${note.title}`}
                onClick={onDelete}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          {note.body ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {note.body}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {note.done && note.doneAt ? (
              <Badge variant="success">
                <CalendarDays />
                Realizada el {formatVisitDate(note.doneAt)}
              </Badge>
            ) : (
              <Badge variant="pending">Pendiente</Badge>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
