import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { EventRow } from "@/components/cards/event-card";
import { NewsCard } from "@/components/cards/news-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getUpcomingEvents } from "@/lib/data/events";
import { getNews } from "@/lib/data/news";

export async function NewsAndEvents() {
  const [news, events] = await Promise.all([getNews({ limit: 4 }), getUpcomingEvents({ limit: 4 })]);
  const [featured, ...rest] = news;

  return (
    <section className="border-y border-line bg-surface py-20 md:py-24">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHeading
            eyebrow="Actualidade"
            title="Notícias"
            link={{ label: "Todas as notícias", href: "/noticias" }}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {featured && <NewsCard article={featured} variant="featured" />}
            <div className="flex flex-col gap-5 md:border-l md:border-line md:pl-8">
              {rest.map((article) => (
                <NewsCard key={article.slug} article={article} variant="compact" />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Agenda" title="Próximos eventos" />
          <div className="-mx-3 mt-10 space-y-1">
            {events.map((event) => (
              <EventRow key={event.slug} event={event} />
            ))}
          </div>
          <Link
            href="/eventos"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-brand-700 ring-1 ring-line transition-colors hover:ring-brand-300"
          >
            <CalendarDays className="size-4" />
            Ver agenda completa
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
