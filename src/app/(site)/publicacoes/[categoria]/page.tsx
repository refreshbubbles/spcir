import { ArrowUpRight, Download, FileText, Lock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Symbol } from "@/components/brand/logo";
import { ContentLayout } from "@/components/layout/content-layout";
import { DetailSkeleton } from "@/components/layout/detail-skeleton";
import { MemberCtaCard } from "@/components/layout/member-cta-card";
import { PageHeader } from "@/components/layout/page-header";
import { SectionNav } from "@/components/layout/section-nav";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { navSection } from "@/config/navigation";
import {
  getJournalIssues,
  getPublicationCategories,
  getPublicationCategory,
  getPublications,
} from "@/lib/data/publications";
import type { PublicationCategory } from "@/lib/types";

export async function generateStaticParams() {
  return (await getPublicationCategories()).map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/publicacoes/[categoria]">): Promise<Metadata> {
  const category = await getPublicationCategory((await params).categoria);
  return category ? { title: category.title, description: category.description } : {};
}

export default function Page({ params }: PageProps<"/publicacoes/[categoria]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <CategoryView params={params} />
    </Suspense>
  );
}

async function CategoryView({ params }: { params: PageProps<"/publicacoes/[categoria]">["params"] }) {
  const category = await getPublicationCategory((await params).categoria);
  if (!category) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Publicações"
        title={category.title}
        intro={category.description}
        crumbs={[{ label: "Publicações", href: "/publicacoes" }, { label: category.title }]}
      />
      <ContentLayout
        aside={
          <>
            <SectionNav title="Publicações" links={navSection("/publicacoes").children!} />
            <MemberCtaCard />
          </>
        }
      >
        {category.slug === "revista" ? <Journal /> : <DocumentList category={category.slug} />}
      </ContentLayout>
    </>
  );
}

async function Journal() {
  const issues = await getJournalIssues();
  const [latest, ...previous] = issues;
  return (
    <>
      <div className="grid items-center gap-8 rounded-card bg-gradient-to-br from-brand-50 to-sand-50 p-6 sm:grid-cols-[12rem_1fr] md:p-8">
        <Cover volume={latest.volume} number={latest.number} year={latest.year} />
        <div>
          <Badge tone="sand">Número mais recente</Badge>
          <h2 className="mt-3 text-2xl font-bold text-ink">
            Vol. {latest.volume}, N.º {latest.number} — {latest.month} {latest.year}
          </h2>
          <p className="mt-2 text-muted">Portuguese Journal of Surgery · Acesso aberto</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={latest.url}>
              Ler online <ArrowUpRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="https://revista.spcir.com/index.php/spcir" variant="secondary">
              Submeter artigo
            </ButtonLink>
          </div>
        </div>
      </div>

      <h2 className="mt-14 text-xl font-bold text-ink">Números anteriores</h2>
      <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {previous.map((issue) => (
          <a key={issue.id} href={issue.url} target="_blank" rel="noopener noreferrer" className="group">
            <Cover volume={issue.volume} number={issue.number} year={issue.year} />
            <p className="mt-3 text-sm font-semibold text-ink group-hover:text-brand-700">
              Vol. {issue.volume}, N.º {issue.number}
            </p>
            <p className="text-xs text-muted">
              {issue.month} {issue.year}
            </p>
          </a>
        ))}
      </div>
    </>
  );
}

/** Capa gerada (placeholder) até existirem capas carregadas no backoffice. */
function Cover({ volume, number, year }: { volume: number; number: number; year: number }) {
  return (
    <div className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl bg-white p-4 shadow-lift ring-1 ring-line transition-transform group-hover:-translate-y-1">
      <Symbol className="absolute -right-6 -bottom-6 size-32 text-brand-50" />
      <div className="relative">
        <p className="text-[0.625rem] font-bold tracking-wider text-sand-600 uppercase">Revista Portuguesa de</p>
        <p className="font-display text-xl leading-none font-extrabold text-brand-800">CIRURGIA</p>
      </div>
      <div className="relative h-1 w-10 rounded-full bg-sand-400" />
      <p className="relative text-xs font-semibold text-muted">
        Vol. {volume} · N.º {number} · {year}
      </p>
    </div>
  );
}

async function DocumentList({ category }: { category: PublicationCategory["slug"] }) {
  const items = await getPublications(category);
  return (
    <ul className="divide-y divide-line rounded-card border border-line bg-white">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <FileText className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">{item.title}</p>
            <p className="mt-0.5 text-sm text-muted">
              {[item.authors, item.year, item.fileSize].filter(Boolean).join(" · ")}
            </p>
          </div>
          {item.membersOnly ? (
            <ButtonLink href="/area-reservada" size="sm" variant="soft">
              <Lock className="size-3.5" /> Sócios
            </ButtonLink>
          ) : item.externalUrl ? (
            <ButtonLink href={item.externalUrl} size="sm" variant="secondary" external>
              Abrir <ArrowUpRight className="size-3.5" />
            </ButtonLink>
          ) : (
            <ButtonLink href={item.fileUrl ?? "#"} size="sm" variant="secondary">
              <Download className="size-3.5" /> PDF
            </ButtonLink>
          )}
        </li>
      ))}
    </ul>
  );
}
