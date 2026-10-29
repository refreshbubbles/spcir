import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SmartLink } from "./smart-link";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn("flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase", className)}
    >
      <span className="h-px w-6 bg-sand-400" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-lg text-muted">{description}</p>}
      </div>
      {link && (
        <SmartLink
          href={link.href}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          {link.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </SmartLink>
      )}
    </div>
  );
}
