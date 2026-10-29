import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChapterIcon } from "@/components/cards/chapter-icon";
import { EventRow } from "@/components/cards/event-card";
import { PersonCard } from "@/components/cards/person-card";
import { ContentLayout } from "@/components/layout/content-layout";
import { DetailSkeleton } from "@/components/layout/detail-skeleton";
import { PageHeader } from "@/components/layout/page-header";
import { SectionNav } from "@/components/layout/section-nav";
import { navSection } from "@/config/navigation";
import { getUpcomingEvents } from "@/lib/data/events";
import { getChapter, getChapters } from "@/lib/data/organization";

export async function generateStaticParams() {
  return (await getChapters()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/capitulos/[slug]">): Promise<Metadata> {
  const chapter = await getChapter((await params).slug);
  return chapter ? { title: chapter.name, description: chapter.summary } : {};
}

export default function CapituloPage({ params }: PageProps<"/capitulos/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ChapterView params={params} />
    </Suspense>
  );
}

async function ChapterView({ params }: { params: PageProps<"/capitulos/[slug]">["params"] }) {
  const chapter = await getChapter((await params).slug);
  if (!chapter) notFound();
  const events = await getUpcomingEvents({ chapter: chapter.slug, limit: 3 });

  return (
    <>
      <PageHeader
        eyebrow="Capítulo"
        title={chapter.name}
        intro={chapter.summary}
        crumbs={[{ label: "Capítulos", href: "/capitulos" }, { label: chapter.shortName }]}
      >
        <span className="grid size-14 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft ring-1 ring-line">
          <ChapterIcon name={chapter.icon} className="size-7" />
        </span>
      </PageHeader>
      <ContentLayout aside={<SectionNav title="Capítulos" links={navSection("/capitulos").children!} />}>
        <div className="prose-spcir" dangerouslySetInnerHTML={{ __html: chapter.body }} />

        <h2 className="mt-14 text-2xl font-bold text-ink">Coordenação</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {chapter.coordination.map((p, i) => (
            <PersonCard key={i} person={p} />
          ))}
        </div>

        {events.length > 0 && (
          <>
            <h2 className="mt-14 text-2xl font-bold text-ink">Próximos eventos</h2>
            <div className="mt-6 rounded-card bg-surface p-3">
              {events.map((e) => (
                <EventRow key={e.slug} event={e} />
              ))}
            </div>
          </>
        )}
      </ContentLayout>
    </>
  );
}
