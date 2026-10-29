import Image from "next/image";
import type { ImageRef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Symbol } from "@/components/brand/logo";

/** Imagem com fallback de marca quando o conteúdo não tem imagem associada. */
export function Media({
  image,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  fit = "cover",
}: {
  image?: ImageRef;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <div className={cn("relative overflow-hidden bg-brand-50", className)}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(fit === "cover" ? "object-cover" : "object-contain")}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-brand-50 via-white to-sand-50">
          <Symbol className="size-1/3 max-h-24 text-brand-200" />
        </div>
      )}
    </div>
  );
}
