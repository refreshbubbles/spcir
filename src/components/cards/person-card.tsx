import type { Person } from "@/lib/types";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-50 to-sand-50 font-display text-lg font-bold text-brand-700 ring-1 ring-line">
        {initials(person.name)}
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-ink">{person.name}</p>
        <p className="text-sm text-brand-600">{person.role}</p>
        {person.institution && <p className="truncate text-xs text-muted">{person.institution}</p>}
      </div>
    </div>
  );
}
