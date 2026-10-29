import { cacheLife, cacheTag } from "next/cache";
import { journalIssues, publicationCategories, publications } from "@/lib/mock/content";
import type { PublicationCategory } from "@/lib/types";
import { tags } from "./cache";

export async function getPublicationCategories() {
  return publicationCategories;
}

export async function getPublicationCategory(slug: string) {
  return publicationCategories.find((c) => c.slug === slug) ?? null;
}

export async function getPublications(category: PublicationCategory["slug"]) {
  "use cache";
  cacheLife("days");
  cacheTag(tags.publications);
  return publications.filter((p) => p.category === category).sort((a, b) => b.year - a.year);
}

export async function getJournalIssues() {
  "use cache";
  cacheLife("days");
  cacheTag(tags.publications);
  return journalIssues;
}
