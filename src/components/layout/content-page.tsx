import type { ReactNode } from "react";
import type { NavLink } from "@/config/navigation";
import { getPage } from "@/lib/data/pages";
import { formatDate } from "@/lib/utils";
import { Attachments } from "./attachments";
import { ContentLayout } from "./content-layout";
import { MemberCtaCard } from "./member-cta-card";
import { PageHeader, type Crumb } from "./page-header";
import { SectionNav } from "./section-nav";

/** Template genérico para páginas institucionais geridas no backoffice. */
export async function ContentPageView({
  slug,
  crumbs = [],
  section,
  children,
}: {
  slug: string;
  crumbs?: Crumb[];
  section?: { title: string; links: NavLink[] };
  children?: ReactNode;
}) {
  const page = await getPage(slug);
  return (
    <>
      <PageHeader
        title={page.title}
        eyebrow={page.eyebrow}
        intro={page.intro}
        crumbs={[...crumbs, { label: page.title }]}
      />
      <ContentLayout
        aside={
          <>
            {section && <SectionNav title={section.title} links={section.links} />}
            {page.attachments && <Attachments items={page.attachments} />}
            <MemberCtaCard />
          </>
        }
      >
        <article className="prose-spcir" dangerouslySetInnerHTML={{ __html: page.body }} />
        {children}
        <p className="mt-12 border-t border-line pt-5 text-sm text-muted">
          Última actualização: {formatDate(page.updatedAt)}
        </p>
      </ContentLayout>
    </>
  );
}
