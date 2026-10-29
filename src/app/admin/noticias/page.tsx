import { Eye, Filter, MoreHorizontal, Pencil, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader, Panel } from "@/components/admin/admin-ui";
import { Media } from "@/components/ui/media";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getNews } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Notícias" };

export default async function AdminNoticiasPage() {
  const news = await getNews();
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Notícias"
        description={`${news.length} notícias publicadas`}
        actions={
          <ButtonLink href="/admin/noticias/nova" size="sm">
            <Plus className="size-4" /> Nova notícia
          </ButtonLink>
        }
      />
      <Panel>
        <div className="flex flex-wrap items-center gap-2 border-b border-line p-4">
          {["Todas", "Publicadas", "Rascunhos", "Agendadas"].map((t, i) => (
            <span
              key={t}
              className={
                i === 0
                  ? "rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700"
                  : "rounded-lg px-3 py-1.5 text-sm font-medium text-muted hover:bg-surface"
              }
            >
              {t}
            </span>
          ))}
          <button
            type="button"
            className="ml-auto flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-ink/80"
          >
            <Filter className="size-3.5" /> Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">Título</th>
                <th className="px-5 py-3 font-medium">Categoria</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {news.map((n, i) => (
                <tr key={n.slug} className="hover:bg-surface/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Media image={n.image} className="h-10 w-14 shrink-0 rounded-md" sizes="56px" />
                      <span className="line-clamp-1 font-semibold text-ink">{n.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink/80">{n.category}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-muted">
                    {formatDate(n.publishedAt, { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={i === 0 ? "sand" : "green"}>{i === 0 ? "Destaque" : "Publicada"}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1 text-muted">
                      <Link
                        href={`/noticias/${n.slug}`}
                        target="_blank"
                        className="grid size-8 place-items-center rounded-lg hover:bg-surface hover:text-ink"
                        aria-label="Ver"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <Link
                        href="/admin/noticias/nova"
                        className="grid size-8 place-items-center rounded-lg hover:bg-surface hover:text-ink"
                        aria-label="Editar"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        className="grid size-8 place-items-center rounded-lg hover:bg-surface hover:text-ink"
                        aria-label="Mais acções"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
