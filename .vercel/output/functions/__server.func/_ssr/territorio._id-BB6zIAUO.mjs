import { i as __toESM } from "../_runtime.mjs";
import { T as require_react, a as Overlay2, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose, w as require_jsx_runtime, x as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, d as ArrowLeft, l as Check, o as Pencil, r as Trash2, s as NotebookPen, t as X, u as CalendarDays } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-DWIxVerr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as isValidTerritoryId, c as useRevisitasStore, i as formatVisitDate, l as useTerritoryNotes, o as sortNotes, r as cn, s as todayISO, t as Input } from "./store-CJuy4YgU.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/territorio._id-BB6zIAUO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:size-3 [&>svg]:pointer-events-none", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		outline: "border-border text-muted-foreground",
		success: "border-transparent bg-success/15 text-success",
		pending: "border-transparent bg-primary/12 text-primary"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-slot": "badge",
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-[var(--ease-smooth-out)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lift",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lift",
			outline: "border border-border bg-card text-foreground hover:bg-muted shadow-lift",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-muted hover:text-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-4 py-2 has-[>svg]:px-3",
			sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
			lg: "h-11 rounded-lg px-5 has-[>svg]:px-4",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		"data-slot": "checkbox",
		className: cn("peer relative size-5 shrink-0 rounded-sm border border-border bg-card shadow-lift outline-none transition-[background-color,border-color,box-shadow] duration-150", "after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-['']", "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]", "data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=checked]:text-success-foreground", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			"data-slot": "checkbox-indicator",
			className: "flex items-center justify-center text-current",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3.5",
				strokeWidth: 3
			})
		})
	});
}
function NoteCard({ note, onToggleDone, onEdit, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "rounded-xl bg-card p-4 shadow-lift transition-[box-shadow] duration-150",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: note.done,
				onCheckedChange: (value) => onToggleDone(value === true),
				"aria-label": note.done ? `Marcar ${note.title} como pendiente` : `Marcar ${note.title} como realizada`,
				className: "mt-1"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-medium leading-snug text-foreground",
							children: note.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": `Editar ${note.title}`,
								onClick: onEdit,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": `Eliminar ${note.title}`,
								onClick: onDelete,
								className: "text-muted-foreground hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})]
						})]
					}),
					note.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted-foreground",
						children: note.body
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: note.done && note.doneAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "success",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
								"Realizada el ",
								formatVisitDate(note.doneAt)
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "pending",
							children: "Pendiente"
						})
					})
				]
			})]
		})
	});
}
function Dialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		"data-slot": "dialog-content",
		className: cn("fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-lift duration-200 outline-none sm:p-6", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, showCloseButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: "absolute top-3.5 right-3.5 rounded-sm p-1.5 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-ring/40 focus-visible:ring-[3px] focus-visible:outline-none",
			"aria-label": "Cerrar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		}) : null]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-footer",
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "dialog-title",
		className: cn("font-display text-xl font-medium leading-snug tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-slot": "dialog-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "label",
		className: cn("text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex field-sizing-content min-h-28 w-full rounded-md border border-input bg-card px-3 py-2.5 text-base text-foreground shadow-lift transition-[color,box-shadow,border-color] duration-150 outline-none placeholder:text-muted-foreground/80 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]", "aria-invalid:border-destructive aria-invalid:ring-destructive/20", className),
		...props
	});
}
function NoteEditor({ open, onOpenChange, territoryId, note, onSave }) {
	const isEdit = Boolean(note);
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const [doneAt, setDoneAt] = (0, import_react.useState)(todayISO());
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setTitle(note?.title ?? "");
		setBody(note?.body ?? "");
		setDone(note?.done ?? false);
		setDoneAt(note?.doneAt ?? todayISO());
		setError(false);
	}, [open, note]);
	function handleDoneChange(checked) {
		setDone(checked);
		if (checked && !doneAt) setDoneAt(todayISO());
	}
	function handleSubmit(event) {
		event.preventDefault();
		if (!title.trim()) {
			setError(true);
			return;
		}
		onSave({
			title,
			body,
			done,
			doneAt: done ? doneAt || todayISO() : null
		});
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isEdit ? "Editar nota" : "Nueva nota" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				"Territorio ",
				territoryId,
				". Marca la visita cuando la hayas realizado y registra la fecha."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "note-title",
								children: "Nombre o dirección"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "note-title",
								value: title,
								onChange: (e) => {
									setTitle(e.target.value);
									if (error) setError(false);
								},
								placeholder: "Ej. Familia López, calle 12 n.º 8",
								autoFocus: true,
								"aria-invalid": error || void 0,
								maxLength: 80
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-destructive",
								children: "Añade un nombre o una referencia."
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "note-body",
							children: "Notas personales"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "note-body",
							value: body,
							onChange: (e) => setBody(e.target.value),
							placeholder: "Tema de conversación, mejor hora, observaciones…",
							maxLength: 600
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-muted/70 p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: done,
								onCheckedChange: (value) => handleDoneChange(value === true),
								className: "mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "grid gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "Realizada"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Marca esta casilla cuando hayas completado la visita."
								})]
							})]
						}), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid gap-2 border-t border-border/80 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								htmlFor: "note-date",
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), "Fecha en que se completó"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "note-date",
								type: "date",
								value: doneAt,
								max: todayISO(),
								onChange: (e) => setDoneAt(e.target.value),
								className: "h-10"
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: isEdit ? "Guardar cambios" : "Guardar nota"
					})] })
				]
			})]
		})
	});
}
function AlertDialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		"data-slot": "alert-dialog-overlay",
		className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-slot": "alert-dialog-content",
		className: cn("fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-lift duration-200 sm:p-6", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		"data-slot": "alert-dialog-title",
		className: cn("font-display text-xl font-medium leading-snug tracking-tight", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		"data-slot": "alert-dialog-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
function TerritoryPage() {
	const { id: rawId } = Route.useParams();
	const territoryId = Number(rawId);
	if (!isValidTerritoryId(territoryId)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "paper-grid flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-medium",
				children: "Territorio no encontrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: [
					"Solo hay ",
					33,
					" territorios, numerados del 1 al",
					" ",
					33,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Volver a territorios"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerritoryDetail, { territoryId });
}
function TerritoryDetail({ territoryId }) {
	const notes = useTerritoryNotes(territoryId);
	const addNote = useRevisitasStore((s) => s.addNote);
	const updateNote = useRevisitasStore((s) => s.updateNote);
	const setNoteDone = useRevisitasStore((s) => s.setNoteDone);
	const deleteNote = useRevisitasStore((s) => s.deleteNote);
	const [editorOpen, setEditorOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const sorted = (0, import_react.useMemo)(() => sortNotes(notes), [notes]);
	const pending = notes.filter((n) => !n.done).length;
	const atLimit = notes.length >= 10;
	function openCreate() {
		if (atLimit) {
			toast.error(`Este territorio ya tiene 10 notas.`);
			return;
		}
		setEditing(null);
		setEditorOpen(true);
	}
	function openEdit(note) {
		setEditing(note);
		setEditorOpen(true);
	}
	function handleSave(data) {
		if (editing) {
			updateNote(territoryId, editing.id, data);
			toast.success("Nota actualizada");
			return;
		}
		if (addNote(territoryId, data) === "full") {
			toast.error(`Este territorio ya tiene 10 notas.`);
			return;
		}
		toast.success("Nota guardada");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "paper-grid min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 pb-20 sm:px-6 sm:py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-col gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: "-ml-2 h-10 px-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), "Territorios"]
							})
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium tracking-widest text-muted-foreground uppercase",
										children: "Territorio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-5xl font-medium tracking-tight tabular-nums leading-none",
										children: territoryId
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: [
											notes.length,
											" de ",
											10,
											" notas",
											notes.length > 0 ? ` · ${pending} ${pending === 1 ? "pendiente" : "pendientes"}` : null
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: openCreate,
								disabled: atLimit,
								className: "shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Nueva nota"]
							})]
						})]
					}),
					sorted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { onAdd: openCreate }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-3",
						children: sorted.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteCard, {
							note,
							onToggleDone: (done) => {
								setNoteDone(territoryId, note.id, done);
								toast.success(done ? "Marcada como realizada" : "Marcada como pendiente");
							},
							onEdit: () => openEdit(note),
							onDelete: () => setPendingDelete(note)
						}) }, note.id))
					}),
					atLimit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: [
							"Límite de ",
							10,
							" notas alcanzado en este territorio."
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteEditor, {
				open: editorOpen,
				onOpenChange: (open) => {
					setEditorOpen(open);
					if (!open) setEditing(null);
				},
				territoryId,
				note: editing,
				onSave: handleSave
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(pendingDelete),
				onOpenChange: (open) => {
					if (!open) setPendingDelete(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Eliminar esta nota" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: pendingDelete ? `Se borrará «${pendingDelete.title}» del territorio ${territoryId}. Esta acción no se puede deshacer.` : "" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: () => {
						if (!pendingDelete) return;
						deleteNote(territoryId, pendingDelete.id);
						toast.success("Nota eliminada");
						setPendingDelete(null);
					},
					children: "Eliminar"
				})] })] })
			})
		]
	});
}
function EmptyState({ onAdd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center rounded-2xl bg-card px-6 py-12 text-center shadow-lift",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-xl bg-muted text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, {
					className: "size-5",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-xl font-medium",
				children: "Aún no hay revisitas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground",
				children: "Añade una nota con el nombre o la dirección, y marca la visita cuando la hayas realizado."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-5",
				onClick: onAdd,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Nueva nota"]
			})
		]
	});
}
//#endregion
export { TerritoryPage as component };
