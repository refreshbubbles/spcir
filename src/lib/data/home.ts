import { cacheLife, cacheTag } from "next/cache";
import { heroSlides, highlights } from "@/lib/mock/content";
import { tags } from "./cache";

export async function getHeroSlides() {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.banners);
  // fase 2: prisma.banner.findMany({ where: { active: true }, orderBy: { order: "asc" } })
  return heroSlides;
}

export async function getHighlights() {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.highlights);
  return highlights;
}
