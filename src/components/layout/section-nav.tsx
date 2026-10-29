"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/config/navigation";
import { cn } from "@/lib/utils";

/** Navegação lateral entre páginas da mesma secção (ex.: todos os Capítulos). */
export function SectionNav({ title, links }: { title: string; links: NavLink[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label={title} className="rounded-card border border-line bg-white p-2">
      <p className="px-3 pt-2 pb-1.5 text-xs font-bold tracking-[0.14em] text-muted uppercase">{title}</p>
      <ul>
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative block rounded-xl px-3 py-2 text-sm transition-colors",
                  active ? "bg-brand-50 font-semibold text-brand-700" : "text-ink/80 hover:bg-surface hover:text-ink",
                )}
              >
                {active && (
                  <span className="absolute top-2 bottom-2 left-0 w-0.5 rounded-full bg-brand-700" aria-hidden />
                )}
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
