import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Note, NoteInput } from "@/lib/store";
import { todayISO } from "@/lib/territories";

type NoteEditorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  territoryId: number;
  note?: Note | null;
  onSave: (data: NoteInput) => void;
};

export function NoteEditor({
  open,
  onOpenChange,
  territoryId,
  note,
  onSave,
}: NoteEditorProps) {
  const isEdit = Boolean(note);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [done, setDone] = useState(false);
  const [doneAt, setDoneAt] = useState(todayISO());
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(note?.title ?? "");
    setBody(note?.body ?? "");
    setDone(note?.done ?? false);
    setDoneAt(note?.doneAt ?? todayISO());
    setError(false);
  }, [open, note]);

  function handleDoneChange(checked: boolean) {
    setDone(checked);
    if (checked && !doneAt) setDoneAt(todayISO());
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) {
      setError(true);
      return;
    }
    onSave({
      title,
      body,
      done,
      doneAt: done ? doneAt || todayISO() : null,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar nota" : "Nueva nota"}
          </DialogTitle>
          <DialogDescription>
            Territorio {territoryId}. Marca la visita cuando la hayas realizado
            y registra la fecha.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="note-title">Nombre o dirección</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Ej. Familia López, calle 12 n.º 8"
              autoFocus
              aria-invalid={error || undefined}
              maxLength={80}
            />
            {error ? (
              <p className="text-sm text-destructive">
                Añade un nombre o una referencia.
              </p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note-body">Notas personales</Label>
            <Textarea
              id="note-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tema de conversación, mejor hora, observaciones…"
              maxLength={600}
            />
          </div>
          <div className="rounded-xl bg-muted/70 p-3.5">
            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={done}
                onCheckedChange={(value) => handleDoneChange(value === true)}
                className="mt-0.5"
              />
              <span className="grid gap-0.5">
                <span className="text-sm font-medium">Realizada</span>
                <span className="text-xs text-muted-foreground">
                  Marca esta casilla cuando hayas completado la visita.
                </span>
              </span>
            </label>
            {done ? (
              <div className="mt-3 grid gap-2 border-t border-border/80 pt-3">
                <Label htmlFor="note-date" className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  Fecha en que se completó
                </Label>
                <Input
                  id="note-date"
                  type="date"
                  value={doneAt}
                  max={todayISO()}
                  onChange={(e) => setDoneAt(e.target.value)}
                  className="h-10"
                />
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">{isEdit ? "Guardar cambios" : "Guardar nota"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
