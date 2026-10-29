import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SmartLink } from "@/components/ui/smart-link";
import { primaryActions } from "@/config/navigation";
import { cn } from "@/lib/utils";

/** Os três acessos em destaque, sobrepostos ao fundo do hero. */
export function QuickAccess() {
  const items = [
    { ...primaryActions.member, tone: "solid" as const },
    { ...primaryActions.reserved, tone: "light" as const },
    { ...primaryActions.congress, tone: "sand" as const },
  ];
  return (
    <section aria-label="Acessos rápidos" className="relative z-10 -mt-16 lg:-mt-20">
      <div className="container-page grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const external = "external" in item && item.external;
          const Arrow = external ? ArrowUpRight : ArrowRight;
          return (
            <SmartLink
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-start gap-4 overflow-hidden rounded-card p-6 transition-all duration-300 hover:-translate-y-1",
                item.tone === "solid" && "bg-brand-700 text-white shadow-lift",
                item.tone === "light" && "bg-white text-ink shadow-lift ring-1 ring-line",
                item.tone === "sand" && "bg-sand-50 text-ink shadow-lift ring-1 ring-sand-200",
              )}
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-2xl",
                  item.tone === "solid" && "bg-white/10 text-white",
                  item.tone === "light" && "bg-brand-50 text-brand-700",
                  item.tone === "sand" && "bg-white text-sand-600",
                )}
              >
                <item.icon className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 font-display text-lg font-bold">
                  {item.label}
                  <Arrow className="size-5 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </span>
                <span className={cn("mt-1 block text-sm", item.tone === "solid" ? "text-white/75" : "text-muted")}>
                  {item.description}
                </span>
              </span>
            </SmartLink>
          );
        })}
      </div>
    </section>
  );
}
