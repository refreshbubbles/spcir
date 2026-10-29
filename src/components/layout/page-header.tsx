import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-muted">
        <li>
          <Link href="/" className="flex items-center hover:text-brand-700" aria-label="Início">
            <Home className="size-3.5" />
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 text-muted/50" />
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-700">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  title,
  eyebrow,
  intro,
  crumbs,
  children,
  className,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50/70 to-white",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="absolute -top-24 -right-24 size-96 rounded-full bg-sand-100/60 blur-3xl" aria-hidden />
      <div className="relative container-page py-10 md:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-3 text-4xl font-bold text-ink md:text-5xl">{title}</h1>
          {intro && <p className="mt-4 text-lg leading-relaxed text-muted md:text-xl">{intro}</p>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
