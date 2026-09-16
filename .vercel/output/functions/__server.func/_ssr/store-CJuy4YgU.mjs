import "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as parseISO, r as format, t as es } from "../_libs/date-fns.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var TERRITORY_IDS = Array.from({ length: 33 }, (_, i) => i + 1);
function isValidTerritoryId(id) {
	return Number.isInteger(id) && id >= 1 && id <= 33;
}
function todayISO() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatVisitDate(isoDate) {
	try {
		return format(parseISO(isoDate), "d MMM yyyy", { locale: es });
	} catch {
		return isoDate;
	}
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("flex h-11 w-full min-w-0 rounded-md border border-input bg-card px-3 py-2 text-base text-foreground shadow-lift transition-[color,box-shadow,border-color] duration-150 outline-none placeholder:text-muted-foreground/80 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]", "aria-invalid:border-destructive aria-invalid:ring-destructive/20", className),
		...props
	});
}
var EMPTY_NOTES = [];
function territoryKey(id) {
	return String(id);
}
function newId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
function normalize(data) {
	const title = data.title.trim();
	const body = data.body.trim();
	const done = data.done;
	return {
		title,
		body,
		done,
		doneAt: done ? data.doneAt || todayISO() : null
	};
}
var useRevisitasStore = create()(persist((set, get) => ({
	notesByTerritory: {},
	addNote: (territoryId, data) => {
		const k = territoryKey(territoryId);
		const current = get().notesByTerritory[k] ?? [];
		if (current.length >= 10) return "full";
		const now = Date.now();
		const parsed = normalize(data);
		const note = {
			id: newId(),
			...parsed,
			createdAt: now,
			updatedAt: now
		};
		set({ notesByTerritory: {
			...get().notesByTerritory,
			[k]: [...current, note]
		} });
		return "ok";
	},
	updateNote: (territoryId, noteId, data) => {
		const k = territoryKey(territoryId);
		const current = get().notesByTerritory[k] ?? [];
		const parsed = normalize(data);
		const now = Date.now();
		set({ notesByTerritory: {
			...get().notesByTerritory,
			[k]: current.map((note) => note.id === noteId ? {
				...note,
				...parsed,
				updatedAt: now
			} : note)
		} });
	},
	setNoteDone: (territoryId, noteId, done) => {
		const k = territoryKey(territoryId);
		const current = get().notesByTerritory[k] ?? [];
		const now = Date.now();
		set({ notesByTerritory: {
			...get().notesByTerritory,
			[k]: current.map((note) => note.id === noteId ? {
				...note,
				done,
				doneAt: done ? note.doneAt || todayISO() : null,
				updatedAt: now
			} : note)
		} });
	},
	deleteNote: (territoryId, noteId) => {
		const k = territoryKey(territoryId);
		const next = (get().notesByTerritory[k] ?? []).filter((note) => note.id !== noteId);
		const all = { ...get().notesByTerritory };
		if (next.length === 0) delete all[k];
		else all[k] = next;
		set({ notesByTerritory: all });
	}
}), { name: "revisitas-v1" }));
function useTerritoryNotes(territoryId) {
	return useRevisitasStore((s) => s.notesByTerritory[territoryKey(territoryId)] ?? EMPTY_NOTES);
}
function sortNotes(notes) {
	return [...notes].sort((a, b) => {
		if (a.done !== b.done) return a.done ? 1 : -1;
		return b.updatedAt - a.updatedAt;
	});
}
//#endregion
export { isValidTerritoryId as a, useRevisitasStore as c, formatVisitDate as i, useTerritoryNotes as l, TERRITORY_IDS as n, sortNotes as o, cn as r, todayISO as s, Input as t };
