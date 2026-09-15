import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, w as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as MapPinned, i as Search, l as Check } from "../_libs/lucide-react.mjs";
import { c as useRevisitasStore, n as TERRITORY_IDS, r as cn, t as Input } from "./store-CJuy4YgU.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWe6If59.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TerritoryTile({ id, notes, highlighted }) {
	const total = notes.length;
	const pending = total - notes.filter((n) => n.done).length;
	const allDone = total > 0 && pending === 0;
	const hasNotes = total > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/territorio/$id",
		params: { id: String(id) },
		"aria-label": hasNotes ? `Territorio ${id}, ${total} ${total === 1 ? "nota" : "notas"}, ${pending} pendientes` : `Territorio ${id}, sin notas`,
		className: cn("group relative flex min-h-20 flex-col justify-between rounded-xl p-3 shadow-lift outline-none transition-[box-shadow,transform,background-color] duration-150 ease-[var(--ease-smooth-out)] sm:min-h-24", "focus-visible:ring-ring/40 focus-visible:ring-[3px]", "active:scale-[0.98]", !hasNotes && "bg-card hover:shadow-lift-hover", hasNotes && !allDone && "bg-tile-pending hover:shadow-lift-hover", allDone && "bg-tile-done hover:shadow-lift-hover", highlighted && "ring-2 ring-ring/50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-display text-2xl leading-none tracking-tight tabular-nums", hasNotes ? "text-foreground" : "text-muted-foreground"),
				children: id
			}), allDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-5 items-center justify-center rounded-full bg-success text-success-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-3",
					strokeWidth: 3
				})
			}) : pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold leading-none text-primary-foreground tabular-nums",
				children: pending
			}) : null]
		}), hasNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-xs text-muted-foreground tabular-nums",
			children: [
				total,
				"/",
				10,
				pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden sm:inline",
					children: [
						" · ",
						pending,
						" pend."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: " · hechas"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-4",
			"aria-hidden": "true"
		})]
	});
}
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "separator",
		decorative,
		orientation,
		className: cn("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className),
		...props
	});
}
var FILTERS = [
	{
		id: "all",
		label: "Todos"
	},
	{
		id: "pending",
		label: "Pendientes"
	},
	{
		id: "done",
		label: "Realizados"
	},
	{
		id: "empty",
		label: "Vacíos"
	}
];
function Home() {
	const notesByTerritory = useRevisitasStore((s) => s.notesByTerritory);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const stats = (0, import_react.useMemo)(() => summarize(notesByTerritory), [notesByTerritory]);
	const visibleIds = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return TERRITORY_IDS.filter((id) => {
			const notes = notesByTerritory[String(id)] ?? [];
			const total = notes.length;
			const pending = notes.filter((n) => !n.done).length;
			if (!(filter === "all" || filter === "pending" && pending > 0 || filter === "done" && total > 0 && pending === 0 || filter === "empty" && total === 0)) return false;
			if (!q) return true;
			if (String(id).includes(q)) return true;
			return notes.some((n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
		});
	}, [
		notesByTerritory,
		query,
		filter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "paper-grid min-h-dvh",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 pb-16 sm:px-6 sm:py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lift",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinned, {
								className: "size-5",
								strokeWidth: 1.75
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-widest text-muted-foreground uppercase",
									children: "Cuaderno de campo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl",
									children: "Revisitas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base",
									children: [
										33,
										" territorios. Hasta ",
										10,
										" notas personales en cada uno, con fecha cuando la visita se completa."
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-3 gap-2 sm:gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Pendientes",
								value: stats.pending
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Realizadas",
								value: stats.done
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								label: "Territorios",
								value: stats.active,
								hint: `/ 33`
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-4",
					"aria-labelledby": "territorios-heading",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "territorios-heading",
								className: "font-display text-2xl font-medium tracking-tight",
								children: "Territorios"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Elige un número para ver o añadir revisitas."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full sm:max-w-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: query,
									onChange: (e) => setQuery(e.target.value),
									placeholder: "Buscar territorio o nota",
									className: "h-10 pl-9",
									"aria-label": "Buscar territorio o nota"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 overflow-x-auto rounded-xl bg-secondary p-1",
							role: "tablist",
							"aria-label": "Filtrar territorios",
							children: FILTERS.map((item) => {
								const active = filter === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									role: "tab",
									"aria-selected": active,
									onClick: () => setFilter(item.id),
									className: cn("h-9 min-w-0 flex-1 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-[background-color,color] duration-150", active ? "bg-card text-foreground shadow-lift" : "text-muted-foreground hover:text-foreground"),
									children: item.label
								}, item.id);
							})
						}),
						visibleIds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl bg-card px-4 py-8 text-center text-sm text-muted-foreground shadow-lift",
							children: "Ningún territorio coincide con esa búsqueda."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-2.5 md:grid-cols-6 lg:grid-cols-11",
							children: visibleIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerritoryTile, {
								id,
								notes: notesByTerritory[String(id)] ?? [],
								highlighted: query.trim().length > 0
							}, id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-muted-foreground",
					children: "Las notas se guardan en este dispositivo."
				})
			]
		})
	});
}
function StatCard({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card px-3 py-3 shadow-lift sm:px-4 sm:py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "mt-1 font-display text-2xl leading-none tracking-tight tabular-nums sm:text-3xl",
			children: [value, hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-base text-muted-foreground",
				children: hint
			}) : null]
		})]
	});
}
function summarize(notesByTerritory) {
	let pending = 0;
	let done = 0;
	let active = 0;
	for (const notes of Object.values(notesByTerritory)) {
		if (!notes.length) continue;
		active += 1;
		for (const note of notes) if (note.done) done += 1;
		else pending += 1;
	}
	return {
		pending,
		done,
		active
	};
}
//#endregion
export { Home as component };
