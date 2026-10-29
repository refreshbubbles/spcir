import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NewsCard } from "@/components/cards/news-card";
import { DetailSkeleton } from "@/components/layout/detail-skeleton";
import { Breadcrumbs } from "@/components/layout/page-header";
import { ShareLinks } from "@/components/layout/share-links";
import { Badge } from "@/components/ui/badge";
import { Media } from "@/components/ui/media";
import { getNews, getNewsArticle, getNewsSlugs } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

export const generateStaticParams = getNewsSlugs;

export async function generateMetadata({ params }: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const article = await getNewsArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default function NoticiaPage({ params }: PageProps<"/noticias/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: { params: PageProps<"/noticias/[slug]">["params"] }) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();
  const related = (await getNews({ limit: 4 })).filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-line bg-gradient-to-b from-brand-50/70 to-white">
          <div className="container-page max-w-4xl py-10 md:py-14">
            <Breadcrumbs items={[{ label: "Notícias", href: "/noticias" }, { label: article.title }]} />
            <div className="mt-8 flex items-center gap-3 text-sm text-muted">
              <Badge>{article.category}</Badge>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </div>
            <h1 className="mt-4 text-4xl leading-tight font-bold text-ink md:text-5xl">{article.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-muted">{article.excerpt}</p>
          </div>
        </header>

        <div className="container-page max-w-4xl py-12">
          {article.image && (
            <Media
              image={article.image}
              priority
              className="mb-12 aspect-[16/9] rounded-card"
              sizes="(min-width: 896px) 896px, 100vw"
            />
          )}
          <div className="prose-spcir mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: article.body }} />
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              <ArrowLeft className="size-4" />
              Todas as notícias
            </Link>
            <ShareLinks title={article.title} path={`/noticias/${article.slug}`} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-surface py-16">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-ink">Outras notícias</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((n) => (
                <NewsCard key={n.slug} article={n} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
