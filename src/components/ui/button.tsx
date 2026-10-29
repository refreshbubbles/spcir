import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { SmartLink } from "./smart-link";

const variants = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 shadow-sm shadow-brand-900/10",
  secondary: "bg-white text-ink ring-1 ring-inset ring-line hover:ring-brand-300 hover:text-brand-700",
  soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  sand: "bg-sand-400 text-ink hover:bg-sand-300",
  ghost: "text-ink hover:bg-brand-50 hover:text-brand-700",
  white: "bg-white text-brand-800 hover:bg-brand-50",
  outlineWhite: "text-white ring-1 ring-inset ring-white/40 hover:bg-white/10",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.9375rem] gap-2",
  lg: "h-13 px-6 text-base gap-2.5",
} as const;

export type ButtonStyleProps = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export const buttonClass = ({ variant = "primary", size = "md" }: ButtonStyleProps = {}) =>
  cn(
    "inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
  );

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & ComponentProps<typeof SmartLink>) {
  return <SmartLink className={cn(buttonClass({ variant, size }), className)} {...props} />;
}

export function Button({ variant, size, className, ...props }: ButtonStyleProps & ComponentProps<"button">) {
  return <button className={cn(buttonClass({ variant, size }), className)} {...props} />;
}
