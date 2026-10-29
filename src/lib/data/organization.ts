import { cacheLife, cacheTag } from "next/cache";
import { chapters, governingBodies, nuclei } from "@/lib/mock/content";
import { tags } from "./cache";

export async function getGoverningBodies() {
  "use cache";
  cacheLife("days");
  cacheTag(tags.people);
  return governingBodies;
}

export async function getChapters() {
  "use cache";
  cacheLife("days");
  cacheTag(tags.chapters);
  return chapters;
}

export async function getChapter(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag(tags.chapters, `${tags.chapters}:${slug}`);
  return chapters.find((c) => c.slug === slug) ?? null;
}

export async function getNuclei() {
  "use cache";
  cacheLife("days");
  cacheTag(tags.nuclei);
  return nuclei;
}

export async function getNucleus(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag(tags.nuclei, `${tags.nuclei}:${slug}`);
  return nuclei.find((n) => n.slug === slug) ?? null;
}
