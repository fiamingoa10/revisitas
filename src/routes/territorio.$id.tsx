import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, NotebookPen, Plus } from "lucide-react";
import { toast } from "sonner";
import { NoteCard } from "@/components/note-card";
import { NoteEditor } from "@/components/note-editor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  sortNotes,
  useRevisitasStore,
  useTerritoryNotes,
  type Note,
  type NoteInput,
} from "@/lib/store";
import {
  isValidTerritoryId,
  MAX_NOTES,
  TERRITORY_COUNT,
} from "@/lib/territories";

export const Route = createFileRoute("/territorio/$id")({
  component: TerritoryPage,
});

function TerritoryPage() {
  const { id: rawId } = Route.useParams();
  const territoryId = Number(rawId);

  if (!isValidTerritoryId(territoryId)) {
    return (
      <main className="paper-grid flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="font-display text-2xl font-medium">
          Territorio no encontrado
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Solo hay {TERRITORY_COUNT} territorios, numerados del 1 al{" "}
          {TERRITORY_COUNT}.
        </p>
        <Button asChild>
          <Link to="/">Volver a territorios</Link>
        </Button>
      </main>
    );
  }

  return <TerritoryDetail territoryId={territoryId} />;
}

function TerritoryDetail({ territoryId }: { territoryId: number }) {
  const notes = useTerritoryNotes(territoryId);
  const addNote = useRevisitasStore((s) => s.addNote);
  const updateNote = useRevisitasStore((s) => s.updateNote);
  const setNoteDone = useRevisitasStore((s) => s.setNoteDone);
  const deleteNote = useRevisitasStore((s) => s.deleteNote);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Note | null>(null);

  const sorted = useMemo(() => sortNotes(notes), [notes]);
  const pending = notes.filter((n) => !n.done).length;
  const atLimit = notes.length >= MAX_NOTES;

  function openCreate() {
    if (atLimit) {
      toast.error(`Este territorio ya tiene ${MAX_NOTES} notas.`);
      return;
    }
    setEditing(null);
    setEditorOpen(true);
  }

  function openEdit(note: Note) {
    setEditing(note);
    setEditorOpen(true);
  }

  function handleSave(data: NoteInput) {
    if (editing) {
      updateNote(territoryId, editing.id, data);
      toast.success("Nota actualizada");
      return;
    }
    const result = addNote(territoryId, data);
    if (result === "full") {
      toast.error(`Este territorio ya tiene ${MAX_NOTES} notas.`);
      return;
    }
    toast.success("Nota guardada");
  }

  return (
    <main className="paper-grid min-h-dvh">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 pb-20 sm:px-6 sm:py-10">
        <header className="flex flex-col gap-5">
          <div>
            <Button asChild variant="ghost" className="-ml-2 h-10 px-2">
              <Link to="/">
                <ArrowLeft />
                Territorios
              </Link>
            </Button>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Territorio
              </p>
              <h1 className="font-display text-5xl font-medium tracking-tight tabular-nums leading-none">
                {territoryId}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {notes.length} de {MAX_NOTES} notas
                {notes.length > 0
                  ? ` · ${pending} ${pending === 1 ? "pendiente" : "pendientes"}`
                  : null}
              </p>
            </div>
            <Button
              onClick={openCreate}
              disabled={atLimit}
              className="shrink-0"
            >
              <Plus />
              Nueva nota
            </Button>
          </div>
        </header>

        {sorted.length === 0 ? (
          <EmptyState onAdd={openCreate} />
        ) : (
          <ul className="flex flex-col gap-3">
            {sorted.map((note) => (
              <li key={note.id}>
                <NoteCard
                  note={note}
                  onToggleDone={(done) => {
                    setNoteDone(territoryId, note.id, done);
                    toast.success(
                      done
                        ? "Marcada como realizada"
                        : "Marcada como pendiente",
                    );
                  }}
                  onEdit={() => openEdit(note)}
                  onDelete={() => setPendingDelete(note)}
                />
              </li>
            ))}
          </ul>
        )}

        {atLimit ? (
          <p className="text-center text-xs text-muted-foreground">
            Límite de {MAX_NOTES} notas alcanzado en este territorio.
          </p>
        ) : null}
      </div>

      <NoteEditor
        open={editorOpen}
        onOpenChange={(open) => {
          setEditorOpen(open);
          if (!open) setEditing(null);
        }}
        territoryId={territoryId}
        note={editing}
        onSave={handleSave}
      />

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar esta nota</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete
                ? `Se borrará «${pendingDelete.title}» del territorio ${territoryId}. Esta acción no se puede deshacer.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (!pendingDelete) return;
                deleteNote(territoryId, pendingDelete.id);
                toast.success("Nota eliminada");
                setPendingDelete(null);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-card px-6 py-12 text-center shadow-lift">
      <span className="flex size-12 items-center justify-center rounded-xl bg-muted text-primary">
        <NotebookPen className="size-5" strokeWidth={1.75} />
      </span>
      <h2 className="mt-4 font-display text-xl font-medium">
        Aún no hay revisitas
      </h2>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Añade una nota con el nombre o la dirección, y marca la visita cuando
        la hayas realizado.
      </p>
      <Button className="mt-5" onClick={onAdd}>
        <Plus />
        Nueva nota
      </Button>
    </div>
  );
}
