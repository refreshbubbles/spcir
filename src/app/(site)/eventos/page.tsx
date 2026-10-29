import type { Metadata } from "next";
import { EventCard, EventRow } from "@/components/cards/event-card";
import { ContentLayout } from "@/components/layout/content-layout";
import { PageHeader } from "@/components/layout/page-header";
import { getPastEvents, getUpcomingEvents } from "@/lib/data/events";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Eventos" };

const filters = ["Todos", "Organização SPCir", "Congressos", "Cursos", "Reuniões", "Webinars"];

export default async function EventosPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);
  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Eventos"
        intro="Congressos, cursos e reuniões científicas organizados ou apoiados pela SPCir, em Portugal e no estrangeiro."
        crumbs={[{ label: "Eventos" }]}
      >
        <div className="-mx-4 scrollbar-none flex gap-2 overflow-x-auto px-4">
          {filters.map((f, i) => (
            <span
              key={f}
              className={cn(
                "shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset",
                i === 0
                  ? "bg-brand-700 text-white ring-brand-700"
                  : "bg-white text-ink/80 ring-line hover:ring-brand-300",
              )}
            >
              {f}
            </span>
          ))}
        </div>
      </PageHeader>

      <ContentLayout>
        <h2 className="text-2xl font-bold text-ink">Próximos eventos</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-bold text-ink">Eventos anteriores</h2>
        <div className="mt-6 grid gap-1 rounded-card bg-surface p-3 md:grid-cols-2">
          {past.map((event) => (
            <EventRow key={event.slug} event={event} />
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
