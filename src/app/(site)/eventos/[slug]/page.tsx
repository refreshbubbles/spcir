import { ArrowUpRight, CalendarDays, Building2, MapPin, Tag } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DetailSkeleton } from "@/components/layout/detail-skeleton";
import { ContentLayout } from "@/components/layout/content-layout";
import { MemberCtaCard } from "@/components/layout/member-cta-card";
import { PageHeader } from "@/components/layout/page-header";
import { ShareLinks } from "@/components/layout/share-links";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { getEvent, getEventSlugs } from "@/lib/data/events";
import { getChapter } from "@/lib/data/organization";
import { formatDateRange } from "@/lib/utils";

export const generateStaticParams = getEventSlugs;

export async function generateMetadata({ params }: PageProps<"/eventos/[slug]">): Promise<Metadata> {
  const event = await getEvent((await params).slug);
  return event ? { title: event.title, description: event.excerpt } : {};
}

export default function EventoPage({ params }: PageProps<"/eventos/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <EventDetail params={params} />
    </Suspense>
  );
}

async function EventDetail({ params }: { params: PageProps<"/eventos/[slug]">["params"] }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  const chapter = event.chapterSlug ? await getChapter(event.chapterSlug) : null;

  const info = [
    { icon: CalendarDays, label: "Data", value: formatDateRange(event.startsAt, event.endsAt) },
    { icon: MapPin, label: "Local", value: event.location },
    { icon: Tag, label: "Tipo", value: event.type },
    ...(chapter ? [{ icon: Building2, label: "Capítulo", value: chapter.name }] : []),
  ];

  return (
    <>
      <PageHeader
        eyebrow={event.type}
        title={event.title}
        intro={event.excerpt}
        crumbs={[{ label: "Eventos", href: "/eventos" }, { label: event.title }]}
      >
        {event.spcirOrganized && <Badge tone="sand">Organização SPCir</Badge>}
      </PageHeader>
      <ContentLayout
        aside={
          <>
            <div className="rounded-card border border-line bg-white p-6">
              <dl className="space-y-4">
                {info.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-muted uppercase">{label}</dt>
                      <dd className="font-semibold text-ink">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              {event.externalUrl && (
                <ButtonLink href={event.externalUrl} className="mt-6 w-full">
                  Inscrições e programa
                  <ArrowUpRight className="size-4" />
                </ButtonLink>
              )}
            </div>
            <MemberCtaCard />
          </>
        }
      >
        {event.image && (
          <Media
            image={event.image}
            priority
            className="mb-10 aspect-[16/9] rounded-card"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        )}
        <div className="prose-spcir" dangerouslySetInnerHTML={{ __html: event.body }} />
        <div className="mt-12 border-t border-line pt-6">
          <ShareLinks title={event.title} path={`/eventos/${event.slug}`} />
        </div>
      </ContentLayout>
    </>
  );
}
