import type { Metadata } from "next";
import { NewsCard } from "@/components/cards/news-card";
import { ContentLayout } from "@/components/layout/content-layout";
import { PageHeader } from "@/components/layout/page-header";
import { getNews } from "@/lib/data/news";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Notícias" };

const categories = ["Todas", "Sociedade", "Formação", "Congresso", "Publicações", "Investigação", "Capítulos"];

export default async function NoticiasPage() {
  const [featured, ...news] = await getNews();
  return (
    <>
      <PageHeader
        eyebrow="Actualidade"
        title="Notícias"
        intro="Acompanhe a actividade da SPCir, dos seus Capítulos e da comunidade cirúrgica."
        crumbs={[{ label: "Notícias" }]}
      >
        <div className="-mx-4 scrollbar-none flex gap-2 overflow-x-auto px-4">
          {categories.map((c, i) => (
            <span
              key={c}
              className={cn(
                "shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset",
                i === 0
                  ? "bg-brand-700 text-white ring-brand-700"
                  : "bg-white text-ink/80 ring-line hover:ring-brand-300",
              )}
            >
              {c}
            </span>
          ))}
        </div>
      </PageHeader>

      <ContentLayout>
        {featured && (
          <div className="mb-14 border-b border-line pb-14">
            <NewsCard article={featured} variant="wide" />
          </div>
        )}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
        <Pagination />
      </ContentLayout>
    </>
  );
}

function Pagination() {
  return (
    <nav aria-label="Paginação" className="mt-16 flex items-center justify-center gap-1.5">
      {["1", "2", "3", "…", "12"].map((p, i) => (
        <span
          key={`${p}-${i}`}
          aria-current={i === 0 ? "page" : undefined}
          className={cn(
            "grid size-10 place-items-center rounded-full text-sm font-semibold",
            i === 0 ? "bg-brand-700 text-white" : "text-ink/80 hover:bg-brand-50",
          )}
        >
          {p}
        </span>
      ))}
    </nav>
  );
}
