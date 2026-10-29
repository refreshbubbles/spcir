import { ArrowUpRight, CalendarDays, Inbox, Plus, TrendingUp, UserCheck, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { AdminPageHeader, Panel } from "@/components/admin/admin-ui";
import { DateBadge } from "@/components/cards/event-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/data/events";

const stats = [
  { label: "Sócios activos", value: "1 248", delta: "+32 este ano", icon: Users },
  { label: "Quotas em dia", value: "86%", delta: "+4 p.p.", icon: Wallet },
  { label: "Inscrições em cursos", value: "214", delta: "Programa 2026/27", icon: UserCheck },
  { label: "Pedidos pendentes", value: "7", delta: "5 adesões · 2 patrocínios", icon: Inbox },
];

const requests = [
  { name: "Nome Apelido", type: "Interno · 2.º ano", hospital: "Hospital (exemplo)", date: "24 out." },
  { name: "Nome Apelido", type: "Especialista", hospital: "Hospital (exemplo)", date: "22 out." },
  { name: "Nome Apelido", type: "Interno · 1.º ano", hospital: "Hospital (exemplo)", date: "21 out." },
  { name: "Nome Apelido", type: "Interno · 4.º ano", hospital: "Hospital (exemplo)", date: "18 out." },
];

export default async function AdminDashboard() {
  const events = await getUpcomingEvents({ limit: 4 });
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Resumo da actividade da Sociedade Portuguesa de Cirurgia."
        actions={
          <>
            <ButtonLink href="/admin/eventos" variant="secondary" size="sm">
              <CalendarDays className="size-4" /> Novo evento
            </ButtonLink>
            <ButtonLink href="/admin/noticias/nova" size="sm">
              <Plus className="size-4" /> Nova notícia
            </ButtonLink>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted">{label}</p>
              <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Icon className="size-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-ink">{value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-700">
              <TrendingUp className="size-3" /> {delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          title="Pedidos de adesão"
          className="xl:col-span-2"
          action={
            <Link href="/admin/adesoes" className="text-sm font-semibold text-brand-700">
              Ver todos
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted">
                  <th className="px-5 py-3 font-medium">Candidato</th>
                  <th className="px-5 py-3 font-medium">Situação</th>
                  <th className="px-5 py-3 font-medium">Recebido</th>
                  <th className="px-5 py-3 font-medium">Estado</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {requests.map((r, i) => (
                  <tr key={i} className="hover:bg-surface/60">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-ink">{r.name}</p>
                      <p className="text-xs text-muted">{r.hospital}</p>
                    </td>
                    <td className="px-5 py-3.5 text-ink/80">{r.type}</td>
                    <td className="px-5 py-3.5 text-muted">{r.date}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={i === 0 ? "amber" : "gray"}>{i === 0 ? "Novo" : "Em análise"}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button type="button" className="text-sm font-semibold text-brand-700">
                        Rever
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Próximos eventos">
          <ul className="divide-y divide-line">
            {events.map((e) => (
              <li key={e.slug} className="flex items-center gap-3 px-5 py-3">
                <DateBadge iso={e.startsAt} className="w-12 rounded-xl py-1.5 [&>span:last-child]:text-lg" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{e.title}</p>
                  <p className="text-xs text-muted">{e.location}</p>
                </div>
                <Link
                  href={`/eventos/${e.slug}`}
                  target="_blank"
                  aria-label="Ver no site"
                  className="text-muted hover:text-brand-700"
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
