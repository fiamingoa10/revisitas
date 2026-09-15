import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const TERRITORY_COUNT = 33;
export const MAX_NOTES = 10;
export const TERRITORY_IDS = Array.from(
  { length: TERRITORY_COUNT },
  (_, i) => i + 1,
);

export function isValidTerritoryId(id: number): boolean {
  return Number.isInteger(id) && id >= 1 && id <= TERRITORY_COUNT;
}

export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatVisitDate(isoDate: string): string {
  try {
    return format(parseISO(isoDate), "d MMM yyyy", { locale: es });
  } catch {
    return isoDate;
  }
}
