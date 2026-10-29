import Link from "next/link";
import type { ComponentProps } from "react";
import { isExternal } from "@/lib/utils";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string; external?: boolean };

/** Link interno (next/link) ou externo (nova janela), conforme o href. */
export function SmartLink({ href, external, ...props }: Props) {
  if (external ?? isExternal(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  }
  return <Link href={href} {...props} />;
}
