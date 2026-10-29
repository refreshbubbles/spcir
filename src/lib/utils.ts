import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Ensina ao tailwind-merge os tokens personalizados definidos em globals.css.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["card"],
      shadow: ["soft", "lift"],
      font: ["display"],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const tz = "Europe/Lisbon";

export function formatDate(
  iso: string,
  opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
) {
  return new Intl.DateTimeFormat("pt-PT", { timeZone: tz, ...opts }).format(new Date(`${iso}T12:00:00Z`));
}

/** "28 – 30 out. 2026", "30 nov. – 1 dez. 2026" ou "19 out. 2026". */
export function formatDateRange(start: string, end?: string) {
  const short: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  if (!end || end === start) return formatDate(start, short);
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  if (sameMonth) return `${formatDate(start, { day: "numeric" })} – ${formatDate(end, short)}`;
  return `${formatDate(start, { day: "numeric", month: "short" })} – ${formatDate(end, short)}`;
}

export function dateParts(iso: string) {
  return {
    day: formatDate(iso, { day: "2-digit" }),
    month: formatDate(iso, { month: "short" }).replace(".", ""),
    year: formatDate(iso, { year: "numeric" }),
    weekday: formatDate(iso, { weekday: "short" }).replace(".", ""),
  };
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);
