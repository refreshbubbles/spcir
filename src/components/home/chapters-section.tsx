import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChapterIcon } from "@/components/cards/chapter-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { getChapters, getNuclei } from "@/lib/data/organization";

export async function ChaptersSection() {
  const [chapters, nuclei] = await Promise.all([getChapters(), getNuclei()]);
  return (
    <section className="border-t border-line bg-surface py-20 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Capítulos e Núcleos"
          title="Áreas de diferenciação"
          description="Os Capítulos e Núcleos da SPCir reúnem os sócios por área de interesse, promovendo formação, investigação e consensos."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/capitulos/${chapter.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-all hover:border-brand-200 hover:shadow-soft"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                <ChapterIcon name={chapter.icon} className="size-5" />
              </span>
              <span className="text-sm leading-snug font-semibold text-ink">{chapter.name}</span>
            </Link>
          ))}
          <Link
            href="/capitulos"
            className="group flex items-center justify-between gap-3 rounded-2xl bg-brand-700 p-4 text-white transition-colors hover:bg-brand-800"
          >
            <span className="text-sm font-semibold">Todos os capítulos</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-[auto_1fr_1fr] md:items-center">
          <p className="text-xs font-bold tracking-[0.14em] text-sand-600 uppercase md:pr-4">Núcleos</p>
          {nuclei.map((nucleus) => (
            <Link
              key={nucleus.slug}
              href={`/nucleos/${nucleus.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-sand-200 bg-sand-50 p-4 transition-all hover:border-sand-300 hover:shadow-soft"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">{nucleus.name}</span>
                <span className="block text-sm text-muted">{nucleus.summary}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-sand-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
