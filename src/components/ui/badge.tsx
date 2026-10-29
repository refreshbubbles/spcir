import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  sand: "bg-sand-50 text-sand-600 ring-sand-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  gray: "bg-surface text-muted ring-line",
  red: "bg-rose-50 text-rose-700 ring-rose-100",
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({
  tone = "brand",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
