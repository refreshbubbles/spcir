import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { NavItem } from "@/config/navigation";
import { ContentLayout } from "./content-layout";
import { PageHeader } from "./page-header";

/** Página de entrada de uma secção do menu: lista as sub-páginas. */
export function SectionIndex({ item, intro, eyebrow }: { item: NavItem; intro: string; eyebrow?: string }) {
  return (
    <>
      <PageHeader title={item.label} eyebrow={eyebrow} intro={intro} crumbs={[{ label: item.label }]} />
      <ContentLayout>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {item.children?.map((child, i) => (
            <Link
              key={child.href}
              href={child.href}
              className="group flex flex-col rounded-card border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
            >
              <span className="font-display text-sm font-bold text-sand-500">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-6 font-display text-xl font-bold text-ink group-hover:text-brand-700">
                {child.label}
              </span>
              {child.description && <span className="mt-2 text-muted">{child.description}</span>}
              <ArrowRight className="mt-6 size-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-brand-700" />
            </Link>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
