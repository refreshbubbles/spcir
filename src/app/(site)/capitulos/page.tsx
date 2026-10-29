import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChapterIcon } from "@/components/cards/chapter-icon";
import { ContentLayout } from "@/components/layout/content-layout";
import { PageHeader } from "@/components/layout/page-header";
import { getChapters } from "@/lib/data/organization";

export const metadata: Metadata = { title: "Capítulos" };

export default async function CapitulosPage() {
  const chapters = await getChapters();
  return (
    <>
      <PageHeader
        eyebrow="Áreas de diferenciação"
        title="Capítulos"
        intro="Os Capítulos reúnem os sócios por área de interesse, promovendo a formação, a investigação e a elaboração de consensos nacionais."
        crumbs={[{ label: "Capítulos" }]}
      />
      <ContentLayout>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c) => (
            <Link
              key={c.slug}
              href={`/capitulos/${c.slug}`}
              className="group flex flex-col rounded-card border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                <ChapterIcon name={c.icon} className="size-6" />
              </span>
              <span className="mt-6 font-display text-lg leading-snug font-bold text-ink">{c.name}</span>
              <span className="mt-2 text-sm text-muted">{c.summary}</span>
              <span className="mt-auto pt-6">
                <ArrowRight className="size-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-brand-700" />
              </span>
            </Link>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
