import { ChevronDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/60 transition-colors outline-none hover:border-brand-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

export function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-sand-600"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export const Input = ({ className, ...props }: ComponentProps<"input">) => (
  <input className={cn(control, className)} {...props} />
);

export const Textarea = ({ className, ...props }: ComponentProps<"textarea">) => (
  <textarea className={cn(control, "min-h-32 resize-y", className)} {...props} />
);

export const Select = ({ className, children, ...props }: ComponentProps<"select">) => (
  <span className="relative block">
    <select className={cn(control, "appearance-none pr-10", className)} {...props}>
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
  </span>
);

export function Checkbox({ children, ...props }: ComponentProps<"input"> & { children: ReactNode }) {
  return (
    <label className="flex items-start gap-3 text-sm text-ink/80">
      <input type="checkbox" className="mt-0.5 size-4.5 shrink-0 rounded accent-brand-700" {...props} />
      <span>{children}</span>
    </label>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="grid gap-5 border-t border-line pt-8 first:border-t-0 first:pt-0 md:grid-cols-3 md:gap-8">
      <legend className="contents">
        <span className="block md:col-span-1">
          <span className="block font-display text-lg font-bold text-ink">{title}</span>
          {description && <span className="mt-1 block text-sm text-muted">{description}</span>}
        </span>
      </legend>
      <div className="grid gap-5 sm:grid-cols-2 md:col-span-2">{children}</div>
    </fieldset>
  );
}
