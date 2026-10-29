import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContentLayout } from "@/components/layout/content-layout";
import { PageHeader } from "@/components/layout/page-header";
import { getPublicationCategories } from "@/lib/data/publications";

export const metadata: Metadata = { title: "Publicações" };

export default async function PublicacoesPage() {
  const categories = await getPublicationCategories();
  return (
    <>
      <PageHeader
        eyebrow="Conhecimento"
        title="Publicações"
        intro="A Revista Portuguesa de Cirurgia, edições da SPCir, guias clínicos e referências internacionais."
        crumbs={[{ label: "Publicações" }]}
      />
      <ContentLayout>
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/publicacoes/${c.slug}`}
              className="group flex flex-col rounded-card border border-line bg-white p-8 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
            >
              <span className="font-display text-2xl font-bold text-ink group-hover:text-brand-700">{c.title}</span>
              <span className="mt-3 text-muted">{c.description}</span>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Consultar <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
