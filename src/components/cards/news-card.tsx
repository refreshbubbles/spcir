import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Media } from "@/components/ui/media";
import type { NewsArticle } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function NewsCard({
  article,
  variant = "default",
}: {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact" | "wide";
}) {
  const href = `/noticias/${article.slug}`;

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex gap-4">
        <Media image={article.image} className="aspect-[4/3] w-28 shrink-0 rounded-xl" sizes="112px" />
        <div className="min-w-0">
          <p className="text-xs text-muted">
            <span className="font-semibold text-brand-600">{article.category}</span> ·{" "}
            {formatDate(article.publishedAt, { day: "numeric", month: "short" })}
          </p>
          <h3 className="mt-1 line-clamp-2 font-display text-[0.9375rem] leading-snug font-bold text-ink group-hover:text-brand-700">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  if (variant === "wide") {
    return (
      <article className="group relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Media
          image={article.image}
          className="aspect-[16/10] rounded-card"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
        <div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <Badge tone="sand">Destaque</Badge>
            <Badge tone="brand">{article.category}</Badge>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </div>
          <h2 className="mt-4 text-3xl leading-tight font-bold text-ink group-hover:text-brand-700 md:text-4xl">
            <Link href={href} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </h2>
          <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            Ler notícia <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    );
  }

  const featured = variant === "featured";
  return (
    <article className="group relative flex h-full flex-col">
      <Media
        image={article.image}
        className="aspect-[16/10] rounded-card"
        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
      />
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-center gap-3 text-xs text-muted">
          <Badge tone="brand">{article.category}</Badge>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
        <h3
          className={cn(
            "mt-3 font-bold text-ink group-hover:text-brand-700",
            featured ? "text-2xl md:text-[1.75rem]" : "text-lg leading-snug",
          )}
        >
          <Link href={href} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className={cn("mt-2 text-muted", featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm")}>
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
