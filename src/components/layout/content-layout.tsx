import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Grelha conteúdo + coluna lateral (navegação de secção, CTAs, info). */
export function ContentLayout({
  children,
  aside,
  className,
}: {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("container-page py-12 md:py-16", className)}>
      {aside ? (
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-8">{children}</div>
          <aside className="space-y-6 lg:col-span-4 lg:pt-1">
            <div className="space-y-6 lg:sticky lg:top-28">{aside}</div>
          </aside>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
