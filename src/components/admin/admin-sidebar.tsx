"use client";

import { ExternalLink, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { adminNav } from "@/config/admin-navigation";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-3.5 left-4 z-40 grid size-9 place-items-center rounded-lg bg-white ring-1 ring-line lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="size-4" />
      </button>
      {open && <div className="fixed inset-0 z-40 bg-ink/30 lg:hidden" onClick={() => setOpen(false)} />}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-68 flex-col border-r border-line bg-white transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Link href="/admin" className="flex items-center gap-2.5 text-ink">
            <Logo className="h-9 w-auto" />
            <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-[0.625rem] font-bold tracking-wider text-brand-700 uppercase">
              Backoffice
            </span>
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="lg:hidden" aria-label="Fechar menu">
            <X className="size-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {adminNav.map((group, gi) => (
            <div key={gi} className={cn(gi > 0 && "mt-6")}>
              {group.title && (
                <p className="px-3 pb-2 text-[0.6875rem] font-bold tracking-[0.12em] text-muted/80 uppercase">
                  {group.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          active ? "bg-brand-700 text-white" : "text-ink/75 hover:bg-surface hover:text-ink",
                        )}
                      >
                        <item.icon className="size-4" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              "rounded-full px-1.5 text-[0.6875rem] font-bold",
                              active ? "bg-white/20 text-white" : "bg-sand-100 text-sand-600",
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-line p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-ink"
          >
            <ExternalLink className="size-4" />
            Ver website
          </Link>
        </div>
      </aside>
    </>
  );
}
