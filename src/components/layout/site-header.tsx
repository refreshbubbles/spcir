"use client";

import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, primaryActions, type NavItem } from "@/config/navigation";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/** Header com o pathname actual (requer Suspense em rotas com params dinâmicos). */
export function SiteHeaderWithPath() {
  return <SiteHeader pathname={usePathname()} />;
}

export function SiteHeader({ pathname = "" }: { pathname?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Fecha o menu mobile ao navegar (ajuste de estado durante o render, sem efeito).
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const { member, reserved } = primaryActions;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-300",
          scrolled ? "border-line shadow-[0_8px_30px_-18px_rgb(7_36_53/0.35)]" : "border-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center gap-4 transition-[height] duration-300",
            scrolled ? "h-18" : "h-22",
          )}
        >
          <Link href="/" className="shrink-0 text-ink" aria-label={`${site.shortName} — página inicial`}>
            <Logo className={cn("w-auto transition-[height] duration-300", scrolled ? "h-11" : "h-12 2xl:h-13")} />
          </Link>

          <nav aria-label="Menu principal" className="hidden flex-1 justify-center xl:flex">
            <ul className="flex items-center">
              {mainNav.map((item) => (
                <DesktopItem key={item.href} item={item} active={isActive(pathname, item.href)} pathname={pathname} />
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <ButtonLink
              href={reserved.href}
              variant="secondary"
              size="sm"
              className="hidden h-10 px-3.5 sm:inline-flex"
            >
              <reserved.icon className="size-4" />
              {reserved.label}
            </ButtonLink>
            <ButtonLink href={member.href} size="sm" className="hidden h-10 px-3.5 sm:inline-flex">
              <member.icon className="size-4" />
              {member.label}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-10 place-items-center rounded-full text-ink ring-1 ring-line ring-inset hover:bg-brand-50 xl:hidden"
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}

function DesktopItem({ item, active, pathname }: { item: NavItem; active: boolean; pathname: string }) {
  const linkClass = cn(
    "relative flex items-center gap-0.5 rounded-full px-2 py-2 text-sm font-medium whitespace-nowrap transition-colors 2xl:px-3",
    active ? "text-brand-700" : "text-ink/80 hover:bg-brand-50 hover:text-brand-700",
  );
  const indicator = active && (
    <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-sand-400" aria-hidden />
  );

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
          {item.label}
          {indicator}
        </Link>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link href={item.href} className={linkClass} aria-haspopup="true">
        {item.label}
        <ChevronDown className="size-3.5 opacity-60 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
        {indicator}
      </Link>
      <div
        className={cn(
          "invisible absolute top-full left-1/2 z-50 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200",
          "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <div
          className={cn(
            "rounded-2xl border border-line bg-white p-2 shadow-lift",
            item.columns === 2 ? "grid w-[38rem] grid-cols-2 gap-0.5" : "w-80",
          )}
        >
          {item.children.map((child) => {
            const childActive = isActive(pathname, child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                aria-current={childActive ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-brand-50",
                  childActive && "bg-brand-50",
                )}
              >
                <span className={cn("block text-sm font-semibold", childActive ? "text-brand-700" : "text-ink")}>
                  {child.label}
                </span>
                {child.description && (
                  <span className="mt-0.5 block text-[0.8125rem] text-muted">{child.description}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </li>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { member, reserved, congress } = primaryActions;

  return (
    <div
      id="mobile-menu"
      className={cn("fixed inset-0 z-50 xl:hidden", open ? "visible" : "invisible")}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-ink/30 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-18 items-center justify-between border-b border-line px-5">
          <Logo className="h-11 w-auto text-ink" />
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full ring-1 ring-line ring-inset hover:bg-brand-50"
            aria-label="Fechar menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Menu principal" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const isOpen = expanded === item.href;
              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex rounded-xl px-3 py-3 text-base font-semibold",
                        active ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-surface",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.href)}
                    aria-expanded={isOpen}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-semibold",
                      active ? "text-brand-700" : "text-ink",
                      "hover:bg-surface",
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <ul className="overflow-hidden">
                      <li>
                        <Link
                          href={item.href}
                          className="ml-3 block border-l border-line py-2 pl-4 text-sm font-medium text-brand-700"
                        >
                          Ver tudo
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "ml-3 block border-l py-2 pl-4 text-sm",
                              isActive(pathname, child.href)
                                ? "border-brand-700 font-semibold text-brand-700"
                                : "border-line text-ink/80 hover:text-brand-700",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-2 border-t border-line bg-surface p-4">
          <ButtonLink href={member.href} className="w-full">
            <member.icon className="size-4" />
            {member.label}
          </ButtonLink>
          <div className="grid grid-cols-2 gap-2">
            <ButtonLink href={reserved.href} variant="secondary" size="sm" className="h-11">
              <reserved.icon className="size-4" />
              {reserved.label}
            </ButtonLink>
            <ButtonLink href={congress.href} variant="sand" size="sm" className="h-11">
              {congress.label}
              <ArrowUpRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
