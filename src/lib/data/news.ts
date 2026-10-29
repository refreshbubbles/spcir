import { cacheLife, cacheTag } from "next/cache";
import { news } from "@/lib/mock/content";
import { tags } from "./cache";

const byDateDesc = <T extends { publishedAt: string }>(a: T, b: T) => b.publishedAt.localeCompare(a.publishedAt);

export async function getNews({ limit }: { limit?: number } = {}) {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.news);
  // fase 2: prisma.news.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: limit })
  return [...news].sort(byDateDesc).slice(0, limit);
}

export async function getNewsArticle(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.news, `${tags.news}:${slug}`);
  return news.find((n) => n.slug === slug) ?? null;
}

export async function getNewsSlugs() {
  return news.map((n) => ({ slug: n.slug }));
}
