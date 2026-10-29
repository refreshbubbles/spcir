import { primaryActions } from "@/config/navigation";
import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

/** Barra fixa em mobile com os três acessos em destaque. */
export function MobileActionBar() {
  const actions = [primaryActions.member, primaryActions.reserved, primaryActions.congress];
  return (
    <nav
      aria-label="Acessos rápidos"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:hidden"
    >
      <ul className="grid grid-cols-3">
        {actions.map((action, i) => (
          <li key={action.href}>
            <SmartLink
              href={action.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[0.6875rem] font-semibold",
                i === 0 ? "text-brand-700" : "text-ink/80",
              )}
            >
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-full",
                  i === 0 ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700",
                )}
              >
                <action.icon className="size-4" />
              </span>
              {action.short}
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
