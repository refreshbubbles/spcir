import type { Metadata } from "next";
import { PersonCard } from "@/components/cards/person-card";
import { ContentLayout } from "@/components/layout/content-layout";
import { MemberCtaCard } from "@/components/layout/member-cta-card";
import { PageHeader } from "@/components/layout/page-header";
import { SectionNav } from "@/components/layout/section-nav";
import { getGoverningBodies } from "@/lib/data/organization";
import { spcirCrumbs, spcirSection } from "../section";

export const metadata: Metadata = { title: "Órgãos Sociais" };

export default async function OrgaosSociaisPage() {
  const bodies = await getGoverningBodies();
  return (
    <>
      <PageHeader
        eyebrow="SPCir"
        title="Órgãos Sociais"
        intro="Composição dos Órgãos Sociais da Sociedade Portuguesa de Cirurgia para o mandato em curso."
        crumbs={[...spcirCrumbs, { label: "Órgãos Sociais" }]}
      />
      <ContentLayout
        aside={
          <>
            <SectionNav {...spcirSection} />
            <MemberCtaCard />
          </>
        }
      >
        <div className="space-y-12">
          {bodies.map((body) => (
            <section key={body.title}>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-ink">
                {body.title}
                <span className="h-px flex-1 bg-line" aria-hidden />
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {body.members.map((person, i) => (
                  <PersonCard key={`${person.role}-${i}`} person={person} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
