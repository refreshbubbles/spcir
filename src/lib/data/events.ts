import { cacheLife, cacheTag } from "next/cache";
import { events } from "@/lib/mock/content";
import { tags } from "./cache";

/** Data de referência do mockup; na fase 2 a filtragem é feita na query. */
export const TODAY = "2026-10-26";

const isUpcoming = (e: { startsAt: string; endsAt?: string }) => (e.endsAt ?? e.startsAt) >= TODAY;

export async function getUpcomingEvents({ limit, chapter }: { limit?: number; chapter?: string } = {}) {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.events);
  return events
    .filter((e) => isUpcoming(e) && (!chapter || e.chapterSlug === chapter))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, limit);
}

export async function getPastEvents() {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.events);
  return events.filter((e) => !isUpcoming(e)).sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

export async function getEvent(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.events, `${tags.events}:${slug}`);
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getEventSlugs() {
  return events.map((e) => ({ slug: e.slug }));
}
