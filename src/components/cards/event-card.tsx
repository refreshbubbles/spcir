import { MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { EventItem } from "@/lib/types";
import { cn, dateParts, formatDateRange } from "@/lib/utils";

export function DateBadge({ iso, className }: { iso: string; className?: string }) {
  const { day, month } = dateParts(iso);
  return (
    <div
      className={cn("flex w-16 shrink-0 flex-col items-center rounded-2xl bg-white py-2.5 ring-1 ring-line", className)}
    >
      <span className="text-[0.6875rem] font-bold tracking-wider text-sand-600 uppercase">{month}</span>
      <span className="font-display text-2xl leading-none font-bold text-ink">{day}</span>
    </div>
  );
}

/** Linha de agenda (homepage, listagens compactas). */
export function EventRow({ event }: { event: EventItem }) {
  return (
    <article className="group relative flex gap-4 rounded-2xl p-3 transition-colors hover:bg-white">
      <DateBadge iso={event.startsAt} className="group-hover:ring-brand-200" />
      <div className="min-w-0 py-0.5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="font-semibold text-brand-600">{event.type}</span>
          <span aria-hidden>·</span>
          <span>{formatDateRange(event.startsAt, event.endsAt)}</span>
        </div>
        <h3 className="mt-1 leading-snug font-bold text-ink group-hover:text-brand-700">
          <Link href={`/eventos/${event.slug}`} className="after:absolute after:inset-0">
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <MapPin className="size-3.5" />
          {event.location}
        </p>
      </div>
    </article>
  );
}

/** Cartão de evento (listagem de eventos). */
export function EventCard({ event }: { event: EventItem }) {
  const { weekday } = dateParts(event.startsAt);
  return (
    <article className="group relative flex h-full flex-col rounded-card border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <DateBadge iso={event.startsAt} className="bg-brand-50 ring-brand-100" />
        <div className="flex flex-wrap justify-end gap-1.5">
          {event.spcirOrganized && <Badge tone="sand">SPCir</Badge>}
          <Badge tone="gray">{event.type}</Badge>
        </div>
      </div>
      <h3 className="mt-5 text-lg leading-snug font-bold text-ink group-hover:text-brand-700">
        <Link href={`/eventos/${event.slug}`} className="after:absolute after:inset-0">
          {event.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted">{event.excerpt}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-4 text-brand-600" />
          {event.city ?? event.location}
        </span>
        <span className="capitalize">
          {weekday}, {formatDateRange(event.startsAt, event.endsAt)}
        </span>
      </div>
    </article>
  );
}
