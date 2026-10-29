/**
 * Tags de cache usadas pelas funções de dados.
 * O backoffice invoca `revalidateTag(tags.x)` após gravar, para actualizar o site público.
 */
export const tags = {
  banners: "banners",
  highlights: "highlights",
  news: "news",
  events: "events",
  chapters: "chapters",
  nuclei: "nuclei",
  people: "people",
  publications: "publications",
  courses: "courses",
  pages: "pages",
} as const;
