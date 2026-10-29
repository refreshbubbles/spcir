import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PersonCard } from "@/components/cards/person-card";
import { ContentLayout } from "@/components/layout/content-layout";
import { DetailSkeleton } from "@/components/layout/detail-skeleton";
import { MemberCtaCard } from "@/components/layout/member-cta-card";
import { PageHeader } from "@/components/layout/page-header";
import { SectionNav } from "@/components/layout/section-nav";
import { navSection } from "@/config/navigation";
import { getNuclei, getNucleus } from "@/lib/data/organization";

export async function generateStaticParams() {
  return (await getNuclei()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/nucleos/[slug]">): Promise<Metadata> {
  const nucleus = await getNucleus((await params).slug);
  return nucleus ? { title: nucleus.name, description: nucleus.summary } : {};
}

export default function NucleoPage({ params }: PageProps<"/nucleos/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <NucleusView params={params} />
    </Suspense>
  );
}

async function NucleusView({ params }: { params: PageProps<"/nucleos/[slug]">["params"] }) {
  const nucleus = await getNucleus((await params).slug);
  if (!nucleus) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Núcleo"
        title={nucleus.name}
        intro={nucleus.summary}
        crumbs={[{ label: "Núcleos", href: "/nucleos" }, { label: nucleus.name }]}
      />
      <ContentLayout
        aside={
          <>
            <SectionNav title="Núcleos" links={navSection("/nucleos").children!} />
            <MemberCtaCard />
          </>
        }
      >
        <div className="prose-spcir" dangerouslySetInnerHTML={{ __html: nucleus.body }} />
        <h2 className="mt-14 text-2xl font-bold text-ink">Coordenação</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {nucleus.coordination.map((p, i) => (
            <PersonCard key={i} person={p} />
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
