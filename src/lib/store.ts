import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_NOTES, todayISO } from "@/lib/territories";

export type Note = {
  id: string;
  title: string;
  body: string;
  done: boolean;
  doneAt: string | null;
  createdAt: number;
  updatedAt: number;
};

export type NoteInput = {
  title: string;
  body: string;
  done: boolean;
  doneAt: string | null;
};

type RevisitasState = {
  notesByTerritory: Record<string, Note[]>;
  addNote: (territoryId: number, data: NoteInput) => "ok" | "full";
  updateNote: (territoryId: number, noteId: string, data: NoteInput) => void;
  setNoteDone: (territoryId: number, noteId: string, done: boolean) => void;
  deleteNote: (territoryId: number, noteId: string) => void;
};

const EMPTY_NOTES: Note[] = [];

function territoryKey(id: number): string {
  return String(id);
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalize(data: NoteInput): Omit<NoteInput, "title" | "body"> & {
  title: string;
  body: string;
} {
  const title = data.title.trim();
  const body = data.body.trim();
  const done = data.done;
  const doneAt = done ? (data.doneAt || todayISO()) : null;
  return { title, body, done, doneAt };
}

export const useRevisitasStore = create<RevisitasState>()(
  persist(
    (set, get) => ({
      notesByTerritory: {},

      addNote: (territoryId, data) => {
        const k = territoryKey(territoryId);
        const current = get().notesByTerritory[k] ?? [];
        if (current.length >= MAX_NOTES) return "full";
        const now = Date.now();
        const parsed = normalize(data);
        const note: Note = {
          id: newId(),
          ...parsed,
          createdAt: now,
          updatedAt: now,
        };
        set({
          notesByTerritory: {
            ...get().notesByTerritory,
            [k]: [...current, note],
          },
        });
        return "ok";
      },

      updateNote: (territoryId, noteId, data) => {
        const k = territoryKey(territoryId);
        const current = get().notesByTerritory[k] ?? [];
        const parsed = normalize(data);
        const now = Date.now();
        set({
          notesByTerritory: {
            ...get().notesByTerritory,
            [k]: current.map((note) =>
              note.id === noteId
                ? { ...note, ...parsed, updatedAt: now }
                : note,
            ),
          },
        });
      },

      setNoteDone: (territoryId, noteId, done) => {
        const k = territoryKey(territoryId);
        const current = get().notesByTerritory[k] ?? [];
        const now = Date.now();
        set({
          notesByTerritory: {
            ...get().notesByTerritory,
            [k]: current.map((note) =>
              note.id === noteId
                ? {
                    ...note,
                    done,
                    doneAt: done ? note.doneAt || todayISO() : null,
                    updatedAt: now,
                  }
                : note,
            ),
          },
        });
      },

      deleteNote: (territoryId, noteId) => {
        const k = territoryKey(territoryId);
        const current = get().notesByTerritory[k] ?? [];
        const next = current.filter((note) => note.id !== noteId);
        const all = { ...get().notesByTerritory };
        if (next.length === 0) {
          delete all[k];
        } else {
          all[k] = next;
        }
        set({ notesByTerritory: all });
      },
    }),
    { name: "revisitas-v1" },
  ),
);

export function useTerritoryNotes(territoryId: number): Note[] {
  return useRevisitasStore(
    (s) => s.notesByTerritory[territoryKey(territoryId)] ?? EMPTY_NOTES,
  );
}

export function sortNotes(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return b.updatedAt - a.updatedAt;
  });
}
