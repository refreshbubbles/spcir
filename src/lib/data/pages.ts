import { cacheLife, cacheTag } from "next/cache";
import { pages } from "@/lib/mock/content";
import { tags } from "./cache";

/** Páginas institucionais editáveis no backoffice (conteúdo livre + anexos). */
export async function getPage(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag(tags.pages, `${tags.pages}:${slug}`);
  const page = pages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Página "${slug}" não encontrada`);
  return page;
}
