import { Construction } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AdminPageHeader, Panel } from "@/components/admin/admin-ui";
import { adminNav } from "@/config/admin-navigation";

const sections = adminNav.flatMap((g) => g.items).filter((i) => i.href !== "/admin" && i.href !== "/admin/noticias");

export function generateStaticParams() {
  return sections.map((s) => ({ section: s.href.replace("/admin/", "") }));
}

export default function AdminSectionPage({ params }: PageProps<"/admin/[section]">) {
  return (
    <Suspense>
      <SectionPlaceholder params={params} />
    </Suspense>
  );
}

async function SectionPlaceholder({ params }: { params: PageProps<"/admin/[section]">["params"] }) {
  const { section } = await params;
  const item = sections.find((s) => s.href === `/admin/${section}`);
  if (!item) notFound();
  return (
    <div className="space-y-6">
      <AdminPageHeader title={item.label} />
      <Panel>
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
            <Construction className="size-6" />
          </span>
          <p className="mt-5 font-display text-lg font-bold text-ink">Módulo previsto para a fase 2</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            A gestão de “{item.label}” será implementada após a definição do schema da base de dados.
          </p>
        </div>
      </Panel>
    </div>
  );
}
