import { Bell, Search } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: { default: "Backoffice", template: "%s · Backoffice SPCir" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-full flex-1 bg-surface">
      <Suspense>
        <AdminSidebar />
      </Suspense>
      <div className="lg:pl-68">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-line bg-white/90 px-4 pl-16 backdrop-blur lg:px-8">
          <label className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Pesquisar sócios, notícias, eventos…"
              className="h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm outline-none focus:border-brand-300 focus:bg-white"
            />
          </label>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className="relative grid size-10 place-items-center rounded-lg text-muted hover:bg-surface"
              aria-label="Notificações"
            >
              <Bell className="size-4.5" />
              <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-sand-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-3 border-l border-line pl-3">
              <span className="grid size-9 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">
                SC
              </span>
              <div className="hidden text-sm leading-tight sm:block">
                <p className="font-semibold text-ink">Secretariado</p>
                <p className="text-xs text-muted">Administrador</p>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
